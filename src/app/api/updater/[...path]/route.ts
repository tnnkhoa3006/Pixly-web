import { NextRequest, NextResponse } from "next/server";

const REPO = "tnnkhoa3006/Pixly";
const GITHUB_API = `https://api.github.com/repos/${REPO}`;

type RouteParams = { path: string[] };

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
  };
}

async function fetchAssetBody(assetUrl: string, token: string) {
  const res = await fetch(assetUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/octet-stream",
    },
    redirect: "follow",
  });

  if (!res.ok) {
    throw new Error(`GitHub asset download failed: ${res.status}`);
  }

  return res;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  const { path } = await params;
  const joinedPath = path.join("/");

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // latest.json - build update manifest from latest release
  if (joinedPath === "latest.json" || joinedPath === "") {
    try {
      const res = await fetch(`${GITHUB_API}/releases/latest`, {
        headers: authHeaders(token),
      });

      if (!res.ok) {
        return NextResponse.json({ error: "No releases found" }, { status: 404 });
      }

      const release = await res.json();

      const latestJson = {
        version: release.tag_name.replace(/^v/, ""),
        notes: release.name || release.tag_name,
        pub_date: release.published_at,
        platforms: {} as Record<string, { signature: string; url: string }>,
      };

      const proxyBase = `${req.nextUrl.origin}/api/updater`;
      const assetsByName = new Map<string, { name: string; url: string }>(
        release.assets.map((a: { name: string; url: string }) => [a.name, a])
      );

      const addPlatform = async (platform: string, name: string) => {
        const sigAsset = assetsByName.get(`${name}.sig`);
        if (!sigAsset) return;

        const sigRes = await fetchAssetBody(sigAsset.url, token);
        const signature = (await sigRes.text()).trim();
        if (!signature) return;

        latestJson.platforms[platform] = {
          signature,
          url: `${proxyBase}/${name}`,
        };
      };

      for (const asset of release.assets) {
        const name: string = asset.name;

        if (name.endsWith(".sig")) continue;

        // Windows NSIS installer
        if (name.endsWith(".nsis.zip")) {
          await addPlatform("windows-x86_64", name);
        }
        // Windows MSI
        else if (name.endsWith(".msi.zip")) {
          await addPlatform("windows-x86_64", name);
        }
        // Windows standalone .exe with matching .sig
        else if (name.endsWith(".exe")) {
          await addPlatform("windows-x86_64", name);
        }
        // macOS
        else if (name.endsWith(".app.tar.gz")) {
          const arch = name.includes("aarch64") || name.includes("arm64")
            ? "darwin-aarch64"
            : "darwin-x86_64";
          await addPlatform(arch, name);
        }
        // Linux
        else if (name.endsWith(".AppImage.tar.gz")) {
          const arch = name.includes("arm") || name.includes("aarch64")
            ? "linux-aarch64"
            : "linux-x86_64";
          await addPlatform(arch, name);
        }
      }

      return NextResponse.json(latestJson, {
        headers: { "Cache-Control": "public, s-maxage=60" },
      });
    } catch (err) {
      console.error("Updater latest.json error:", err);
      return NextResponse.json({ error: "Failed to fetch release" }, { status: 502 });
    }
  }

  // Proxy file download (.exe, .sig, etc.)
  try {
    // Get latest release assets
    const releaseRes = await fetch(`${GITHUB_API}/releases/latest`, {
      headers: authHeaders(token),
    });

    if (!releaseRes.ok) {
      return NextResponse.json({ error: "Release not found" }, { status: 404 });
    }

    const release = await releaseRes.json();
    const asset = release.assets?.find((a: { name: string }) => a.name === joinedPath);

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Stream the asset from GitHub
    const fileRes = await fetchAssetBody(asset.url, token);

    const headers = new Headers();
    headers.set("Content-Type", fileRes.headers.get("Content-Type") || "application/octet-stream");

    if (joinedPath.endsWith(".sig")) {
      headers.set("Content-Type", "text/plain");
    } else {
      headers.set("Content-Disposition", `attachment; filename="${joinedPath}"`);
    }

    if (fileRes.headers.get("Content-Length")) {
      headers.set("Content-Length", fileRes.headers.get("Content-Length")!);
    }

    // Stream response body
    return new NextResponse(fileRes.body, { status: 200, headers });
  } catch (err) {
    console.error("Updater proxy error:", err);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
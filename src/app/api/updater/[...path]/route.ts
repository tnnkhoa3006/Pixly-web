import { NextRequest, NextResponse } from "next/server";

const REPO = "tnnkhoa3006/Pixly";
const GITHUB_RAW = `https://github.com/${REPO}/releases/latest/download`;
const GITHUB_API = `https://api.github.com/repos/${REPO}`;

async function fetchWithAuth(url: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not configured");

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res;
}

function rewriteUrls(obj: unknown, proxyBase: string): unknown {
  if (typeof obj === "string") {
    // Rewrite GitHub download URLs to go through proxy
    if (obj.includes("github.com") && obj.includes("/releases/download/")) {
      const filename = obj.split("/").pop();
      return `${proxyBase}/${filename}`;
    }
    // Handle relative URLs (just filename)
    if (obj.endsWith(".sig") || obj.endsWith(".zip") || obj.endsWith(".msi") || obj.endsWith(".AppImage")) {
      return `${proxyBase}/${obj}`;
    }
    return obj;
  }
  if (Array.isArray(obj)) return obj.map((item) => rewriteUrls(item, proxyBase));
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, rewriteUrls(value, proxyBase)])
    );
  }
  return obj;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const joinedPath = path.join("/");

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // latest.json - fetch from GitHub API and rewrite URLs
  // Also handle bare /api/updater (no path) as alias for latest.json
  if (joinedPath === "latest.json" || joinedPath === "") {
    try {
      const res = await fetchWithAuth(`${GITHUB_API}/releases/latest`);
      const release = await res.json();

      const latestJson = {
        version: release.tag_name.replace(/^v/, ""),
        notes: release.name || release.tag_name,
        pub_date: release.published_at,
        platforms: {} as Record<string, { signature: string; url: string }>,
      };

      const proxyBase = `${req.nextUrl.origin}/api/updater`;
      const assetNames: string[] = release.assets.map((a: { name: string }) => a.name);

      for (const asset of release.assets) {
        const name: string = asset.name;
        const url = `${proxyBase}/${name}`;

        if (name.endsWith(".sig")) continue; // signatures handled with their files

        if (name.endsWith(".nsis.zip")) {
          latestJson.platforms["windows-x86_64"] = { signature: `${url}.sig`, url };
        } else if (name.endsWith(".msi.zip")) {
          latestJson.platforms["windows-x86_64"] = { signature: `${url}.sig`, url };
        } else if (name.endsWith(".exe") && assetNames.includes(`${name}.sig`)) {
          latestJson.platforms["windows-x86_64"] = { signature: `${proxyBase}/${name}.sig`, url };
        } else if (name.endsWith(".app.tar.gz")) {
          if (name.includes("aarch64") || name.includes("arm64")) {
            latestJson.platforms["darwin-aarch64"] = { signature: `${url}.sig`, url };
          } else {
            latestJson.platforms["darwin-x86_64"] = { signature: `${url}.sig`, url };
          }
        } else if (name.endsWith(".AppImage.tar.gz")) {
          if (name.includes("arm") || name.includes("aarch64")) {
            latestJson.platforms["linux-aarch64"] = { signature: `${url}.sig`, url };
          } else {
            latestJson.platforms["linux-x86_64"] = { signature: `${url}.sig`, url };
          }
        }
      }

      return NextResponse.json(latestJson, {
        headers: { "Cache-Control": "public, s-maxage=300" },
      });
    } catch {
      return NextResponse.json({ error: "Failed to fetch release" }, { status: 502 });
    }
  }

  // Update files (.sig, .zip, etc.) - download from GitHub with auth
  try {
    const githubUrl = `${GITHUB_RAW}/${joinedPath}`;
    const fileRes = await fetch(githubUrl, {
      headers: { Authorization: `Bearer ${token}` },
      redirect: "follow",
    });

    if (!fileRes.ok) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const headers = new Headers();
    const contentType = fileRes.headers.get("Content-Type");
    headers.set("Content-Type", contentType || "application/octet-stream");

    if (joinedPath.endsWith(".sig")) {
      headers.set("Content-Type", "text/plain");
    } else {
      headers.set("Content-Disposition", `attachment; filename="${joinedPath}"`);
    }

    if (fileRes.headers.get("Content-Length")) {
      headers.set("Content-Length", fileRes.headers.get("Content-Length")!);
    }

    return new NextResponse(fileRes.body, { headers });
  } catch {
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}

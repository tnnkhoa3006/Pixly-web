import { NextRequest, NextResponse } from "next/server";

const REPO = "tnnkhoa3006/Pixly";
const GITHUB_API = `https://api.github.com/repos/${REPO}`;

export async function GET(req: NextRequest) {
  const filename = req.nextUrl.searchParams.get("file");
  const tag = req.nextUrl.searchParams.get("tag");

  if (!filename || !tag) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  try {
    // Fetch asset info from GitHub API with auth
    const res = await fetch(`${GITHUB_API}/releases/tags/${tag}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Release not found" }, { status: 404 });
    }

    const release = await res.json();
    const asset = release.assets?.find((a: { name: string }) => a.name === filename);

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Download the asset with auth, follow redirect to CDN
    const fileRes = await fetch(asset.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/octet-stream",
      },
      redirect: "follow",
    });

    if (!fileRes.ok) {
      return NextResponse.json({ error: "Download failed" }, { status: 502 });
    }

    const headers = new Headers();
    headers.set("Content-Type", fileRes.headers.get("Content-Type") || "application/octet-stream");
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    if (fileRes.headers.get("Content-Length")) {
      headers.set("Content-Length", fileRes.headers.get("Content-Length")!);
    }

    return new NextResponse(fileRes.body, { headers });
  } catch {
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}

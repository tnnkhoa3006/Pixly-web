import { NextRequest, NextResponse } from "next/server";

const REPO = "tnnkhoa3006/Pixly";

export async function GET(req: NextRequest) {
  const filename = req.nextUrl.searchParams.get("file");
  const tag = req.nextUrl.searchParams.get("tag");

  if (!filename || !tag) {
    return NextResponse.json({ error: "Missing file or tag" }, { status: 400 });
  }

  const githubUrl = `https://github.com/${REPO}/releases/download/${tag}/${filename}`;

  try {
    const res = await fetch(githubUrl, { redirect: "follow" });

    if (!res.ok) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const headers = new Headers();
    headers.set("Content-Type", res.headers.get("Content-Type") || "application/octet-stream");
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);

    return new NextResponse(res.body, { headers });
  } catch {
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}

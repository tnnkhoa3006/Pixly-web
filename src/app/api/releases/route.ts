import { NextResponse } from "next/server";

const REPO = "tnnkhoa3006/Pixly";
const GITHUB_API = `https://api.github.com/repos/${REPO}/releases`;

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
  content_type: string;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  assets: GitHubAsset[];
  prerelease: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const mb = bytes / (1024 * 1024);
  return `~${Math.round(mb)} MB`;
}

function matchAsset(name: string): "windows" | "macos" | "linux" | null {
  const lower = name.toLowerCase();
  if (lower.endsWith(".msi") || (lower.endsWith(".exe") && !lower.includes("updater"))) return "windows";
  if (lower.endsWith(".dmg") || lower.endsWith(".app.tar.gz")) return "macos";
  if (lower.endsWith(".appimage")) return "linux";
  return null;
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(GITHUB_API, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 300 }, // cache 5 min
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub API error: ${res.status}` },
        { status: res.status }
      );
    }

    const releases: GitHubRelease[] = await res.json();

    const formatted = releases
      .filter((r) => !r.prerelease)
      .map((release) => {
        const platforms: Record<string, { url: string; size: string; filename: string }> = {};

        for (const asset of release.assets) {
          const platform = matchAsset(asset.name);
          if (platform && !platforms[platform]) {
            platforms[platform] = {
              url: asset.browser_download_url,
              size: formatBytes(asset.size),
              filename: asset.name,
            };
          }
        }

        return {
          version: release.tag_name,
          name: release.name,
          date: release.published_at,
          platforms,
        };
      });

    return NextResponse.json(formatted, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch releases" },
      { status: 500 }
    );
  }
}

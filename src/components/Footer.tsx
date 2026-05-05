"use client";

import { motion } from "framer-motion";
import { NAV_LINKS, GithubIcon } from "@/lib/constants";

const COMMUNITY_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/tnnkhoa3006/Pixly",
    icon: <GithubIcon size={15} />,
  },
  {
    label: "MIT License",
    href: "https://github.com/tnnkhoa3006/Pixly/blob/main/LICENSE",
    icon: null,
  },
  {
    label: "Releases",
    href: "https://github.com/tnnkhoa3006/Pixly/releases",
    icon: null,
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        paddingTop: 72,
        paddingBottom: 40,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 48,
            marginBottom: 56,
          }}
        >
          {/* Brand */}
          <div>
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  overflow: "hidden",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px var(--glow)",
                }}
              >
                <img
                  src="/icon.png"
                  alt="Pixly"
                  width={40}
                  height={40}
                  style={{ display: "block" }}
                />
              </div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                }}
              >
                Pixly<span style={{ color: "var(--accent)" }}>.</span>
              </span>
            </a>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 14,
                lineHeight: 1.7,
                maxWidth: 280,
              }}
            >
              The most powerful pixel art and animation editor, built with love
              for the creative community.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4
              style={{
                color: "var(--text-primary)",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase" as const,
                letterSpacing: "0.2em",
                marginBottom: 20,
              }}
            >
              Product
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <motion.a
                    whileHover={{ x: 4 }}
                    href={link.href}
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 14,
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4
              style={{
                color: "var(--text-primary)",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase" as const,
                letterSpacing: "0.2em",
                marginBottom: 20,
              }}
            >
              Community
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {COMMUNITY_LINKS.map((link) => (
                <li key={link.label}>
                  <motion.a
                    whileHover={{ x: 4 }}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 14,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    }}
                  >
                    {link.icon}
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: 28,
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
            © {new Date().getFullYear()} Pixly Editor. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a
              href="#"
              style={{
                color: "var(--text-muted)",
                fontSize: 13,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              Privacy
            </a>
            <a
              href="#"
              style={{
                color: "var(--text-muted)",
                fontSize: 13,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              Terms
            </a>
            <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
              Built with ❤️ for Pixels
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

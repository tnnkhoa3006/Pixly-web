"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Monitor, HardDrive, Smartphone, ChevronDown, Loader2 } from "lucide-react";

interface PlatformData {
  url: string;
  size: string;
  filename: string;
}

interface ReleaseData {
  version: string;
  name: string;
  date: string;
  platforms: Record<string, PlatformData>;
}

const PLATFORM_META = [
  { key: "windows", icon: <Monitor size={28} />, name: "Windows", format: ".msi", primary: true },
  { key: "linux", icon: <HardDrive size={28} />, name: "Linux", format: ".AppImage", primary: false },
  { key: "ios", icon: <Smartphone size={28} />, name: "iOS", format: ".zip", primary: false },
];

const TRUST = [
  { label: "Open source", dot: "green" },
  { label: "No account required", dot: "gray" },
  { label: "MIT License", dot: "gray" },
  { label: "GitHub Releases", dot: "gray" },
];

export default function DownloadSection() {
  const [releases, setReleases] = useState<ReleaseData[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetch("/api/releases")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReleases(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const selected = releases[selectedIdx];
  const currentDate = selected
    ? new Date(selected.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <section
      id="download"
      style={{
        background: "var(--bg-primary)",
        paddingTop: 100,
        paddingBottom: 100,
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <p
            style={{
              color: "var(--accent)",
              fontSize: 11,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              marginBottom: 20,
            }}
          >
            Download
          </p>
          <h2
            style={{
              color: "var(--text-primary)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Get{" "}
            <span
              style={{
                background: "var(--accent-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Pixly
            </span>{" "}
            for Desktop
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: 16,
              maxWidth: 480,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6,
            }}
          >
            Available for all major platforms. Free and open source forever.
          </p>
        </motion.div>

        {/* Version selector */}
        {releases.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 32,
              position: "relative",
            }}
          >
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "border-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                {selected?.version || "v0.0.0"}
                {currentDate && (
                  <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                    ({currentDate})
                  </span>
                )}
                <ChevronDown
                  size={16}
                  style={{
                    transition: "transform 0.15s ease",
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)",
                  }}
                />
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    marginTop: 8,
                    minWidth: 240,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    zIndex: 20,
                  }}
                >
                  {releases.map((release, idx) => {
                    const date = new Date(release.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });
                    return (
                      <button
                        key={release.version}
                        onClick={() => {
                          setSelectedIdx(idx);
                          setDropdownOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "12px 18px",
                          border: "none",
                          background: idx === selectedIdx ? "var(--glow)" : "transparent",
                          color: idx === selectedIdx ? "var(--accent)" : "var(--text-primary)",
                          fontSize: 14,
                          fontWeight: idx === selectedIdx ? 700 : 500,
                          cursor: "pointer",
                          transition: "background 0.1s ease",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => {
                          if (idx !== selectedIdx) e.currentTarget.style.background = "var(--bg-secondary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = idx === selectedIdx ? "var(--glow)" : "transparent";
                        }}
                      >
                        <span>{release.version}</span>
                        <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{date}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            maxWidth: 860,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 40,
          }}
        >
          {loading
            ? // Loading skeletons
              [0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 20,
                    padding: 28,
                    height: 280,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Loader2
                    size={24}
                    style={{
                      color: "var(--text-muted)",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                </div>
              ))
            : PLATFORM_META.map((meta, index) => {
                const platformData = selected?.platforms[meta.key];
                return (
                  <motion.div
                    key={meta.key}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                    whileHover={{ y: -4 }}
                    style={{
                      background: "var(--bg-card)",
                      border: meta.primary
                        ? "2px solid var(--accent)"
                        : "1px solid var(--border)",
                      boxShadow: meta.primary
                        ? "0 4px 24px var(--glow)"
                        : "var(--shadow-card)",
                      borderRadius: 20,
                      padding: 28,
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.15s ease",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 12px 32px var(--glow)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = meta.primary
                        ? "var(--accent)"
                        : "var(--border)";
                      (e.currentTarget as HTMLElement).style.boxShadow = meta.primary
                        ? "0 4px 24px var(--glow)"
                        : "var(--shadow-card)";
                    }}
                  >
                    {/* Recommended badge */}
                    {meta.primary && (
                      <div style={{ marginBottom: 16 }}>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            padding: "4px 12px",
                            borderRadius: 999,
                            background: "var(--glow)",
                            color: "var(--accent)",
                            border: "1px solid var(--accent)",
                          }}
                        >
                          Recommended
                        </span>
                      </div>
                    )}

                    {/* Icon box */}
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 24,
                        background: meta.primary ? "var(--glow)" : "var(--bg-secondary)",
                        color: meta.primary ? "var(--accent)" : "var(--text-muted)",
                        flexShrink: 0,
                      }}
                    >
                      {meta.icon}
                    </div>

                    {/* Name */}
                    <p
                      style={{
                        color: "var(--text-primary)",
                        fontSize: 20,
                        fontWeight: 900,
                        marginBottom: 6,
                      }}
                    >
                      {meta.name}
                    </p>

                    {/* Format & size */}
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: 13,
                        marginBottom: 4,
                      }}
                    >
                      {meta.format} {platformData ? `· ${platformData.size}` : ""}
                    </p>

                    {/* Version */}
                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: 11,
                        fontFamily: "monospace",
                        marginBottom: 28,
                      }}
                    >
                      {selected?.version || ""}
                    </p>

                    {/* Spacer */}
                    <div style={{ flex: 1 }} />

                    {/* CTA button */}
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      href={platformData && selected ? `/api/download?file=${encodeURIComponent(platformData.filename)}&tag=${encodeURIComponent(selected.version)}` : "#"}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        width: "100%",
                        padding: "12px 0",
                        borderRadius: 12,
                        fontSize: 14,
                        fontWeight: 700,
                        textDecoration: "none",
                        transition: "opacity 0.2s",
                        ...(!platformData
                          ? { opacity: 0.5, pointerEvents: "none" as const }
                          : {}),
                        ...(meta.primary
                          ? {
                              background: "var(--accent-gradient)",
                              color: "#fff",
                            }
                          : {
                              background: "transparent",
                              color: "var(--text-secondary)",
                              border: "1px solid var(--border)",
                            }),
                      }}
                    >
                      <Download size={16} />
                      {platformData
                        ? `Download for ${meta.name}`
                        : "Not available"}
                    </motion.a>
                  </motion.div>
                );
              })}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {TRUST.map((item, i) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: "var(--text-muted)",
                padding: "0 20px",
                borderRight:
                  i < TRUST.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: item.dot === "green" ? "#22c55e" : "var(--border)",
                }}
              />
              {item.label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* CSS for spin animation */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

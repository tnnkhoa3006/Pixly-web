"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, BookOpen, Monitor, Apple, HardDrive } from "lucide-react";

function PixelCanvas() {
  const pixels = [
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 2, 2, 1, 2, 1, 2, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 2, 2, 1, 2, 1, 2, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0],
    [0, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 0, 0, 0, 0],
    [0, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 0, 0, 0, 0],
    [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 2, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const colors = ["transparent", "#3b3b5c", "#8b5cf6"];

  return (
    <motion.div
      whileHover={{ y: -5, rotate: 1 }}
      className="relative w-full"
      style={{ maxWidth: 520 }}
    >
      <div
        className="rounded-3xl w-full"
        style={{
          padding: "20px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-card)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 pb-3"
          style={{ borderBottom: "1px solid var(--border)", marginBottom: 16 }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444", flexShrink: 0 }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b", flexShrink: 0 }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
          <span className="text-xs font-medium" style={{ color: "var(--text-muted)", marginLeft: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            Pixly — Untitled Canvas
          </span>
        </div>

        {/* Canvas area */}
        <div className="flex" style={{ gap: 16 }}>
          {/* Toolbar */}
          <div className="flex flex-col" style={{ gap: 8, flexShrink: 0 }}>
            {["✏️", "🔲", "🪣", "👁️", "⬜", "🔄"].map((icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, backgroundColor: "var(--glow)" }}
                className="flex items-center justify-center text-xs cursor-pointer transition-colors duration-200"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: i === 0 ? "var(--glow)" : "transparent",
                  border: i === 0 ? "1px solid var(--accent)" : "1px solid transparent",
                }}
              >
                {icon}
              </motion.div>
            ))}
          </div>

          {/* Pixel grid */}
          <div className="flex-1 flex items-center justify-center" style={{ minWidth: 0, overflow: "hidden" }}>
            <div className="grid" style={{ gridTemplateColumns: "repeat(16, 1fr)", gap: 1 }}>
              {pixels.flat().map((colorIndex, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  style={{
                    width: "clamp(8px, 1.8vw, 14px)",
                    height: "clamp(8px, 1.8vw, 14px)",
                    borderRadius: 2,
                    background: colors[colorIndex],
                    boxShadow: colorIndex > 0 ? `0 0 8px ${colors[colorIndex]}60` : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline bar */}
        <div
          className="flex items-center"
          style={{ borderTop: "1px solid var(--border)", marginTop: 16, paddingTop: 12, gap: 6, overflow: "hidden" }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((f) => (
            <motion.div
              key={f}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex-1 flex items-center justify-center font-mono cursor-pointer"
              style={{
                minWidth: 0,
                height: 28,
                borderRadius: 6,
                fontSize: 10,
                background: f === 1 ? "var(--glow)" : "var(--bg-secondary)",
                border: f === 1 ? "1px solid var(--accent)" : "1px solid var(--border)",
                color: f === 1 ? "var(--accent)" : "var(--text-muted)",
              }}
            >
              {f}
            </motion.div>
          ))}
        </div>
      </div>
      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          inset: -30,
          zIndex: -1,
          borderRadius: 40,
          filter: "blur(60px)",
          opacity: 0.25,
          background: "var(--accent-gradient)",
        }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const [version, setVersion] = useState("v0.1.8");

  useEffect(() => {
    fetch("/api/releases")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setVersion(data[0].version);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative flex items-center overflow-hidden" style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -2,
          background: "radial-gradient(ellipse 80% 60% at 50% -20%, var(--glow-strong), transparent)",
        }}
      />

      <div className="container-main w-full" style={{ paddingTop: 64, paddingBottom: 96 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "clamp(40px, 6vw, 100px)" }}>
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full text-xs font-semibold cursor-default transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              style={{
                padding: "8px 16px",
                marginBottom: 24,
                background: "var(--glow)",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
              }}
            >
              <span className="animate-pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
              {version} — Now Available
            </motion.div>

            <h1
              className="font-bold tracking-tight text-[var(--text-primary)]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: 24 }}
            >
              Professional Pixel Art{" "}
              <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                & Animation
              </span>{" "}
              Editor
            </h1>

            <p className="text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: "var(--text-secondary)", marginBottom: 40 }}>
              Design, animate, and bring pixels to life. A powerful editor with layer-based editing,
              frame-by-frame animation, and professional drawing tools for pixel artists.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center" style={{ gap: 16, marginBottom: 40 }}>
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                href="#download"
                className="inline-flex items-center gap-2 rounded-2xl text-white font-bold text-sm transition-all duration-300"
                style={{ padding: "16px 32px", background: "var(--accent-gradient)" }}
              >
                <Download size={20} />
                Download Pixly
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, borderColor: "var(--accent)", color: "var(--accent)", backgroundColor: "var(--glow)" }}
                whileTap={{ scale: 0.98 }}
                href="#docs"
                className="inline-flex items-center gap-2 rounded-2xl font-bold text-sm transition-all duration-300"
                style={{
                  padding: "16px 32px",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  backgroundColor: "transparent",
                }}
              >
                <BookOpen size={20} />
                Documentation
              </motion.a>
            </div>

            {/* Platform badges */}
            <div className="flex items-center" style={{ gap: 24 }}>
              {[
                { icon: <Monitor size={16} />, label: "Windows" },
                { icon: <Apple size={16} />, label: "macOS" },
                { icon: <HardDrive size={16} />, label: "Linux" },
              ].map((p) => (
                <div
                  key={p.label}
                  className="flex items-center text-xs font-medium"
                  style={{ gap: 8, color: "var(--text-muted)" }}
                >
                  {p.icon}
                  {p.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: App preview */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="hidden lg:flex justify-center"
            style={{ perspective: 1000 }}
          >
            <PixelCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
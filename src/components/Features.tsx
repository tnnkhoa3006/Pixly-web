"use client";

import { motion } from "framer-motion";
import { Pencil, Layers, Film, Share2 } from "lucide-react";

const FEATURES = [
  {
    icon: <Pencil size={22} />,
    title: "Drawing Tools",
    description:
      "A complete suite of pixel-perfect tools. From classic pencils to advanced shape generators and symmetry modes.",
    gradientFrom: "#7c3aed",
    gradientTo: "#6366f1",
  },
  {
    icon: <Layers size={22} />,
    title: "Layer System",
    description:
      "Professional-grade layer management. Reorder, blend, and organize your work with full control over opacity and visibility.",
    gradientFrom: "#3b82f6",
    gradientTo: "#06b6d4",
  },
  {
    icon: <Film size={22} />,
    title: "Animation Studio",
    description:
      "Create smooth animations with integrated onion skinning, frame management, and real-time playback controls.",
    gradientFrom: "#ec4899",
    gradientTo: "#f43f5e",
  },
  {
    icon: <Share2 size={22} />,
    title: "Export & Sharing",
    description:
      "Seamlessly export your creations to GIF, Sprite Sheets, or PNG. High-fidelity output preserved for every pixel.",
    gradientFrom: "#f59e0b",
    gradientTo: "#f97316",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      style={{
        background: "var(--bg-secondary)",
        paddingTop: 100,
        paddingBottom: 100,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "25%",
          width: 384,
          height: 384,
          borderRadius: "50%",
          background: "rgba(124, 58, 237, 0.08)",
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: "25%",
          width: 384,
          height: 384,
          borderRadius: "50%",
          background: "rgba(59, 130, 246, 0.08)",
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 32,
          paddingRight: 32,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              display: "inline-block",
              padding: "6px 16px",
              marginBottom: 20,
              fontSize: 10,
              fontWeight: 900,
              textTransform: "uppercase" as const,
              letterSpacing: "0.3em",
              borderRadius: 999,
              border: "1px solid var(--accent)",
              background: "var(--glow)",
              color: "var(--accent)",
            }}
          >
            Capabilities
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              color: "var(--text-primary)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: 20,
              letterSpacing: "-0.02em",
            }}
          >
            Everything you need for
            <br />
            <span
              style={{
                background: "var(--accent-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              pixel perfection.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              color: "var(--text-secondary)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Designed for professional artists and game developers who demand
            precision, speed, and a seamless creative workflow.
          </motion.p>
        </div>

        {/* Feature cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 400, damping: 25 }}
              whileHover={{ y: -6 }}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
                borderRadius: 24,
                padding: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                cursor: "default",
                transition: "all 0.15s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 28,
                  background: `linear-gradient(135deg, ${feature.gradientFrom}, ${feature.gradientTo})`,
                  color: "#fff",
                  flexShrink: 0,
                  boxShadow: `0 8px 20px ${feature.gradientFrom}40`,
                }}
              >
                {feature.icon}
              </div>

              <h3
                style={{
                  color: "var(--text-primary)",
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: 15,
                  lineHeight: 1.7,
                  maxWidth: 340,
                }}
              >
                {feature.description}
              </p>

              {/* Bottom accent line */}
              <div
                style={{
                  marginTop: 32,
                  width: 48,
                  height: 3,
                  borderRadius: 999,
                  background: `linear-gradient(to right, ${feature.gradientFrom}, ${feature.gradientTo})`,
                  opacity: 0.5,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

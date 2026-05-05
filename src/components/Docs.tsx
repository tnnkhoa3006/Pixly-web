"use client";

import { motion } from "framer-motion";
import { BookOpen, Pencil, Film, ArrowRight } from "lucide-react";

const DOCS_LINKS = [
  {
    icon: <BookOpen size={22} />,
    title: "Getting Started",
    description:
      "Learn how to install Pixly, set up your first workspace, and start creating pixel art in minutes.",
    href: "https://github.com/tnnkhoa3006/Pixly#readme",
    gradientFrom: "#7c3aed",
    gradientTo: "#6366f1",
  },
  {
    icon: <Pencil size={22} />,
    title: "Drawing Guide",
    description:
      "Deep dive into all drawing tools, including custom brushes, symmetry modes, and advanced selections.",
    href: "https://github.com/tnnkhoa3006/Pixly#readme",
    gradientFrom: "#3b82f6",
    gradientTo: "#06b6d4",
  },
  {
    icon: <Film size={22} />,
    title: "Animation Workflow",
    description:
      "Master the timeline, layers, and onion skinning to create smooth, high-quality animations.",
    href: "https://github.com/tnnkhoa3006/Pixly#readme",
    gradientFrom: "#ec4899",
    gradientTo: "#f43f5e",
  },
];

export default function Docs() {
  return (
    <section
      id="docs"
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
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              marginBottom: 20,
              fontSize: 10,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              borderRadius: 999,
              border: "1px solid var(--accent)",
              background: "var(--glow)",
              color: "var(--accent)",
            }}
          >
            Documentation
          </span>
          <h2
            style={{
              color: "var(--text-primary)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Help &amp; Resources
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: 16,
              lineHeight: 1.6,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Master Pixly with our comprehensive guides and community-driven documentation.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {DOCS_LINKS.map((doc, index) => (
            <motion.a
              key={doc.title}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 400, damping: 25 }}
              whileHover={{ y: -6 }}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
                borderRadius: 20,
                padding: 32,
                textDecoration: "none",
                transition: "all 0.15s ease",
                overflow: "hidden",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--accent)";
                el.style.boxShadow = "var(--shadow-card-hover)";
                const corner = el.querySelector("[data-corner]") as HTMLElement;
                if (corner) {
                  corner.style.width = "140px";
                  corner.style.height = "140px";
                  corner.style.background = `linear-gradient(135deg, ${doc.gradientFrom}40, ${doc.gradientTo}18, transparent)`;
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "var(--shadow-card)";
                const corner = el.querySelector("[data-corner]") as HTMLElement;
                if (corner) {
                  corner.style.width = "80px";
                  corner.style.height = "80px";
                  corner.style.background = `linear-gradient(135deg, ${doc.gradientFrom}18, transparent)`;
                }
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                  background: `linear-gradient(135deg, ${doc.gradientFrom}, ${doc.gradientTo})`,
                  color: "#fff",
                  flexShrink: 0,
                  boxShadow: `0 4px 12px ${doc.gradientFrom}40`,
                  transition: "transform 0.15s ease",
                }}
                className="group-hover:scale-110"
              >
                {doc.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  color: "var(--text-primary)",
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 12,
                  transition: "color 0.15s",
                }}
              >
                {doc.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: 14,
                  lineHeight: 1.65,
                  flex: 1,
                  marginBottom: 24,
                }}
              >
                {doc.description}
              </p>

              {/* Learn more */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--accent)",
                }}
              >
                Learn more
                <ArrowRight size={16} />
              </div>

              {/* Corner decoration */}
              <div
                data-corner
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 80,
                  height: 80,
                  background: `linear-gradient(135deg, ${doc.gradientFrom}18, transparent)`,
                  borderBottomLeftRadius: "100%",
                  pointerEvents: "none",
                  transition: "all 0.15s ease",
                }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

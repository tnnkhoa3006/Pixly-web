"use client";

import { motion } from "framer-motion";

const SHOWCASE_ITEMS = [
  {
    title: "Character Design",
    description: "Detailed character sprites with multiple color palettes",
    grid: [
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 2, 2, 2, 1, 0],
      [0, 1, 2, 1, 2, 1, 2, 1],
      [0, 1, 2, 2, 2, 2, 2, 1],
      [0, 0, 1, 2, 1, 2, 1, 0],
      [0, 1, 1, 2, 2, 1, 1, 0],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [0, 1, 0, 1, 1, 0, 1, 0],
    ],
    colors: ["transparent", "#3b3b5c", "#8b5cf6"],
    bgColor: "#7c3aed",
    tag: "Character",
  },
  {
    title: "Tileset Design",
    description: "Seamless tileable patterns for game environments",
    grid: [
      [1, 1, 2, 2, 1, 1, 2, 2],
      [1, 2, 2, 2, 1, 2, 2, 2],
      [2, 2, 1, 1, 2, 2, 1, 1],
      [2, 1, 1, 2, 2, 1, 1, 2],
      [1, 1, 2, 2, 1, 1, 2, 2],
      [1, 2, 2, 2, 1, 2, 2, 2],
      [2, 2, 1, 1, 2, 2, 1, 1],
      [2, 1, 1, 2, 2, 1, 1, 2],
    ],
    colors: ["transparent", "#22c55e", "#15803d"],
    bgColor: "#22c55e",
    tag: "Tileset",
  },
  {
    title: "Scene Composition",
    description: "Full scene artwork with depth and atmosphere",
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0],
      [0, 1, 2, 2, 2, 1, 0, 0],
      [1, 2, 2, 2, 2, 2, 1, 0],
      [3, 3, 3, 3, 3, 3, 3, 3],
      [3, 2, 3, 3, 2, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3],
    ],
    colors: ["transparent", "#3b3b5c", "#6366f1", "#1e3a5f"],
    bgColor: "#6366f1",
    tag: "Scene",
  },
  {
    title: "Item & Icon Design",
    description: "Game items and UI icons with clean pixel art style",
    grid: [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 2, 2, 1, 0, 0],
      [0, 1, 2, 2, 2, 2, 1, 0],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [0, 1, 2, 2, 2, 2, 1, 0],
      [0, 0, 1, 2, 2, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
    ],
    colors: ["transparent", "#f59e0b", "#fbbf24"],
    bgColor: "#f59e0b",
    tag: "Icon",
  },
];

function PixelPreview({ grid, colors }: { grid: number[][]; colors: string[] }) {
  const cols = grid[0].length;
  const pixelSize = 16;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${pixelSize}px)`,
        gap: 2,
      }}
    >
      {grid.flat().map((c, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: i * 0.004 }}
          style={{
            width: pixelSize,
            height: pixelSize,
            borderRadius: 2,
            background: colors[c],
            boxShadow: c > 0 ? `0 0 4px ${colors[c]}50` : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function Showcase() {
  return (
    <section
      id="showcase"
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
              textTransform: "uppercase" as const,
              letterSpacing: "0.3em",
              borderRadius: 999,
              border: "1px solid var(--accent)",
              background: "var(--glow)",
              color: "var(--accent)",
            }}
          >
            Showcase
          </span>
          <h2
            style={{
              color: "var(--text-primary)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Made with{" "}
            <span
              style={{
                background: "var(--accent-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Pixly
            </span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: 16,
              lineHeight: 1.6,
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            See what creators are building with our powerful pixel art editor.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {SHOWCASE_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 400, damping: 25 }}
              whileHover={{ y: -8 }}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
                borderRadius: 20,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card-hover)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              {/* Pixel preview area */}
              <div
                style={{
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 24,
                  background: `${item.bgColor}12`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <PixelPreview grid={item.grid} colors={item.colors} />
                </motion.div>
              </div>

              {/* Info */}
              <div style={{ padding: "16px 20px 20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontSize: 15,
                      fontWeight: 700,
                    }}
                  >
                    {item.title}
                  </h3>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.08em",
                      padding: "2px 8px",
                      borderRadius: 999,
                      background: `${item.bgColor}18`,
                      color: item.bgColor,
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 12,
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

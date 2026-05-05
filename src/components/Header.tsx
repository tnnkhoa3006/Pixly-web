"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { NAV_LINKS, GithubIcon } from "@/lib/constants";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [githubHovered, setGithubHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        backgroundColor: scrolled ? "var(--bg-header)" : "rgba(0, 0, 0, 0)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid rgba(0, 0, 0, 0)",
        height: scrolled ? 72 : 88,
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
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            textDecoration: "none",
          }}
        >
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 4px 16px rgba(124, 58, 237, 0.35)",
            }}
          >
            <img
              src="/icon.png"
              alt="Pixly"
              width={44}
              height={44}
              style={{ display: "block" }}
            />
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                lineHeight: 1,
              }}
            >
              Pixly<span style={{ color: "var(--accent)" }}>.</span>
            </span>
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "var(--text-muted)",
                opacity: 0.6,
                marginTop: 2,
              }}
            >
              Editor
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ y: -2 }}
              style={{
                position: "relative",
                fontSize: 14,
                fontWeight: 700,
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* GitHub button */}
          <motion.a
            href="https://github.com/tnnkhoa3006/Pixly"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={() => setGithubHovered(true)}
            onMouseLeave={() => setGithubHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 20px",
              fontSize: 13,
              fontWeight: 700,
              borderRadius: 12,
              textDecoration: "none",
              transition: "all 0.25s ease",
              background: githubHovered
                ? "var(--accent-gradient)"
                : "var(--bg-card)",
              color: githubHovered ? "#fff" : "var(--text-primary)",
              border: githubHovered
                ? "1px solid transparent"
                : "1px solid var(--border)",
              boxShadow: githubHovered
                ? "0 4px 16px var(--glow-strong)"
                : "var(--shadow-card)",
            }}
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </motion.a>

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              (e.currentTarget as HTMLElement).style.background = "var(--glow)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
            }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}

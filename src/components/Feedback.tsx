"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, User, MessageSquare } from "lucide-react";

const EMAIL = "khoat0360@gmail.com";

export default function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Pixly Feedback from ${name || "Anonymous"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "1px solid var(--border)",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    fontFamily: "inherit",
  };

  return (
    <section
      id="feedback"
      style={{
        background: "var(--bg-secondary)",
        paddingTop: 100,
        paddingBottom: 100,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(124, 58, 237, 0.06)",
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
        <div style={{ textAlign: "center", marginBottom: 56 }}>
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
            Feedback
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
            We&apos;d love to{" "}
            <span
              style={{
                background: "var(--accent-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              hear from you
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
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Have suggestions, bug reports, or just want to say hello?
            Send us a message and we&apos;ll get back to you.
          </motion.p>
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-card)",
            borderRadius: 24,
            padding: 40,
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Name */}
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                }}
              >
                <User size={14} />
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px var(--glow)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                }}
              >
                <Mail size={14} />
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px var(--glow)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                }}
              >
                <MessageSquare size={14} />
                Message
              </label>
              <textarea
                placeholder="Tell us what you think..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: 120,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px var(--glow)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 0",
                borderRadius: 12,
                border: "none",
                background: "var(--accent-gradient)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                transition: "opacity 0.15s ease",
                marginTop: 8,
              }}
            >
              <Send size={16} />
              {sent ? "Opening email..." : "Send Feedback"}
            </motion.button>
          </form>

          {/* Email display */}
          <p
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 13,
              color: "var(--text-muted)",
            }}
          >
            Or email us directly at{" "}
            <a
              href={`mailto:${EMAIL}`}
              style={{
                color: "var(--accent)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {EMAIL}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

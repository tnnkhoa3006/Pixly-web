"use client";

import { useEffect, useState } from "react";

const SIZE = 56;

export default function PixelCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);

      if (!el) return;

      const style = getComputedStyle(el);

      const interactive =
        style.cursor === "pointer" ||
        el.tagName === "BUTTON" ||
        el.tagName === "A" ||
        el.closest("button") ||
        el.closest("a");

      setHover(!!interactive);
    };

    const down = () => setClick(true);
    const up = () => setClick(false);

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  const scale = click ? 0.82 : hover ? 1.35 : 1;

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }

        @media (pointer: coarse) {
          .cursor-wrap {
            display: none;
          }

          * {
            cursor: auto !important;
          }
        }

        @keyframes pixelPulse {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.12);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
        }

        @keyframes rotateSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes flicker {
          0%,100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>

      <div
        className="cursor-wrap"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: SIZE,
          height: SIZE,
          pointerEvents: "none",
          zIndex: 999999,
          opacity: visible ? 1 : 0,
          transform: `translate3d(${pos.x - SIZE / 2}px,${
            pos.y - SIZE / 2
          }px,0) scale(${scale})`,
          transition:
            "transform 0.12s cubic-bezier(.22,1,.36,1), opacity 0.2s",
          willChange: "transform",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: hover
              ? "rgba(139,92,246,0.18)"
              : "rgba(251,191,36,0.14)",
            filter: "blur(12px)",
            transform: "scale(1.2)",
          }}
        />

        {/* Outer rotating ring */}
        <div
          style={{
            position: "absolute",
            inset: 6,
            border: `2px solid ${
              hover ? "#8b5cf6" : click ? "#ff5a5a" : "#fbbf24"
            }`,
            borderRadius: "50%",
            animation: "rotateSlow 5s linear infinite",
            boxShadow: hover
              ? "0 0 18px rgba(139,92,246,0.8)"
              : "0 0 16px rgba(251,191,36,0.7)",
          }}
        />

        {/* Pixel core */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 14,
            height: 14,
            transform: "translate(-50%, -50%)",
            imageRendering: "pixelated",
            background: hover
              ? "#a78bfa"
              : click
              ? "#ff7b7b"
              : "#fde047",
            boxShadow: `
              0 0 0 4px ${
                hover
                  ? "rgba(167,139,250,0.25)"
                  : "rgba(253,224,71,0.25)"
              },
              0 0 18px ${
                hover
                  ? "rgba(139,92,246,0.9)"
                  : "rgba(251,191,36,0.8)"
              }
            `,
            animation: "pixelPulse 1.2s infinite",
          }}
        />

        {/* Crosshair */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            animation: "flicker 1.6s infinite",
          }}
        >
          {/* top */}
          <div
            style={{
              position: "absolute",
              top: 2,
              left: "50%",
              width: 2,
              height: 10,
              background: hover ? "#c4b5fd" : "#fde68a",
              transform: "translateX(-50%)",
            }}
          />

          {/* bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 2,
              left: "50%",
              width: 2,
              height: 10,
              background: hover ? "#c4b5fd" : "#fde68a",
              transform: "translateX(-50%)",
            }}
          />

          {/* left */}
          <div
            style={{
              position: "absolute",
              left: 2,
              top: "50%",
              width: 10,
              height: 2,
              background: hover ? "#c4b5fd" : "#fde68a",
              transform: "translateY(-50%)",
            }}
          />

          {/* right */}
          <div
            style={{
              position: "absolute",
              right: 2,
              top: "50%",
              width: 10,
              height: 2,
              background: hover ? "#c4b5fd" : "#fde68a",
              transform: "translateY(-50%)",
            }}
          />
        </div>
      </div>
    </>
  );
}
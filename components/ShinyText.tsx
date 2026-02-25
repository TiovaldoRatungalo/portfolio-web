// components/ShinyText.tsx
import React, { ReactNode, CSSProperties } from "react";

type ShinyTextProps = {
  text?: string;
  children?: ReactNode;
  disabled?: boolean;
  speed?: number; 
  className?: string;
  style?: CSSProperties;
};

export default function ShinyText({
  text,
  children,
  disabled = false,
  speed = 10,
  className = "",
  style = {},
}: ShinyTextProps) {
  const content = children ?? text ?? "";

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        color: "#9ca3af", 
        textShadow: "0 0 2px rgba(255,255,255,0.15)", 
        ...style,
      }}
    >
      {/* teks utama solid */}
      <span className="relative z-10">{content}</span>

      {/* overlay shimmer */}
      {!disabled && (
        <span
          aria-hidden
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0) 45%, rgba(6,246,246,0.8) 50%, rgba(255,255,255,0) 55%)",
            backgroundSize: "200% 100%",
            animation: `shineAnim ${Math.max(0.1, speed)}s linear infinite`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {content}
        </span>
      )}

      <style jsx>{`
        @keyframes shineAnim {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </span>
  );
}

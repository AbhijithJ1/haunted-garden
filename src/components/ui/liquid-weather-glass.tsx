import React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "../../lib/utils";

interface LiquidGlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  blurIntensity?: "sm" | "md" | "lg" | "xl";
  shadowIntensity?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  glowIntensity?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  draggable?: boolean;
  style?: React.CSSProperties;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className,
  borderRadius = "20px",
  blurIntensity = "lg",
  shadowIntensity = "xs",
  glowIntensity = "xs",
  draggable = false,
  style,
  ...motionProps
}) => {
  const blurClass = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  }[blurIntensity];

  const shadowStyles = {
    none: "none",
    xs: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    sm: "0 12px 40px 0 rgba(0, 0, 0, 0.45)",
    md: "0 16px 48px 0 rgba(0, 0, 0, 0.55)",
    lg: "0 20px 56px 0 rgba(0, 0, 0, 0.65)",
    xl: "0 24px 64px 0 rgba(0, 0, 0, 0.75)",
  }[shadowIntensity];

  const glowStyles = {
    none: "none",
    xs: "0 0 15px rgba(139, 14, 26, 0.15)",
    sm: "0 0 25px rgba(139, 14, 26, 0.25)",
    md: "0 0 35px rgba(139, 14, 26, 0.35)",
    lg: "0 0 45px rgba(139, 14, 26, 0.45)",
    xl: "0 0 60px rgba(139, 14, 26, 0.6)",
  }[glowIntensity];

  return (
    <>
      {/* Hidden SVG Filter Definition for Liquid Glass Distortion */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="glass-blur">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.007"
              numOctaves={2}
              seed={2}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={12}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        style={{
          borderRadius,
          boxShadow: `${shadowStyles}, ${glowStyles}`,
          ...style,
        }}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "border border-white/[0.08] hover:border-red-900/30",
          className
        )}
        {...motionProps}
      >
        <div
          className={cn(
            "w-full h-full p-6",
            blurClass,
            "bg-[#07070c]/50 text-[#E8E3DF]",
            "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.5)]"
          )}
        >
          {children}
        </div>
      </motion.div>
    </>
  );
};

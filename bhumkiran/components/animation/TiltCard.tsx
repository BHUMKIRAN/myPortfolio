
"use client";

import { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // control tilt strength
  scale?: number; // hover zoom
}

const TiltCard = ({
  children,
  className = "",
  intensity = 12,
  scale = 1.05,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * intensity;
    const rotateY = ((midX - x) / midX) * intensity;

    setTransform(
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
    );
  };

  const handleMouseLeave = () => {
    setTransform("rotateX(0deg) rotateY(0deg) scale(1)");
  };

  return (
    <div className="perspective-1000">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform }}
        className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
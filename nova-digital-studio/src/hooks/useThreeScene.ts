"use client";

import { useEffect, useRef, useState } from "react";
import { SceneManager } from "@/three/scene";

export function useThreeScene(heroId: string, storyId: string) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = document.getElementById(heroId);
    const story = document.getElementById(storyId);
    if (!canvas || !hero || !story) return;
    let manager: SceneManager | undefined;
    try {
      manager = new SceneManager(canvas, hero, story, matchMedia("(prefers-reduced-motion: reduce)").matches, () => setFallback(true));
    } catch {
      queueMicrotask(() => setFallback(true));
    }
    return () => manager?.dispose();
  }, [heroId, storyId]);

  return { canvasRef, fallback };
}

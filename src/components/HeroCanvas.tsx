"use client";

import { useRef, useEffect, useState } from "react";
import { useTransform, motion, useSpring, MotionValue } from "framer-motion";

interface HeroCanvasProps {
  frameCount: number;
  baseUrl: string;
  extension?: string;
  scrollYProgress: MotionValue<number>;
}

export default function HeroCanvas({ frameCount, baseUrl, extension = "webp", scrollYProgress }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Add ultra-smooth spring physics for that "heavy" cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 20,
    damping: 40,
    restDelta: 0.0001
  });

  // Map smooth scroll progress to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  // Preload images with pre-emptive decoding
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, '0');
      img.src = `${baseUrl}frame_${frameNumber}_delay-0.2s.${extension}`;
      
      // Pre-emptively decode the image to prevent stuttering during scroll
      img.decode().then(() => {
        count++;
        if (i === 0) setIsLoaded(true);
      }).catch(() => {
        // Fallback for older browsers or broken files
        count++;
        if (i === 0) setIsLoaded(true);
      });
      
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount, baseUrl, extension]);

  // Draw current frame to canvas
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || images.length === 0) return;

      const currentFrame = Math.round(frameIndex.get());
      const img = images[currentFrame] || images[0];
      if (!img.complete) return; // Don't draw if the specific frame hasn't loaded yet

      // Maintain aspect ratio (Cover effect)
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > imgAspect) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspect;
        offsetX = 0;
        offsetY = -(drawHeight - canvas.height) / 2;
      } else {
        drawWidth = canvas.height * imgAspect;
        drawHeight = canvas.height;
        offsetX = -(drawWidth - canvas.width) / 2;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const unsubscribe = frameIndex.on("change", () => {
      requestAnimationFrame(render);
    });

    // Initial render
    if (isLoaded) render();

    return () => unsubscribe();
  }, [images, isLoaded, frameIndex]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-raat z-10">
          <div className="w-12 h-12 border-2 border-sona/20 border-t-sona rounded-full animate-spin" />
        </div>
      )}
      <motion.canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
}

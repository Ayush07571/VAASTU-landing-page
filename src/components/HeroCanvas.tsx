"use client";

import { useRef, useEffect, useState } from "react";
import { useTransform, motion, useSpring, MotionValue } from "framer-motion";

interface HeroCanvasProps {
  frameCount: number;
  baseUrl: string;
  extension?: string;
  scrollYProgress: MotionValue<number>;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export default function HeroCanvas({ 
  frameCount, 
  baseUrl, 
  extension = "webp", 
  scrollYProgress,
  onProgress,
  onComplete
}: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ultra-responsive spring to eliminate input lag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300, 
    damping: 60,
    restDelta: 0.001
  });

  // Map smooth scroll progress to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  // High-performance Serial Batch Preloader
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;
    const BATCH_SIZE = 15; // Load 15 images at a time to prevent browser throttling

    const loadBatch = async (start: number) => {
      if (!isMounted) return;
      
      const end = Math.min(start + BATCH_SIZE, frameCount);
      const batchPromises = [];

      for (let i = start; i < end; i++) {
        const img = new Image();
        const frameNumber = i.toString().padStart(3, '0');
        img.src = `${baseUrl}frame_${frameNumber}_delay-0.2s.${extension}`;
        
        const promise = img.decode().then(() => {
          count++;
          const currentProgress = (count / frameCount) * 100;
          if (onProgress) onProgress(currentProgress);
          
          window.dispatchEvent(new CustomEvent("vaastuLoadingProgress", { 
            detail: { progress: currentProgress } 
          }));
          
          if (i === 0) setIsLoaded(true);
          loadedImages[i] = img; // Insert at specific index to maintain order
        }).catch((err) => {
          console.error(`Frame ${frameNumber} failed:`, err);
          count++; // Still count it so progress moves, but log the error
        });
        
        batchPromises.push(promise);
      }

      await Promise.all(batchPromises);

      if (count < frameCount && isMounted) {
        // Load next batch
        loadBatch(end);
      } else if (count === frameCount && onComplete) {
        onComplete();
      }
    };

    loadBatch(0);
    setImages(loadedImages);

    return () => { isMounted = false; };
  }, [frameCount, baseUrl, extension]);

  // Draw current frame to canvas
  useEffect(() => {
    let animationFrameId: number;
    
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const currentFrame = Math.round(frameIndex.get());
      const img = images[currentFrame] || images[0];
      if (!img.complete) return;

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

      // No clearRect needed for full-screen opaque images
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleFrame = () => {
      render();
    };

    const unsubscribe = frameIndex.on("change", () => {
      animationFrameId = requestAnimationFrame(handleFrame);
    });

    // Initial render
    if (isLoaded) render();

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
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
        style={{ opacity: isLoaded ? 1 : 0, willChange: "transform" }}
      />
    </div>
  );
}

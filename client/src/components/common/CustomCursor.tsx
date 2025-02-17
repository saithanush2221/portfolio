import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setTrailPos({ x: e.clientX, y: e.clientY });
      }, 100);

      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full mix-blend-difference pointer-events-none z-50"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full mix-blend-difference pointer-events-none z-50"
        animate={{
          x: trailPos.x - 16,
          y: trailPos.y - 16,
          scale: isPointer ? 1.5 : 1,
          opacity: 0.6,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-primary rounded-full mix-blend-difference pointer-events-none z-50"
        animate={{
          x: trailPos.x - 24,
          y: trailPos.y - 24,
          scale: isPointer ? 1.5 : 1,
          opacity: 0.3,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      />
    </>
  );
}
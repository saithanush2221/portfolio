import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import Scene from './Scene';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (headingRef.current) {
      // Create stagger effect for letters
      const text = headingRef.current;
      const words = text.textContent?.split(' ') || [];
      text.innerHTML = words.map(word => 
        `<span class="word-wrap inline-block overflow-hidden">
          <span class="word inline-block">
            ${word.split('').map(char => 
              `<span class="char inline-block">${char}</span>`
            ).join('')}
          </span>
        </span> `
      ).join('');

      // Animate each character with a staggered effect
      gsap.from('.char', {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "power4.out",
      });

      // Floating animation for background elements
      gsap.to(".floating-bg", {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      // Parallax effect for background elements
      gsap.to(".hero-bg-gradient", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -200,
        scale: 1.2,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="h-screen relative flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center max-w-4xl mx-auto px-4 flex flex-col items-center justify-center h-full"
      >
        <motion.h1 
          ref={headingRef}
          className="text-6xl md:text-8xl font-bold mb-6 text-foreground"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Vanaparthi Sai thanush
        </motion.h1>

        <motion.div
          className="flex flex-col gap-4 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.p 
            className="text-xl md:text-2xl text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Machine Learning Engineer & Web Developer
          </motion.p>

          <motion.p
            className="text-lg text-foreground/80 max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Results-driven professional with expertise in Machine Learning, Web Development,
            Data Analysis, and Business Intelligence
          </motion.p>
        </motion.div>
        <motion.div
          className="relative mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="hero-bg-gradient absolute -z-10 w-full h-full blur-3xl bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 animate-pulse" />
          <div className="relative z-10 flex gap-4 justify-center">
            <motion.div 
              className="floating-bg w-32 h-32 rounded-full bg-primary/10 absolute -left-16 -top-16"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div 
              className="floating-bg w-24 h-24 rounded-full bg-purple-500/10 absolute -right-8 top-8"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
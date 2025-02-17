import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const certifications = [
  {
    title: "Fundamentals of Reinforcement Learning",
    issuer: "University of Alberta",
    date: "October 28, 2024",
    category: "Machine Learning"
  },
  {
    title: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services",
    date: "August 30, 2024",
    category: "Cloud Computing"
  },
  {
    title: "Regression & Forecasting for Data Scientists using Python",
    issuer: "EDUCBA",
    date: "January 3, 2025",
    category: "Data Science"
  },
  {
    title: "Introduction to TensorFlow for AI & ML",
    issuer: "DeepLearning.AI",
    date: "October 22, 2024",
    category: "Machine Learning"
  },
  {
    title: "Research Methodologies",
    issuer: "Queen Mary University of London",
    date: "August 28, 2024",
    category: "Research"
  },
  {
    title: "Fundamentals of Visualization with Tableau",
    issuer: "University of California, Davis",
    date: "January 3, 2025",
    category: "Data Visualization"
  }
];

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for each certification card
      const cards = gsap.utils.toArray('.cert-card');

      cards.forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "top center",
            scrub: 1
          }
        });

        tl.from(card, {
          opacity: 0,
          y: 100,
          rotation: i % 2 === 0 ? 10 : -10,
          scale: 0.8,
          duration: 1.5,
          ease: "power3.out"
        })
        .to(card, {
          rotation: 0,
          scale: 1,
          duration: 0.5
        });

        // Add hover animation setup
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(card, {
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          duration: 0.3,
          ease: "power2.out"
        });

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());
      });

      // Add floating animation to category tags
      gsap.to('.category-tag', {
        y: -5,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.2,
          from: "random"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-accent/5" id="certifications">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Professional Certifications
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="cert-card bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ 
                scale: 1.02,
                rotate: index % 2 === 0 ? 2 : -2 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div className="category-tag absolute -top-2 -right-2 px-3 py-1 bg-primary/20 rounded-full text-xs">
                  {cert.category}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{cert.title}</h3>
                <p className="text-muted-foreground mb-2">{cert.issuer}</p>
                <p className="text-sm text-muted-foreground">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
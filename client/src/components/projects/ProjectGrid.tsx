
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experiences = [
  {
    title: "Machine Learning Intern at Futurense Technologies",
    description: "Experience in training machine learning models and data analysis using SQL. Developed dashboards and visualizations in Power BI. Built user-friendly tools using TensorFlow.",
    category: "Machine Learning",
    period: "May 2024 - July 2024",
    company: "Futurense Technologies",
    location: "Bengaluru",
  },
  {
    title: "Web Developer Intern at Bharat Intern",
    description: "Developed dynamic websites including Netflix clones and weather platforms. Designed user-friendly interfaces using Figma. Collaborated with cross-functional teams for responsive web solutions.",
    category: "Web Development",
    period: "January 2024 - April 2024",
    company: "Bharat Intern",
    location: "Bengaluru",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function ProjectGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for each experience card
      const cards = gsap.utils.toArray('.exp-card');

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
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-accent/5" id="experience">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Professional Experience
        </motion.h2>

        <div className="grid grid-cols-1 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="exp-card bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ 
                scale: 1.02,
                rotate: index % 2 === 0 ? 2 : -2 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div className="category-tag absolute -top-2 -right-2 px-3 py-1 bg-primary/20 rounded-full text-xs">
                  {exp.category}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{exp.title}</h3>
                <p className="text-muted-foreground mb-2">{exp.company} - {exp.location}</p>
                <p className="text-sm text-muted-foreground mb-4">{exp.period}</p>
                <p className="text-muted-foreground">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

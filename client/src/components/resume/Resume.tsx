import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Python", "SQL/NoSQL", "Machine Learning", "Web Development",
  "Data Analysis", "Prompt Engineering", "UI/UX Design"
];

const certifications = [
  {
    title: "Fundamentals of Reinforcement Learning",
    issuer: "University of Alberta",
    date: "October 28, 2024"
  },
  {
    title: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services",
    date: "August 30, 2024"
  },
  {
    title: "TensorFlow for AI & ML",
    issuer: "DeepLearning.AI",
    date: "October 22, 2024"
  }
];

export default function Resume() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skillsRef.current && certRef.current) {
      gsap.from(skillsRef.current.children, {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top center+=100",
          end: "bottom center",
          scrub: 1
        },
        y: 50,
        opacity: 0,
        stagger: 0.2
      });

      gsap.from(certRef.current.children, {
        scrollTrigger: {
          trigger: certRef.current,
          start: "top center+=100",
          end: "bottom center",
          scrub: 1
        },
        x: -50,
        opacity: 0,
        stagger: 0.3
      });
    }
  }, []);

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Resume</h1>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            Download Resume
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Skills</h2>
            <div ref={skillsRef} className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-card rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Certifications</h2>
            <div ref={certRef} className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-card rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-semibold text-primary">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground">{cert.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/hero/Hero";
import ProjectGrid from "@/components/projects/ProjectGrid";
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Navbar from "@/components/common/Navbar";
import Certifications from "@/components/certifications/Certifications";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Enhanced smooth scroll setup
    const sections = gsap.utils.toArray('section');

    sections.forEach((section: any) => {
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          toggleClass: "active"
        },
        opacity: 1,
        y: 0,
        duration: 1
      });
    });

    // Parallax effect for background elements
    gsap.to("body", {
      scrollTrigger: {
        scrub: 0.6,
        start: 0,
        end: "max",
      },
      backgroundPosition: "0 -500px",
    });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <ProjectGrid />
      <Certifications />
      <About />
      <Contact />
    </main>
  );
}
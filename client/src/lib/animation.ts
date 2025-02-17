import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const slideUp = (element: string, delay = 0) => {
  return gsap.from(element, {
    y: 100,
    opacity: 0,
    duration: 1.2,
    delay,
    ease: "power4.out"
  });
};

export const fadeIn = (element: string, delay = 0) => {
  return gsap.from(element, {
    opacity: 0,
    duration: 1.2,
    delay,
    ease: "power3.out"
  });
};

export const scaleIn = (element: string, delay = 0) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay,
    ease: "elastic.out(1, 0.5)"
  });
};

export const rotateIn = (element: string, delay = 0) => {
  return gsap.from(element, {
    rotation: 180,
    opacity: 0,
    duration: 1.2,
    delay,
    ease: "power2.out"
  });
};

export const staggerChildren = (parent: string, children: string, staggerTime = 0.1) => {
  gsap.from(children, {
    scrollTrigger: {
      trigger: parent,
      start: "top center",
      end: "bottom center",
      scrub: 1
    },
    y: 100,
    opacity: 0,
    rotation: 10,
    scale: 0.9,
    stagger: staggerTime,
    ease: "power3.out"
  });
};

export const parallaxElement = (element: string, speed = 0.5) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    },
    y: (i, target) => -target.offsetHeight * speed,
    ease: "none"
  });
};
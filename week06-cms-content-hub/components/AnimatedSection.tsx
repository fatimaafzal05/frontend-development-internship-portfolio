"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reducedMotion = useReducedMotion();
  return <motion.div initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay }}>{children}</motion.div>;
}

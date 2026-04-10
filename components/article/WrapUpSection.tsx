'use client';
import { motion } from 'framer-motion';

export default function WrapUpSection({ wrapUp }: { wrapUp: string }) {
  if (!wrapUp) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto mt-16 md:mt-24"
    >
      <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Wrapping Up
        </h2>
        <p className="font-body text-base md:text-lg leading-[1.8] text-muted-foreground">
          {wrapUp}
        </p>
      </div>
    </motion.div>
  );
}

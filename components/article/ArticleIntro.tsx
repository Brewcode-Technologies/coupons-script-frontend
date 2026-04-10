'use client';
import { motion } from 'framer-motion';

interface ArticleIntroProps {
  introduction: string;
  introSection?: { heading: string; description: string };
  collectionSection?: { label: string; heading: string; description: string };
}

export default function ArticleIntro({ introduction, introSection, collectionSection }: ArticleIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      <p className="drop-cap font-body text-lg md:text-xl leading-[1.8] text-foreground/80 mb-12">
        {introduction}
      </p>

      {introSection?.heading && (
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
            {introSection.heading}
          </h2>
          <p className="font-body text-base md:text-lg leading-[1.8] text-muted-foreground">
            {introSection.description}
          </p>
        </div>
      )}

      {collectionSection?.heading && (
        <div className="text-center mb-16">
          {collectionSection.label && (
            <span className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-primary">
              {collectionSection.label}
            </span>
          )}
          <h2 className="font-heading text-3xl md:text-5xl font-semibold text-foreground mt-3">
            {collectionSection.heading}
          </h2>
          {collectionSection.description && (
            <p className="font-body text-base text-muted-foreground mt-4 max-w-xl mx-auto">
              {collectionSection.description}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}

'use client';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';

interface HeroHeaderProps {
  title: string;
  category: string;
  author: { name: string };
  date: string;
  heroImage: string;
}

export default function HeroHeader({ title, category, author, date, heroImage }: HeroHeaderProps) {
  return (
    <section className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem]">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <img src={heroImage} alt={title} className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 lg:p-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-5xl">
          <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground font-body text-xs font-semibold tracking-widest uppercase rounded-full mb-4 md:mb-6">
            {category}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white leading-tight font-semibold mb-4 md:mb-6">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/80 font-body text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time>{date}</time>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

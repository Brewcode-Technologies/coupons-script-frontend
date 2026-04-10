'use client';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface Author {
  name: string;
  bio: string;
  avatar: string;
  website?: string;
}

export default function AuthorBio({ author }: { author: Author }) {
  if (!author?.name) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div  className="border-t border-b border-border pt-10 pb-0 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {author.avatar && (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-20 h-20 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0"
          />
        )}
        <div className="text-center sm:text-left">
          <span className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Written by
          </span>
          <h4 className="font-heading text-2xl font-semibold text-foreground mt-1">
            {author.name}
          </h4>
          {author.bio && (
            <p className="font-body text-sm text-muted-foreground leading-relaxed mt-2 max-w-md">
              {author.bio}
            </p>
          )}
          {author.website && (
            <a
              href={author.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-primary font-body text-sm font-medium hover:underline"
            >
              <Globe className="w-3.5 h-3.5" />
              Website
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

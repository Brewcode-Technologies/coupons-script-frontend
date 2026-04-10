'use client';
import { motion } from 'framer-motion';

const difficultyColors: Record<string, string> = {
  Easy: 'bg-green-100 text-green-800 border-green-200',
  Medium: 'bg-primary/10 text-primary border-primary/20',
  Advanced: 'bg-red-50 text-red-700 border-red-200',
};

interface Design {
  id: number;
  title: string;
  description: string;
  image: string;
  difficulty: string;
  note?: string;
  noteUrl?: string;
  noteLinkText?: string;
}

export default function DesignCard({ design, index }: { design: Design; index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 md:gap-10 items-center`}
    >
      <div className="w-full md:w-1/2 group">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <img
            src={design.image}
            alt={design.title}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center px-3 py-1 text-xs font-body font-semibold rounded-full border ${difficultyColors[design.difficulty] || difficultyColors.Easy}`}>
              {design.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 space-y-3">
        <span className="font-body text-xs font-semibold tracking-widest uppercase text-primary">
          Design #{design.id}
        </span>
        <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground leading-snug">
          {design.title}
        </h3>
        <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
          {design.description}
        </p>
        {design.note && (
          <p className="font-body text-sm text-muted-foreground mt-3 italic">
            {design.noteUrl && design.noteLinkText ? (
              <>
                {design.note.replace(design.noteLinkText, '')}{' '}
                <a
                  href={design.noteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:text-primary/80 not-italic font-medium"
                >
                  {design.noteLinkText}
                </a>
              </>
            ) : design.note}
          </p>
        )}
      </div>
    </motion.div>
  );
}

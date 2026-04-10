'use client';
import { motion } from 'framer-motion';

interface ContentParagraphsProps {
  paragraphs: string[];
  className?: string;
}

export default function ContentParagraphs({ paragraphs, className = "" }: ContentParagraphsProps) {
  if (!paragraphs?.length) return null;

  const formatParagraph = (text: string) => {
    // Check if the paragraph starts with a question pattern (ends with ?)
    const questionMatch = text.match(/^([^?]+\?)\s*(.*)$/);
    
    if (questionMatch) {
      const [, question, answer] = questionMatch;
      return (
        <div className="mb-6">
          <h3 className="font-bold text-foreground text-lg mb-2">{question}</h3>
          {answer && <p className="text-muted-foreground leading-relaxed">{answer}</p>}
        </div>
      );
    }
    
    // Regular paragraph
    return (
      <p className="text-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: text }} />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl mx-auto space-y-4 ${className}`}
    >
      {paragraphs.map((paragraph, index) => (
        <div key={index}>
          {formatParagraph(paragraph)}
        </div>
      ))}
    </motion.div>
  );
}
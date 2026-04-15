'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Link2, Share2 } from 'lucide-react';

interface Props {
  title?: string;
  description?: string;
}

export default function MobileShareBar({ title, description }: Props) {
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: title || document.title,
        text: description || '',
        url: window.location.href,
      });
    } else {
      copyLink();
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border px-4 py-2 flex items-center justify-around"
        >
          <button onClick={() => setLiked(!liked)} className="flex items-center gap-1.5 p-2">
            <Heart className={`w-5 h-5 ${liked ? 'fill-primary text-primary' : 'text-foreground/60'}`} />
            <span className="text-xs font-body text-muted-foreground">Like</span>
          </button>
          <button onClick={copyLink} className="flex items-center gap-1.5 p-2">
            <Link2 className="w-5 h-5 text-foreground/60" />
            <span className="text-xs font-body text-muted-foreground">Copy</span>
          </button>
          <button onClick={share} className="flex items-center gap-1.5 p-2">
            <Share2 className="w-5 h-5 text-foreground/60" />
            <span className="text-xs font-body text-muted-foreground">Share</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Link2, Mail } from 'lucide-react';

export default function SocialSidebar() {
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(2);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3"
        >
          <div className="bg-white dark:bg-gray-800 backdrop-blur-xl border-2 border-gray-200 dark:border-white/20 rounded-full p-2 flex flex-col items-center gap-1 shadow-xl ring-1 ring-black/10 dark:ring-white/20">
            <button onClick={handleLike} className="group p-2.5 rounded-full hover:bg-primary/10 transition-colors">
              <Heart className={`w-[18px] h-[18px] transition-colors ${liked ? 'fill-primary text-primary' : 'text-gray-700 dark:text-white group-hover:text-primary'}`} />
            </button>
            <span className="text-[10px] font-body text-gray-600 dark:text-white font-medium">{likeCount}</span>
            <div className="w-5 h-px bg-gray-300 dark:bg-white/30 my-1" />
            <button onClick={copyLink} className="p-2.5 rounded-full hover:bg-primary/10 transition-colors group" title="Copy Link">
              <Link2 className="w-[18px] h-[18px] text-gray-700 dark:text-white group-hover:text-primary transition-colors" />
            </button>
            <a
              href={`mailto:?subject=Check this out&body=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
              className="p-2.5 rounded-full hover:bg-primary/10 transition-colors group"
              title="Share via Email"
            >
              <Mail className="w-[18px] h-[18px] text-gray-700 dark:text-white group-hover:text-primary transition-colors" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

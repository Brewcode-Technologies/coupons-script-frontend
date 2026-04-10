'use client';
import DesignCard from './DesignCard';

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

export default function DesignGrid({ designs }: { designs: Design[] }) {
  if (!designs?.length) return null;
  return (
    <div className="space-y-16 md:space-y-24">
      {designs.map((design, index) => (
        <DesignCard key={design.id || index} design={design} index={index} />
      ))}
    </div>
  );
}

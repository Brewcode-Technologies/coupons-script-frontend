'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Post {
  title: string;
  image: string;
  date: string;
  category?: string;
  slug?: string;
}

export default function RelatedCarousel({ posts }: { posts: Post[] }) {
  const [current, setCurrent] = useState(0);

  if (!posts?.length) return null;

  const prev = () => setCurrent(i => (i === 0 ? posts.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === posts.length - 1 ? 0 : i + 1));

  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-primary">
              Continue Reading
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mt-1">
              Related Posts
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6 md:gap-8"
            style={{ transform: `translateX(calc(-${current} * (100% / 3 + 8px)))` }}
          >
            {posts.map((post, index) => {
              const content = (
                <>
                  <div className="relative overflow-hidden rounded-2xl mb-4 shadow-md">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {post.category && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground font-body text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <time className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                    {post.date}
                  </time>
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mt-2 leading-snug group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                </>
              );

              return post.slug ? (
                <Link
                  key={index}
                  href={`/blog/${post.slug}`}
                  className="group cursor-pointer flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] no-underline"
                >
                  {content}
                </Link>
              ) : (
                <article key={index} className="group cursor-pointer flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  {content}
                </article>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`rounded-full transition-all duration-300 ${
                index === current ? 'w-6 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-border hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

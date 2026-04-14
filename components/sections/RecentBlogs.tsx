'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogArticles } from '@/services/api';

interface Article {
  _id: string;
  title: string;
  slug: string;
  image?: string;
  description?: string;
  createdAt?: string;
}

export default function RecentBlogs() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getBlogArticles()
      .then((res) => {
        const data = res.data?.data ?? res.data ?? [];
        setArticles(data.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recent Blogs
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-primary hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Link
              key={article._id}
              href={`/blog/${article.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-40">
                <Image
                  src={article.image || '/placeholder.png'}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {article.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

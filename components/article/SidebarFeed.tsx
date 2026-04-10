'use client';
import Link from 'next/link';

interface Post {
  title: string;
  image: string;
  date: string;
  slug?: string;
}

export default function SidebarFeed({ posts }: { posts: Post[] }) {
  if (!posts?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
      <div className="bg-black px-4 py-2.5">
        <h3 className="text-white text-xs font-bold tracking-wider uppercase">
          RELATED POSTS
        </h3>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {posts.map((post, index) => {
          const Wrapper = post.slug ? Link : 'div';
          const wrapperProps = post.slug ? { href: `/blog/${post.slug}` } : {};
          return (
            <Wrapper key={index} {...(wrapperProps as any)} className="group flex gap-3 p-4 cursor-pointer no-underline hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex-shrink-0 w-20 h-16 rounded overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-3 mb-2">
                  {post.title}
                </h4>
                <time className="text-xs text-gray-500 dark:text-gray-400">
                  {post.date}
                </time>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}

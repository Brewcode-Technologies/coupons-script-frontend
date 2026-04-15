import { Metadata } from 'next';
import { fetchAPI, buildMetadata, SITE_URL } from '@/utils/metadata';
import BlogArticleClient from './BlogArticleClient';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await fetchAPI(`/public/blog/details/${params.slug}`);
  if (!article) return { title: 'Blog Post Not Found' };

  return buildMetadata({
    title: article.metaTitle || article.title || 'Blog',
    description: article.metaDescription || article.excerpt || article.title || '',
    url: `${SITE_URL}/blog/${params.slug}`,
    image: article.heroImage || article.featuredImage || article.image || '',
    type: 'article',
    publishedTime: article.publishDate || article.createdAt,
    authors: [article.author?.name || article.authorName || 'Admin'],
  });
}

export default function BlogPage() {
  return <BlogArticleClient />;
}

'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getBlogArticleBySlug } from '@/services/api';
import SidebarFeed from '@/components/article/SidebarFeed';
import RelatedCarousel from '@/components/article/RelatedCarousel';
import SocialSidebar from '@/components/article/SocialSidebar';
import MobileShareBar from '@/components/article/MobileShareBar';
import ScrollProgress from '@/components/article/ScrollProgress';
import AuthorBio from '@/components/article/AuthorBio';
import FAQSection from '@/components/article/FAQSection';

export default function BlogArticleClient() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getBlogArticleBySlug(slug)
      .then((res) => setArticle(res.data?.data || null))
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Blog post not found.</p>
      </div>
    );
  }

  const author = article.author || { name: article.authorName || 'Admin', bio: article.authorBio || '', avatar: article.authorAvatar || '', website: article.authorWebsite || '' };
  const relatedPosts = article.relatedPosts || [];
  const heroImage = article.heroImage || article.featuredImage || article.image;
  const dateLabel = article.publishDate || article.dateLabel || (article.createdAt ? new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '');
  const categoryName = article.category?.name || article.categoryName || article.category || '';
  const categoryColor = article.category?.color || article.categoryColor || '#84CC16';

  return (
    <div className="min-h-screen bg-background font-body">
      <ScrollProgress />
      <SocialSidebar />
      <MobileShareBar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-8">
          {categoryName && (
            <span 
              className="text-xs font-semibold tracking-wider uppercase mb-3 block"
              style={{ color: categoryColor }}
            >
              {categoryName}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-foreground leading-[1.2] mb-4">
            {article.title}
          </h1>
          <div className="text-muted-foreground text-[13px] flex items-center gap-2 mb-8">
            <span>written by {author.name}</span>
            {dateLabel && (
              <>
                <span>|</span>
                <time>{dateLabel}</time>
              </>
            )}
          </div>
          
          {heroImage && (
            <div className="w-full h-auto aspect-video rounded-xl overflow-hidden">
              <img src={heroImage} alt={article.title || 'Blog post image'} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Article Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-24 flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Main Article */}
        <main className="flex-1 min-w-0">
          {article.content && (
            <div className="max-w-3xl mx-auto space-y-5 mt-8">
              {typeof article.content === 'string' ? (
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none prose-a:text-primary prose-headings:font-heading prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }} 
                />
              ) : Array.isArray(article.content) && article.content.length > 0 ? (
                <div className="prose prose-lg dark:prose-invert max-w-none prose-a:text-primary prose-headings:font-heading prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-p:leading-relaxed">
                  {article.content.map((p: string, idx: number) => (
                     typeof p === 'string' ? <div key={idx} dangerouslySetInnerHTML={{ __html: p }} /> : null
                  ))}
                </div>
              ) : null}
            </div>
          )}

          {article.contentParagraphs && article.contentParagraphs.length > 0 && (
            <div className="max-w-3xl mx-auto space-y-6 mt-8">
              {article.contentParagraphs.map((para: any, index: number) => (
                <div key={index} className="mb-6">
                  {para.question && <h3 className="font-bold text-foreground text-lg mb-2">{para.question}</h3>}
                  {para.answer && <p className="text-muted-foreground leading-relaxed">{para.answer}</p>}
                </div>
              ))}
            </div>
          )}

          <FAQSection faqs={article.faqs} title={article.faqTitle} />

          <div className="mt-8">
            <AuthorBio author={author} />
          </div>
        </main>

        {/* Sidebar - Desktop Only */}
        <aside className="hidden lg:block w-[280px] flex-shrink-0">
          <div className="sticky top-24">
            {relatedPosts.length > 0 && <SidebarFeed posts={relatedPosts} />}
          </div>
        </aside>
      </div>

      {relatedPosts.length > 0 && (
        <div className="border-t border-border pt-8">
          <RelatedCarousel posts={relatedPosts} />
        </div>
      )}

      <div className="xl:hidden h-14" />
    </div>
  );
}

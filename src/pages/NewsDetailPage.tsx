import React, { useEffect, useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { getNewsById } from '../services/news.service';
import type { NewsArticle } from '../types';
import { useParams } from 'react-router-dom';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getNewsById(id)
      .then(a => { setArticle(a); setLoading(false); if (!a) setError('غير موجود'); })
      .catch(() => { setError('تعذر تحميل الخبر'); setLoading(false); });
  }, [id]);

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-gray-600 dark:text-gray-300">جارٍ التحميل...</div>
        ) : error || !article ? (
          <div className="text-red-600 dark:text-red-400">{error || 'غير موجود'}</div>
        ) : (
          <article>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{article.title}</h1>
            {article.coverImageUrl && (
              <div className="mb-6 rounded-xl overflow-hidden ring-1 ring-gray-200/60 dark:ring-white/10">
                <img src={article.coverImageUrl} alt={article.title} className="w-full h-auto object-cover" />
              </div>
            )}
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">{new Date(article.createdAt).toLocaleString('ar-EG')}</div>
            <div className="prose prose-indigo rtl:prose-headings:text-right rtl:prose-p:text-right max-w-none dark:prose-invert">
              <p className="whitespace-pre-wrap leading-8 text-gray-800 dark:text-gray-200">{article.content}</p>
            </div>
          </article>
        )}
      </div>
    </PageLayout>
  );
};

export default NewsDetailPage;



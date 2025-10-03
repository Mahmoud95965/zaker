import React, { useEffect, useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { listPublishedNews } from '../services/news.service';
import type { NewsArticle } from '../types';
import { Link } from 'react-router-dom';

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    listPublishedNews()
      .then(items => { if (mounted) { setNews(items); setLoading(false); } })
      .catch(() => { if (mounted) { setError('تعذر تحميل الأخبار'); setLoading(false); } });
    return () => { mounted = false; };
  }, []);

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">أخبار أدوات الذكاء الاصطناعي</h1>
        {loading ? (
          <div className="text-gray-600 dark:text-gray-300">جارٍ التحميل...</div>
        ) : error ? (
          <div className="text-red-600 dark:text-red-400">{error}</div>
        ) : news.length === 0 ? (
          <div className="text-gray-600 dark:text-gray-300">لا توجد أخبار حالياً.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map(item => (
              <article key={item.id} className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/20 to-emerald-500/30 hover:shadow-lg transition-all duration-300">
                <div className="rounded-[15px] bg-white dark:bg-gray-900 ring-1 ring-gray-200/60 dark:ring-white/10 h-full flex flex-col">
                  {item.coverImageUrl && (
                    <div className="h-40 w-full overflow-hidden rounded-t-[15px]">
                      <img src={item.coverImageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5 flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">{item.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">{item.content}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(item.createdAt).toLocaleString('ar-EG')}</div>
                  </div>
                  <div className="px-5 pb-5">
                    <Link to={`/news/${item.id}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-semibold">اقرأ المزيد</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default NewsPage;



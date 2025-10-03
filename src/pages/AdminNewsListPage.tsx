import React, { useEffect, useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { deleteNews, listAllNews, updateNewsStatus, seedDemoNews } from '../services/news.service';
import type { NewsArticle } from '../types';
import { Link, useNavigate } from 'react-router-dom';

const AdminNewsListPage: React.FC = () => {
  const [items, setItems] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const all = await listAllNews();
      setItems(all);
    } catch (e) {
      setError('تعذر تحميل الأخبار');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm('هل تريد حذف هذا الخبر؟')) return;
    await deleteNews(id);
    refresh();
  };

  const toggleStatus = async (id: string, current: 'draft' | 'published') => {
    await updateNewsStatus(id, current === 'published' ? 'draft' : 'published');
    refresh();
  };

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة الأخبار</h1>
          <div className="flex items-center gap-2">
            <button onClick={async () => { await seedDemoNews(3); refresh(); }} className="inline-flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">إنشاء بيانات تجريبية</button>
            <Link to="/admin/news/publish" className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">نشر خبر</Link>
          </div>
        </div>
        {loading ? (
          <div className="text-gray-600 dark:text-gray-300">جارٍ التحميل...</div>
        ) : error ? (
          <div className="text-red-600 dark:text-red-400">{error}</div>
        ) : (
          <div className="overflow-x-auto rounded-xl ring-1 ring-gray-200/60 dark:ring-white/10">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">العنوان</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">الحالة</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">التاريخ</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                {items.map(item => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{item.title}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${item.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'}`}>
                        {item.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{item.createdAt ? new Date(item.createdAt).toLocaleString('ar-EG') : '-'}</td>
                    <td className="px-4 py-3 text-left whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button onClick={() => toggleStatus(item.id, item.status)} className="px-3 py-1.5 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">تبديل الحالة</button>
                        <Link to={`/admin/news/edit/${item.id}`} className="px-3 py-1.5 text-xs rounded-md bg-indigo-600 text-white hover:bg-indigo-700">تعديل</Link>
                        <button onClick={() => onDelete(item.id)} className="px-3 py-1.5 text-xs rounded-md bg-red-600 text-white hover:bg-red-700">حذف</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default AdminNewsListPage;



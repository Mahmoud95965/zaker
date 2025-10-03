import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { publishNewsArticle } from '../services/news.service';
import { useAuth } from '../context/AuthContext';

const AdminNewsPublishPage: React.FC = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [tags, setTags] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    setSubmitting(true);
    setMessage(null);
    try {
      await publishNewsArticle({
        title: title.trim(),
        content: content.trim(),
        coverImageUrl: coverImageUrl.trim(),
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        authorId: user.uid,
        authorEmail: user.email || '',
        status: 'published'
      });
      setTitle('');
      setContent('');
      setCoverImageUrl('');
      setTags('');
      setMessage('تم نشر الخبر بنجاح');
    } catch (err) {
      setMessage('حدث خطأ أثناء النشر');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">نشر خبر جديد</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">العنوان</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full rounded-md border-0 px-3 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 dark:bg-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">صورة الغلاف (اختياري)</label>
            <input value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} className="w-full rounded-md border-0 px-3 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 dark:bg-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الوسوم (مفصولة بفواصل)</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full rounded-md border-0 px-3 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 dark:bg-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">المحتوى</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={10} className="w-full rounded-md border-0 px-3 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 dark:bg-gray-700" />
          </div>
          <div className="pt-2">
            <button disabled={submitting} type="submit" className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50">
              {submitting ? 'جارٍ النشر...' : 'نشر الخبر'}
            </button>
          </div>
          {message && <div className="text-sm text-gray-700 dark:text-gray-300">{message}</div>}
        </form>
      </div>
    </PageLayout>
  );
};

export default AdminNewsPublishPage;



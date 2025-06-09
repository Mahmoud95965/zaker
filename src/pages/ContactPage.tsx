import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // هنا يمكن إضافة منطق إرسال النموذج إلى الخادم
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitSuccess(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            تواصل معنا
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            نحن هنا لمساعدتك. تواصل معنا لأي استفسار أو اقتراح
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* معلومات الاتصال */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              معلومات الاتصال
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400 ml-3" />
                <span className="text-gray-600 dark:text-gray-300">support@zakerly.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-indigo-600 dark:text-indigo-400 ml-3" />
                <span className="text-gray-600 dark:text-gray-300">+1234567890</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-indigo-600 dark:text-indigo-400 ml-3" />
                <span className="text-gray-600 dark:text-gray-300">القاهرة، مصر</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400 ml-3" />
                <span className="text-gray-600 dark:text-gray-300">متاح 24/7 للدعم</span>
              </div>
            </div>
          </div>

          {/* نموذج الاتصال */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  الاسم
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  الموضوع
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
              </button>
              {submitSuccess && (
                <div className="mt-4 text-sm text-green-600 dark:text-green-400">
                  تم إرسال رسالتك بنجاح. سنتواصل معك قريباً!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;

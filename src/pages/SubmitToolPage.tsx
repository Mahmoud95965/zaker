import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { categories, pricingOptions } from '../data/toolsData';
import { Send, File, Link as LinkIcon } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const SubmitToolPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    url: '',
    pricing: '',
    tags: '',
    email: '',
    termsAccepted: false,
    submissionStatus: null as null | 'success' | 'error'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.description || !formData.category || !formData.url || !formData.email || !formData.termsAccepted) {
      setFormData(prev => ({
        ...prev,
        submissionStatus: 'error'
      }));
      return;
    }

    try {
      const toolsRef = collection(db, 'tools');
      await addDoc(toolsRef, {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        url: formData.url,
        pricing: formData.pricing,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        submittedBy: formData.email,
        submittedAt: new Date().toISOString(),
        status: 'pending',
        rating: 0,
        reviewCount: 0,
        votes: { helpful: [], notHelpful: [] }
      });

      setFormData(prev => ({
        ...prev,
        submissionStatus: 'success'
      }));
    } catch (error) {
      console.error('Error submitting tool:', error);
      setFormData(prev => ({
        ...prev,
        submissionStatus: 'error'
      }));
    }
  };

  if (formData.submissionStatus === 'success') {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">شكراً لك!</h1>
              <p className="text-lg text-gray-600 mb-8">
                تم استلام الأداة التي قمت بإضافتها. سيقوم فريقنا بمراجعتها والرد عليك قريباً.
              </p>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                العودة للرئيسية
              </a>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="bg-indigo-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white">إضافة أداة تعليمية مدعومة بالذكاء الاصطناعي</h1>
          <p className="mt-2 text-indigo-100 max-w-2xl mx-auto">
            ساعدنا في توسيع مجموعتنا من أدوات الذكاء الاصطناعي للتعليم عبر إضافة أداتك المفضلة.
          </p>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          {formData.submissionStatus === 'error' && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mr-3">
                  <p className="text-sm text-red-700 text-right">
                    يرجى ملء جميع الحقول المطلوبة قبل الإرسال.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-right">
                  اسم الأداة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right"
                  placeholder="مثال: EssayGenius"
                  dir="rtl"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 text-right">
                  الوصف <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right"
                  placeholder="صف باختصار ما تفعله الأداة وكيف تساعد الطلاب أو المعلمين"
                  dir="rtl"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 text-right">
                    التصنيف <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right"
                    dir="rtl"
                  >
                    <option value="">اختر تصنيفاً</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'Writing' ? 'الكتابة' :
                         category === 'Research' ? 'البحث' :
                         category === 'Math' ? 'الرياضيات' :
                         category === 'Science' ? 'العلوم' :
                         category === 'Language Learning' ? 'تعلم اللغات' :
                         category === 'Productivity' ? 'الإنتاجية' :
                         category === 'Studying' ? 'الدراسة' :
                         category === 'Test Prep' ? 'التحضير للاختبارات' :
                         category === 'Teaching' ? 'التدريس' :
                         'أخرى'}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="pricing" className="block text-sm font-medium text-gray-700 text-right">
                    السعر <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="pricing"
                    name="pricing"
                    value={formData.pricing}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right"
                    dir="rtl"
                  >
                    <option value="">اختر نوع التسعير</option>
                    {pricingOptions.map((option) => (
                      <option key={option} value={option}>
                        {option === 'Free' ? 'مجاني' :
                         option === 'Freemium' ? 'مجاني مع مميزات مدفوعة' :
                         option === 'Paid' ? 'مدفوع' :
                         'اشتراك'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 text-right">
                  رابط الموقع <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    className="flex-1 block w-full rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-right"
                    placeholder="https://example.com"
                    dir="ltr"
                  />
                  <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                    <LinkIcon className="h-4 w-4" />
                  </span>
                </div>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 text-right">
                  الكلمات المفتاحية (مفصولة بفواصل)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right"
                  placeholder="مثال: كتابة المقالات، القواعد اللغوية، أكاديمي"
                  dir="rtl"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-right">
                  بريدك الإلكتروني <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right"
                  placeholder="your@example.com"
                  dir="ltr"
                />
                <p className="mt-1 text-sm text-gray-500 text-right">
                  سنستخدم هذا البريد للتواصل معك بخصوص إضافتك فقط.
                </p>
              </div>
              
              <div>
                <label htmlFor="screenshot" className="block text-sm font-medium text-gray-700 text-right">
                  لقطة شاشة (اختياري)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <File className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex flex-col text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>رفع ملف</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="mt-1">أو اسحب وأفلت</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF حتى 10MB
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative flex items-start">
                <div className="mr-3 text-sm flex-grow">
                  <label htmlFor="termsAccepted" className="font-medium text-gray-700 text-right block">
                    الشروط والخصوصية <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-500 text-right">
                    أؤكد أن لدي الحق في إضافة هذه الأداة وأوافق على شروط الخدمة.
                  </p>
                </div>
                <div className="flex items-center h-5">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  dir="rtl"
                >
                  <Send className="ml-2 h-5 w-5" />
                  إرسال الأداة
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default SubmitToolPage;
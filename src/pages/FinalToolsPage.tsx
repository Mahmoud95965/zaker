import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Tool, ToolCategory, ToolPricing } from '../types';
import { useAuth } from '../hooks/useAuth';
import { convertImageToBase64 } from '../services/storage.service';
import { Image } from 'lucide-react';

const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB

const FinalToolsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [tool, setTool] = useState<Partial<Tool>>({
    name: '',
    description: '',
    longDescription: '',
    category: 'Other' as ToolCategory,
    tags: [],
    url: '',
    pricing: 'Free' as ToolPricing,
    features: [],
    rating: 0,
    reviewCount: 0,
    isNew: true,
    isFeatured: false,
    isPopular: false,
    status: 'approved',
    submittedBy: user?.email || '',
    submittedAt: new Date().toISOString(),
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    }
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // التحقق من حجم الملف
      if (file.size > MAX_IMAGE_SIZE) {
        setImageError('حجم الصورة يجب أن يكون أقل من 1 ميجابايت');
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      setImageError('يرجى اختيار صورة');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // تحويل الصورة إلى Base64
      const imageBase64 = await convertImageToBase64(selectedImage);

      // إنشاء معرف فريد للأداة
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 1000);
      const newId = `${timestamp}${randomNum}`.slice(-3).padStart(3, '0');

      const newTool: Tool = {
        ...tool as Tool,
        id: newId,
        imageUrl: imageBase64, // تخزين الصورة كـ Base64
        tags: tool.tags || [],
        features: tool.features || [],
        submittedAt: new Date().toISOString(),
        votes: {
          helpful: [],
          notHelpful: []
        },
        votingStats: {
          helpfulCount: 0,
          notHelpfulCount: 0,
          totalVotes: 0
        }
      };

      // إضافة الأداة إلى Firestore
      const docRef = await addDoc(collection(db, 'tools'), newTool);
      
      // تحديث الأداة بالمعرف المولد
      await updateDoc(doc(db, 'tools', docRef.id), { id: newId });

      navigate('/tools');
    } catch (error) {
      console.error('Error adding tool:', error);
      if (error instanceof Error) {
        setImageError(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagsChange = (value: string) => {
    setTool(prev => ({
      ...prev,
      tags: value.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    }));
  };

  const handleFeaturesChange = (value: string) => {
    setTool(prev => ({
      ...prev,
      features: value.split(',').map(feature => feature.trim()).filter(feature => feature !== '')
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              إضافة أداة جديدة
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* صورة الأداة */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  صورة الأداة
                </label>
                <div 
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                    imageError 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="space-y-1 text-center">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="معاينة"
                        className="mx-auto h-32 w-32 object-cover rounded-lg"
                      />
                    ) : (
                      <Image
                        className="mx-auto h-12 w-12 text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                        <span>اختر صورة</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pr-1">أو اسحب وأفلت</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG حتى 1MB
                    </p>
                    {imageError && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {imageError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    اسم الأداة
                  </label>
                  <input
                    type="text"
                    required
                    value={tool.name}
                    onChange={e => setTool(prev => ({ ...prev, name: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    وصف مختصر
                  </label>
                  <input
                    type="text"
                    required
                    value={tool.description}
                    onChange={e => setTool(prev => ({ ...prev, description: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    وصف مفصل
                  </label>
                  <textarea
                    rows={4}
                    value={tool.longDescription}
                    onChange={e => setTool(prev => ({ ...prev, longDescription: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Category and Pricing */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    الفئة
                  </label>
                  <select
                    value={tool.category}
                    onChange={e => setTool(prev => ({ ...prev, category: e.target.value as ToolCategory }))}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="Writing">كتابة</option>
                    <option value="Research">بحث</option>
                    <option value="Math">رياضيات</option>
                    <option value="Science">علوم</option>
                    <option value="Language Learning">تعلم اللغات</option>
                    <option value="Productivity">إنتاجية</option>
                    <option value="Studying">دراسة</option>
                    <option value="Test Prep">تحضير اختبارات</option>
                    <option value="Teaching">تدريس</option>
                    <option value="Other">أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    التسعير
                  </label>
                  <select
                    value={tool.pricing}
                    onChange={e => setTool(prev => ({ ...prev, pricing: e.target.value as ToolPricing }))}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="Free">مجاني</option>
                    <option value="Freemium">مجاني مع مميزات مدفوعة</option>
                    <option value="Paid">مدفوع</option>
                    <option value="Subscription">اشتراك</option>
                  </select>
                </div>
              </div>

              {/* URLs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    رابط الأداة
                  </label>
                  <input
                    type="url"
                    required
                    value={tool.url}
                    onChange={e => setTool(prev => ({ ...prev, url: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    رابط الصورة
                  </label>
                  <input
                    type="url"
                    required
                    value={tool.imageUrl}
                    onChange={e => setTool(prev => ({ ...prev, imageUrl: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Tags and Features */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    الوسوم (مفصولة بفواصل)
                  </label>
                  <input
                    type="text"
                    value={tool.tags?.join(', ')}
                    onChange={e => handleTagsChange(e.target.value)}
                    placeholder="وسم1, وسم2, وسم3"
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    المميزات (مفصولة بفواصل)
                  </label>
                  <input
                    type="text"
                    value={tool.features?.join(', ')}
                    onChange={e => handleFeaturesChange(e.target.value)}
                    placeholder="ميزة1, ميزة2, ميزة3"
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Tool Properties */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={tool.isNew}
                      onChange={e => setTool(prev => ({ ...prev, isNew: e.target.checked }))}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">جديد</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={tool.isFeatured}
                      onChange={e => setTool(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">مميز</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={tool.isPopular}
                      onChange={e => setTool(prev => ({ ...prev, isPopular: e.target.checked }))}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">شائع</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? 'جاري الإضافة...' : 'إضافة الأداة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalToolsPage;

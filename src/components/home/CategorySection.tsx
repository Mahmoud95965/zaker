import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToolCategory } from '../../types';
import { categories } from '../../data/toolsData';
import { PenLine, BookOpen, Calculator, FlaskRound as Flask, Languages, Clock, Book, GraduationCap, Users, Sparkles } from 'lucide-react';

const categoryIcons: Record<ToolCategory, React.ReactNode> = {
  'Writing': <PenLine />,
  'Research': <BookOpen />,
  'Math': <Calculator />,
  'Science': <Flask />,
  'Language Learning': <Languages />,
  'Productivity': <Clock />,
  'Studying': <Book />,
  'Test Prep': <GraduationCap />,
  'Teaching': <Users />,
  'Other': <Sparkles />
};

const CategorySection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('common.categories')}</h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            اكتشف أدوات الذكاء الاصطناعي المتخصصة لمختلف الاحتياجات التعليمية
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/tools?category=${category}`}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 hover:border-indigo-100 dark:hover:border-indigo-900"
            >
              <div className="w-12 h-12 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 bg-indigo-50 dark:bg-indigo-900/50 rounded-full">
                {categoryIcons[category]}
              </div>
              <span className="text-gray-900 dark:text-white font-medium text-center">{t(`categories.${category}`)}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('common.viewAll')}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
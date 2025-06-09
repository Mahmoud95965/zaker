import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import ToolsGrid from '../components/tools/ToolsGrid';
import ToolFilters from '../components/tools/ToolFilters';
import { FilterOptions } from '../types';
import { useTools } from '../hooks/useTools';
import { Loader } from 'lucide-react';

const ToolsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [filters, setFilters] = useState<FilterOptions>({
    category: categoryParam as FilterOptions['category'] || 'All',
    pricing: 'All',
    searchQuery: ''
  });
  
  const { loading, error, filterToolsByOptions } = useTools();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const filteredTools = filterToolsByOptions(filters);

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">جميع أدوات التعليم بالذكاء الاصطناعي</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            استكشف وفرز وابحث عن أدوات التعليم المناسبة لاحتياجاتك
          </p>
        </div>
        
        <ToolFilters 
          filters={filters} 
          setFilters={setFilters} 
          showMobileFilters={showMobileFilters} 
          setShowMobileFilters={setShowMobileFilters}
        />
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 dark:text-red-400">حدث خطأ أثناء تحميل الأدوات. يرجى المحاولة مرة أخرى.</p>
          </div>
        ) : (
          <ToolsGrid tools={filteredTools} />
        )}
      </div>
    </PageLayout>
  );
};

export default ToolsPage;
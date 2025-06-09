import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tool } from '../../types';
import { Star, ArrowLeft } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { t } = useTranslation();
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-amber-400 dark:text-amber-300 fill-amber-400 dark:fill-amber-300' 
            : 'text-gray-300 dark:text-gray-600'
        }`} 
      />
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">      <div className="relative h-48 overflow-hidden bg-white dark:bg-gray-800">
        <img 
          src={tool.imageUrl} 
          alt={tool.name} 
          className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105 dark:brightness-90"
        />
        {tool.isNew && (
          <span className="absolute top-2 left-2 bg-teal-500 dark:bg-teal-600 text-white text-xs font-bold uppercase py-1 px-2 rounded-full">
            {t('common.new')}
          </span>
        )}
        <span className={`absolute top-2 right-2 text-xs font-bold uppercase py-1 px-2 rounded-full ${
          tool.pricing === 'Free' ? 'bg-green-500 dark:bg-green-600 text-white' :
          tool.pricing === 'Freemium' ? 'bg-blue-500 dark:bg-blue-600 text-white' :
          tool.pricing === 'Paid' ? 'bg-purple-500 dark:bg-purple-600 text-white' :
          'bg-amber-500 dark:bg-amber-600 text-white'
        }`}>
          {tool.pricing === 'Free' ? 'مجاني' :
           tool.pricing === 'Freemium' ? 'مجاني مع مميزات مدفوعة' :
           tool.pricing === 'Paid' ? 'مدفوع' :
           'اشتراك'}
        </span>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-1">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
            {t(`categories.${tool.category}`)}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{tool.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1 line-clamp-2">{tool.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            {renderStars(tool.rating)}
            <span className="text-gray-600 dark:text-gray-400 text-sm mr-2">{tool.rating.toFixed(1)}</span>
          </div>
          
          <Link 
            to={`/tools/${tool.id}`} 
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center text-sm font-medium"
          >
            {t('common.learnMore')}
            <ArrowLeft className="mr-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
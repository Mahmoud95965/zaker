import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tool } from '../../types';
import { Star, ArrowRight } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 transition-colors ${ 
          i < Math.floor(rating) 
            ? 'text-amber-400 fill-amber-400' 
            : 'text-gray-300 dark:text-gray-600'
        }`} 
      />
    ));
  };

  const pricingInfo = {
    Free: { className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: t('pricing.Free') },
    Freemium: { className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', label: t('pricing.Freemium') },
    Paid: { className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300', label: t('pricing.Paid') },
    Subscription: { className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300', label: t('pricing.Subscription') },
  };

  const currentPricing = pricingInfo[tool.pricing] || pricingInfo.Subscription;
  const categoryInitial = tool.category?.charAt(0) ?? '';
  const categoryLabel = t(`categories.${tool.category}`);

  return (
    <div className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/30 to-emerald-500/40 shadow-lg hover:shadow-2xl transition-all duration-300 will-change-transform hover:-translate-y-1">
      <div className="bg-white dark:bg-gray-900 rounded-[15px] overflow-hidden flex flex-col border border-white/10 dark:border-white/5">
        <div className="relative h-20 bg-gradient-to-r from-indigo-600/10 to-fuchsia-600/10 dark:from-indigo-500/10 dark:to-fuchsia-500/10">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-16 w-[120%] rotate-12 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md ring-1 ring-gray-200/60 dark:ring-white/10 flex items-center justify-center text-sm font-bold text-indigo-700 dark:text-indigo-300" aria-label={`فئة الأداة: ${categoryLabel}`} title={`فئة الأداة: ${categoryLabel}`}>
              {categoryInitial}
            </div>
          </div>
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {tool.isNew && (
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-[10px] tracking-wider font-bold uppercase py-1 px-3 rounded-full shadow-md" aria-label="أداة جديدة" title="أداة جديدة">
                {t('common.new')}
              </span>
            )}
            <span className={`text-[10px] font-semibold py-1 px-3 rounded-full shadow-md ml-auto ${currentPricing.className}`} aria-label={`نموذج التسعير: ${currentPricing.label}`} title={`نموذج التسعير: ${currentPricing.label}`}>
              {currentPricing.label}
            </span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <span className="inline-block px-3 py-1 text-[10px] font-semibold text-indigo-800 dark:text-indigo-200 bg-indigo-100/70 dark:bg-indigo-900/40 ring-1 ring-indigo-200/60 dark:ring-indigo-500/30 rounded-full mb-3">
            {t(`categories.${tool.category}`)}
          </span>

          <h3 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2 line-clamp-1 bg-clip-text">
            {tool.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1 line-clamp-2">
            {tool.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-1.5" aria-label={`التقييم ${tool.rating.toFixed(1)} من 5 بناءً على ${tool.reviewCount || 0} تقييم`} title={`التقييم ${tool.rating.toFixed(1)} من 5 بناءً على ${tool.reviewCount || 0} تقييم`}>
              {renderStars(tool.rating)}
              <span className="text-gray-500 dark:text-gray-400 text-xs font-medium pt-0.5">{tool.rating.toFixed(1)}</span>
            </div>

            <Link
              to={`/tools/${tool.id}`}
              className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-all duration-300"
              aria-label={`اعرف المزيد عن ${tool.name}`}
              title={`اعرف المزيد عن ${tool.name}`}
            >
              <span className="whitespace-nowrap">{t('common.learnMore')}</span>
              <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isRtl ? 'transform -scale-x-100 -translate-x-0.5' : 'translate-x-0 group-hover:translate-x-0.5'}`} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
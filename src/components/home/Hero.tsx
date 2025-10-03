import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Search, BookOpen } from 'lucide-react';
import SearchAutocomplete from '../common/SearchAutocomplete';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const statsRef = useRef<HTMLDivElement>(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsStatsVisible(true);
          } else {
            setIsStatsVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-400 dark:bg-indigo-500 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-teal-400 dark:bg-teal-500 blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-indigo-100 bg-opacity-20 backdrop-blur-sm rounded-full">
            <Sparkles className="h-5 w-5 text-amber-300 ml-2" />
            <span className="text-amber-300 font-medium">اكتشف مستقبل التعليم</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            <span className="block text-teal-300">
              {t('hero.subtitle')}
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-indigo-100">
            {t('hero.description')}
          </p>
          
          <div className="mt-10 max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl dark:shadow-gray-900/50 p-2">
            <SearchAutocomplete placeholder={t('hero.searchPlaceholder')} containerClassName="" inputClassName="py-4" />
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 sm:gap-8">
            <Link 
              to="/about" 
              className="bg-white dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-20 hover:bg-opacity-30 dark:hover:bg-opacity-30 transition-opacity backdrop-blur-sm text-white px-6 py-3 rounded-md text-base font-medium"
            >
              {t('common.learnMore')}
            </Link>
            <Link 
              to="/tools" 
              className="bg-teal-500 dark:bg-teal-600 hover:bg-teal-600 dark:hover:bg-teal-700 transition-colors text-white px-6 py-3 rounded-md text-base font-medium inline-flex items-center"
            >
              <BookOpen className="ml-2 h-5 w-5" />
              {t('common.viewAll')}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="relative bg-white dark:bg-gray-800 bg-opacity-10 dark:bg-opacity-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" ref={statsRef}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center overflow-hidden">
              <p className={`text-3xl font-bold text-white dark:text-white ${isStatsVisible ? 'animate-number-slide' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                <span className={`inline-block ${isStatsVisible ? 'animate-pulse-fade' : ''}`} style={{ animationDelay: '0.3s' }}>+12</span>
              </p>
              <p className={`text-indigo-200 dark:text-indigo-300 ${isStatsVisible ? 'animate-pulse-fade' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                أداة ذكاء اصطناعي
              </p>
            </div>
            <div className="text-center overflow-hidden">
              <p className={`text-3xl font-bold text-white ${isStatsVisible ? 'animate-number-slide' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <span className={`inline-block ${isStatsVisible ? 'animate-pulse-fade' : ''}`} style={{ animationDelay: '0.6s' }}>+10</span>
              </p>
              <p className={`text-indigo-200 ${isStatsVisible ? 'animate-pulse-fade' : 'opacity-0'}`} style={{ animationDelay: '0.9s' }}>
                فئة
              </p>
            </div>
            <div className="text-center overflow-hidden">
              <p className={`text-3xl font-bold text-white ${isStatsVisible ? 'animate-number-slide' : 'opacity-0'}`} style={{ animationDelay: '0.9s' }}>
                <span className={`inline-block ${isStatsVisible ? 'animate-pulse-fade' : ''}`} style={{ animationDelay: '0.9s' }}>+1000</span>
              </p>
              <p className={`text-indigo-200 ${isStatsVisible ? 'animate-pulse-fade' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
                تقييم
              </p>
            </div>
            <div className="text-center overflow-hidden">
              <p className={`text-3xl font-bold text-white ${isStatsVisible ? 'animate-number-slide' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
                <span className={`inline-block ${isStatsVisible ? 'animate-pulse-fade' : ''}`} style={{ animationDelay: '1.2s' }}>+10,000</span>
              </p>
              <p className={`text-indigo-200 ${isStatsVisible ? 'animate-pulse-fade' : 'opacity-0'}`} style={{ animationDelay: '1.5s' }}>
                طالب مستفيد
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
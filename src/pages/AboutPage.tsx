import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageLayout from '../components/layout/PageLayout';
import { 
  BookOpen, 
  Search, 
  Users, 
  Sparkles, 
  CheckCircle, 
  Star,
  Zap,
  Shield,
  TrendingUp,
  ArrowRight 
} from 'lucide-react';

interface ValueItem {
  title: string;
  description: string;
}

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const valueIcons = [
    { icon: <Star className="h-6 w-6 text-indigo-600" />, color: 'bg-indigo-100' },
    { icon: <Zap className="h-6 w-6 text-purple-600" />, color: 'bg-purple-100' },
    { icon: <Shield className="h-6 w-6 text-teal-600" />, color: 'bg-teal-100' },
    { icon: <TrendingUp className="h-6 w-6 text-amber-600" />, color: 'bg-amber-100' }
  ];

  const values = t('about.values.items', { returnObjects: true }) as ValueItem[];

  return (
    <PageLayout>
      <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-900 text-white py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-400 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-teal-400 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
            {t('about.title')}
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
            {t('about.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/guide" 
              className="inline-flex items-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              <BookOpen className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t('about.viewGuide')}
            </Link>
            <Link 
              to="/tools" 
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm group"
            >
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              {t('about.startNow')}
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{t('about.mission.title')}</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
              {t('about.mission.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="mr-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {t('about.mission.forStudents.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-right leading-relaxed">
                {t('about.mission.forStudents.description')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 dark:bg-teal-900/50 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="mr-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {t('about.mission.forEducators.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-right leading-relaxed">
                {t('about.mission.forEducators.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Why devora_tools Section */}
        <div className="mb-20 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 sm:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">لماذا devora_tools؟</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              منصة متكاملة تجمع أفضل أدوات الذكاء الاصطناعي التعليمية في مكان واحد، مع دعم كامل باللغة العربية
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-full">
                  <Search className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-3">
                {t('about.offerings.curation.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {t('about.offerings.curation.description')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-3">
                {t('about.offerings.information.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                {t('about.offerings.information.description')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-teal-100 dark:bg-teal-900/50 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-3">
                {t('about.offerings.community.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                {t('about.offerings.community.description')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <div className="bg-indigo-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('about.values.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value: ValueItem, index: number) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg ${valueIcons[index].color} dark:bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                      {valueIcons[index].icon}
                    </div>
                    <h3 className="mr-4 text-xl font-semibold text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-right leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
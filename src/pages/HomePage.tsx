import React from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '../components/layout/PageLayout';
import Hero from '../components/home/Hero';
import FeaturedTools from '../components/home/FeaturedTools';
import CategorySection from '../components/home/CategorySection';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import { useTools } from '../hooks/useTools';
import { Loader } from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { tools, isLoading, error, featuredTools, popularTools, newTools } = useTools();

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Hero />
      
      <FeaturedTools 
        title={t('common.featured')}
        subtitle={t('home.featuredToolsSubtitle')}
        tools={featuredTools.slice(0, 4)}
        viewAllLink="/tools"
      />
      
      <CategorySection />
      
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <FeaturedTools 
          title={t('common.popular')}
          subtitle={t('home.popularToolsSubtitle')}
          tools={popularTools.slice(0, 4)}
          viewAllLink="/tools?sort=popular"
          className="bg-transparent"
        />
      </div>
      
      <FeaturedTools 
        title={t('common.new')}
        subtitle={t('home.newToolsSubtitle')}
        tools={newTools.slice(0, 4)}
        viewAllLink="/tools?sort=new"
      />
      
      <Testimonials />
      
      <CallToAction />
    </PageLayout>
  );
};

export default HomePage;
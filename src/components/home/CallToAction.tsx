import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';

const CallToAction: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-indigo-700 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white dark:text-white sm:text-4xl">
            {t('callToAction.title')}
          </h2>
          <p className="mt-4 text-lg text-indigo-100 dark:text-gray-300 max-w-2xl mx-auto">
            {t('callToAction.subtitle')}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse justify-center">
            <Link
              to="/tools"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700"
            >
              {t('callToAction.exploreTools')}
            </Link>
            <Link
              to="/submit-tool"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 dark:bg-indigo-500 bg-opacity-60 dark:bg-opacity-80 hover:bg-opacity-70 dark:hover:bg-opacity-100"
            >
              <Send className="ml-2 h-5 w-5" />
              {t('callToAction.submitTool')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
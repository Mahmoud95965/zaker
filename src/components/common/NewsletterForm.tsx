import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { subscribeToNewsletter } from '../../services/newsletter.service';
import { Send } from 'lucide-react';

interface NewsletterFormProps {
  className?: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage(t('newsletter.emailRequired'));
      return;
    }

    try {
      setStatus('loading');
      const success = await subscribeToNewsletter(email);
      
      if (success) {
        setStatus('success');
        setMessage(t('newsletter.subscribeSuccess'));
        setEmail('');
      } else {
        throw new Error('فشل الاشتراك');
      }
    } catch (error) {
      setStatus('error');
      setMessage(t('newsletter.subscribeError'));
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 3000);
  };

  const getStatusClasses = () => {
    switch (status) {
      case 'loading':
        return 'opacity-50 cursor-wait';
      case 'success':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'error':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return '';
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('newsletter.emailPlaceholder')}
            className={`w-full px-4 py-2.5 rounded-lg border bg-gray-800 border-gray-700 
              focus:ring-2 focus:ring-indigo-500 text-gray-300 placeholder-gray-500 
              transition-all duration-200 ${getStatusClasses()}`}
            disabled={status === 'loading'}
          />
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg 
            transition-all duration-200 flex items-center justify-center gap-2 
            disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]
            ${status === 'loading' ? 'animate-pulse' : ''}`}
        >
          <Send className="h-4 w-4" />
          <span>{t('newsletter.subscribe')}</span>
        </button>
      </form>

      {message && (
        <p className={`mt-2 text-sm ${status === 'success' ? 'text-green-500' : 'text-red-500'} 
          transition-all duration-200`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsletterForm;

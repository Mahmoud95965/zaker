import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Menu, 
  X,
  Moon,
  Sun,
  CircleUserRound,
  Bell,
  Plus,
  BrainCircuit
} from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import UserProfile from '../auth/UserProfile';
import NotificationsList from '../notifications/NotificationsList';

interface Notification {
  id: string;
  read: boolean;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', user.email)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];
      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, [user?.email]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">          <Link to="/" className="flex-shrink-0 flex items-center group">
            <BrainCircuit className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-pulse-slow transition-all duration-300 group-hover:scale-110" />
            <span className="mx-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 animate-fade-in transition-all duration-300 group-hover:bg-gradient-to-l">Zakér</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:justify-center flex-1">
            <div className="flex space-x-12 space-x-reverse">
              <Link 
                to="/" 
                className="relative text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center px-3 pt-1 text-sm font-medium transition-colors"
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/tools" 
                className="relative text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center px-3 pt-1 text-sm font-medium transition-colors"
              >
                {t('nav.tools')}
              </Link>
              <Link 
                to="/about" 
                className="relative text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center px-3 pt-1 text-sm font-medium transition-colors"
              >
                {t('nav.about')}
              </Link>
            </div>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden sm:flex sm:items-center sm:ml-6 sm:space-x-4 sm:space-x-reverse">
            {user && (
              <>
                <Link
                  to="/submit-tool"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  <Plus className="ml-2 h-5 w-5" />
                  إضافة أداة
                </Link>

                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 relative"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsNotificationsOpen(false)}
                    />
                    <div className="absolute left-0 mt-2 w-96 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                      <div className="p-4">
                        <NotificationsList />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-all"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-all"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {user ? (
              <UserProfile />
            ) : (
              <Link 
                to="/auth"
                className="inline-flex items-center px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                <CircleUserRound className="ml-2 h-5 w-5" />
                ابدأ الآن
              </Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 sm:hidden">
            {user ? (
              <>
                <Link
                  to="/submit-tool"
                  className="inline-flex items-center p-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  aria-label="إضافة أداة"
                >
                  <Plus className="h-5 w-5" />
                </Link>
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-all relative"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
              </>
            ) : (
              <Link 
                to="/auth"
                className="inline-flex items-center p-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                aria-label="تسجيل الدخول"
              >
                <CircleUserRound className="h-5 w-5" />
              </Link>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-all"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link 
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/tools"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                {t('nav.tools')}
              </Link>
              <Link 
                to="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                {t('nav.about')}
              </Link>
            </div>
            {user && (
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                <UserProfile />
              </div>
            )}
          </div>
        )}

        {/* Mobile Notifications */}
        {isNotificationsOpen && (
          <div className="fixed inset-0 z-50 sm:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsNotificationsOpen(false)} />
            <div className="fixed bottom-0 left-0 right-0 max-h-[80vh] rounded-t-xl bg-white dark:bg-gray-800 shadow-lg transition-transform">
              <div className="p-4 overflow-y-auto">
                <NotificationsList />
              </div>
            </div>
          </div>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute inset-x-0 top-full bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900 p-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-right placeholder-gray-500 dark:placeholder-gray-400"
                  dir="rtl"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

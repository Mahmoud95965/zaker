import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTools } from '../hooks/useTools';
import { updateToolVote, updateToolSave } from '../services/tool-actions.service';
import PageLayout from '../components/layout/PageLayout';
import ToolsGrid from '../components/tools/ToolsGrid';
import ShareToolModal from '../components/tools/ShareToolModal';
import { Tool } from '../types';
import { Star, ExternalLink, Share2, BookmarkPlus, BookmarkMinus, ThumbsUp, ThumbsDown, Loader } from 'lucide-react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const ToolDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { tools, loading: toolsLoading } = useTools();
  const [tool, setTool] = useState<Tool | null>(null);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
  const [isVoting, setIsVoting] = useState(false);
  const [userVote, setUserVote] = useState<'helpful' | 'not-helpful' | null>(null);
  const [voteMessage, setVoteMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const updateRelatedTools = useCallback((currentTool: Tool) => {
    const related = tools
      .filter(t => 
        t.id !== currentTool.id && 
        (t.category === currentTool.category || 
         t.tags.some(tag => currentTool.tags.includes(tag)))
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setRelatedTools(related);
  }, [tools]);

  const updateUserVote = useCallback((toolData: Tool) => {
    if (user && toolData.votes) {
      if (toolData.votes.helpful?.includes(user.uid)) {
        setUserVote('helpful');
      } else if (toolData.votes.notHelpful?.includes(user.uid)) {
        setUserVote('not-helpful');
      } else {
        setUserVote(null);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!id) {
      setError('الأداة غير موجودة');
      setLoading(false);
      return;
    }

    if (toolsLoading) {
      // Wait for tools context to be ready
      return;
    }

    setLoading(true);
    setError(null);

    // Normalize the ID to match Firestore format
    const normalizedId = id.toString().padStart(3, '0');
    
    // Try to find the tool in the context first for faster loading
    const toolFromContext = tools.find(t => t.id === normalizedId);
    if (toolFromContext) {
      setTool(toolFromContext);
      updateRelatedTools(toolFromContext);
      updateUserVote(toolFromContext);
    }

    // Set up real-time listener for updates
    const toolRef = doc(db, 'tools', normalizedId);
    console.log(`Fetching tool with ID: ${normalizedId}`);
    
    const unsubscribe = onSnapshot(
      toolRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const toolData = { ...snapshot.data(), id: snapshot.id } as Tool;
          setTool(toolData);
          updateRelatedTools(toolData);
          updateUserVote(toolData);
          setError(null);
          console.log(`Tool found: ${toolData.name}`);
        } else {
          console.log('Tool not found in Firestore');
          if (!toolFromContext) {
            setError('الأداة غير موجودة');
            setTool(null);
          }
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching tool:', err);
        if (!toolFromContext) {
          setError('حدث خطأ أثناء تحميل الأداة');
          setTool(null);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id, tools, toolsLoading, updateRelatedTools, updateUserVote]);
  const handleVote = async (isHelpful: boolean) => {
    if (!user) {
      setVoteMessage('يجب تسجيل الدخول للتصويت');
      return;
    }

    if (!tool?.id) {
      console.error('Cannot vote: Tool is not properly loaded');
      return;
    }

    setIsVoting(true);
    setVoteMessage(null);

    try {
      const result = await updateToolVote(tool.id, user.uid, isHelpful);
      if (result.success) {
        setVoteMessage('شكراً على ملاحظاتك! تم تحديث التقييم');
        // Snapshot listener will update the UI automatically
      }
    } catch (error) {
      console.error('Error updating vote:', error);
      setVoteMessage(error instanceof Error ? error.message : 'حدث خطأ أثناء تحديث التصويت');
    } finally {
      setIsVoting(false);
    }
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${
          i < Math.floor(rating) 
            ? 'text-amber-400 dark:text-amber-300 fill-amber-400 dark:fill-amber-300' 
            : 'text-gray-300 dark:text-gray-600'
        }`} 
      />
    ));
  };
    const handleSave = async () => {
    if (!user) {
      setSaveMessage('يجب تسجيل الدخول لحفظ الأداة');
      return;
    }

    if (!tool?.id) {
      console.error('Cannot save: Tool is not properly loaded');
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const result = await updateToolSave(tool.id, user.uid);
      if (result.success) {
        setSaveMessage(result.isSaved ? 'تم حفظ الأداة بنجاح' : 'تم إزالة الأداة من المحفوظات');
        // Snapshot listener will update the UI automatically
      }
    } catch (error) {
      console.error('Error updating save:', error);
      setSaveMessage(error instanceof Error ? error.message : 'حدث خطأ أثناء حفظ الأداة');
    } finally {
      setIsSaving(false);
    }
  };
  
  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
        </div>
      </PageLayout>
    );
  }

  if (error || !tool) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">الأداة غير موجودة</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {error || 'الأداة التي تبحث عنها غير موجودة أو تم إزالتها.'}
          </p>
          <Link 
            to="/tools" 
            className="mt-6 inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
          >
            تصفح جميع الأدوات
          </Link>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{error}</h2>
          </div>
        </div>
      ) : tool ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-96 md:flex-shrink-0">
                <div className="relative h-64 md:h-full">
                  <img
                    className="w-full h-full object-contain md:object-cover transition-transform duration-300 hover:scale-105 dark:brightness-90"
                    src={tool.imageUrl}
                    alt={tool.name}
                    loading="lazy"
                  />
                </div>
              </div>
              
              <div className="p-8 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                    {tool.category}
                  </span>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    tool.pricing === 'Free' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' :
                    tool.pricing === 'Freemium' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200' :
                    tool.pricing === 'Paid' ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200' :
                    'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200'
                  }`}>
                    {tool.pricing === 'Free' ? 'مجاني' :
                     tool.pricing === 'Freemium' ? 'مجاني مع مميزات مدفوعة' :
                     tool.pricing === 'Paid' ? 'مدفوع' :
                     'اشتراك'}
                  </span>
                  {tool.isNew && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-800 dark:text-teal-200 bg-teal-100 dark:bg-teal-900/50 rounded-full">
                      جديد
                    </span>
                  )}
                </div>
                
                <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white text-right">{tool.name}</h1>
                
                <div className="mt-2 flex items-center justify-end">
                  <span className="mr-2 text-gray-600 dark:text-gray-400" dir="rtl">({tool.reviewCount} تقييم)</span>
                  <div className="flex items-center">
                    {renderStars(tool.rating)}
                    <span className="mr-2 text-gray-600 dark:text-gray-400">{tool.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg text-right leading-relaxed" dir="rtl">{tool.description}</p>
                
                <div className="mt-6 flex flex-wrap gap-2 justify-end">
                  {tool.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-block px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                      dir="rtl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                  >
                    <ExternalLink className="ml-2 h-4 w-4" />
                    زيارة الموقع
                  </a>
                  
                  <button 
                    onClick={() => setIsShareModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                  >
                    <Share2 className="ml-2 h-4 w-4" />
                    مشاركة
                  </button>
                  
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors
                      ${tool?.savedBy?.includes(user?.uid)
                        ? 'border-transparent text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 disabled:opacity-50`}
                  >
                    {tool?.savedBy?.includes(user?.uid) ? (
                      <>
                        <BookmarkMinus className="ml-2 h-4 w-4" />
                        إزالة من المحفوظات
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="ml-2 h-4 w-4" />
                        حفظ
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">عن {tool.name}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-right leading-relaxed">
                {tool.longDescription || tool.description}
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">المميزات الرئيسية</h3>
              <ul className="space-y-2 mb-6">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 dark:text-indigo-300 ml-2">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">هل كانت هذه الأداة مفيدة؟</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4 space-x-reverse">
                    <button
                      onClick={() => handleVote(true)}
                      disabled={isVoting}
                      className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors
                        ${userVote === 'helpful'
                          ? 'border-transparent text-white bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 disabled:opacity-50`}
                    >
                      <ThumbsUp className="ml-2 h-4 w-4" />
                      نعم، مفيدة
                      {tool?.votes?.helpful && (
                        <span className="mr-2 bg-opacity-20 px-2 py-1 rounded-full text-xs">
                          {tool.votes.helpful.length}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => handleVote(false)}
                      disabled={isVoting}
                      className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors
                        ${userVote === 'not-helpful'
                          ? 'border-transparent text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 disabled:opacity-50`}
                    >
                      <ThumbsDown className="ml-2 h-4 w-4" />
                      لا، غير مفيدة
                      {tool?.votes?.notHelpful && (
                        <span className="mr-2 bg-opacity-20 px-2 py-1 rounded-full text-xs">
                          {tool.votes.notHelpful.length}
                        </span>
                      )}
                    </button>
                  </div>
                  {voteMessage && (
                    <div className={`text-sm ${
                      voteMessage === 'يجب تسجيل الدخول للتصويت'
                        ? 'text-amber-600 dark:text-amber-400'
                        : voteMessage.includes('خطأ')
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {voteMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {relatedTools.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">قد يعجبك أيضاً</h2>
              <ToolsGrid tools={relatedTools} />
            </div>
          )}
        </div>
      ) : null}

      {/* Share Tool Modal */}
      {isShareModalOpen && tool && (
        <ShareToolModal 
          isOpen={isShareModalOpen} 
          onClose={() => setIsShareModalOpen(false)} 
          tool={tool}
        />
      )}
    </PageLayout>
  );
};

export default ToolDetailPage;
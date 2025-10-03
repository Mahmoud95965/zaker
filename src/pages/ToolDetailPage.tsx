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
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/30 to-emerald-500/40 shadow-lg">
            <div className="bg-white dark:bg-gray-900 rounded-[15px] overflow-hidden">
              <div className="relative h-52 md:h-64 lg:h-72">
                <img
                  src={tool.imageUrl}
                  alt={tool.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-fuchsia-600/10" />
                <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end justify-between">
                  <div className="hidden md:block" />
                  <div className="text-right py-6">
                    <div className="flex items-center justify-end gap-2">
                      <span className="inline-block px-2.5 py-1 text-[11px] font-semibold text-indigo-800 dark:text-indigo-200 bg-indigo-100/70 dark:bg-indigo-900/40 ring-1 ring-indigo-200/60 dark:ring-indigo-500/30 rounded-full">
                        {tool.category}
                      </span>
                      <span className={`inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full backdrop-blur-sm ${
                        tool.pricing === 'Free' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200' :
                        tool.pricing === 'Freemium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' :
                        tool.pricing === 'Paid' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200' :
                        'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
                      }`}>
                        {tool.pricing === 'Free' ? 'مجاني' :
                         tool.pricing === 'Freemium' ? 'مجاني مع مميزات مدفوعة' :
                         tool.pricing === 'Paid' ? 'مدفوع' :
                         'اشتراك'}
                      </span>
                      {tool.isNew && (
                        <span className="inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full">
                          جديد
                        </span>
                      )}
                    </div>
                    <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                      {tool.name}
                    </h1>
                    <div className="mt-2 flex items-center justify-end">
                      <span className="ml-2 text-gray-600 dark:text-gray-400" dir="rtl">({tool.reviewCount} تقييم)</span>
                      <div className="flex items-center">
                        {renderStars(tool.rating)}
                        <span className="mr-2 text-gray-600 dark:text-gray-400">{tool.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 md:px-8 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-right" dir="rtl">{tool.description}</p>

                  {tool.tags?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2 justify-end">
                      {tool.tags.map((tag) => (
                        <span key={tag} className="inline-block px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full ring-1 ring-gray-200/60 dark:ring-white/10" dir="rtl">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-white dark:bg-gray-900 ring-1 ring-gray-200/60 dark:ring-white/10 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">عن الأداة</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {tool.longDescription || tool.description}
                      </p>
                    </div>
                  <div className="p-5 rounded-xl bg-white dark:bg-gray-900 ring-1 ring-gray-200/60 dark:ring-white/10 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">المميزات الرئيسية</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {tool.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 rounded-lg ring-1 ring-gray-200/60 dark:ring-white/10 bg-white dark:bg-gray-900 p-3"
                          aria-label={`ميزة: ${feature}`}
                          title={feature}
                        >
                          <span className="mt-0.5 inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300">
                            <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          </span>
                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>
                </div>

                <aside className="order-1 lg:order-2 lg:sticky lg:top-20 self-start">
                  <div className="p-5 rounded-xl bg-white dark:bg-gray-900 ring-1 ring-gray-200/60 dark:ring-white/10 shadow-sm">
                    <div className="flex flex-col gap-3">
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-all"
                      >
                        <ExternalLink className="ml-1 h-4 w-4" />
                        زيارة الموقع
                      </a>

                      <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-colors"
                      >
                        <Share2 className="ml-1 h-4 w-4" />
                        مشاركة
                      </button>

                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors
                          ${tool?.savedBy?.includes(user?.uid)
                            ? 'text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600'
                            : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900 disabled:opacity-50`}
                      >
                        {tool?.savedBy?.includes(user?.uid) ? (
                          <>
                            <BookmarkMinus className="ml-1 h-4 w-4" />
                            إزالة من المحفوظات
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="ml-1 h-4 w-4" />
                            حفظ
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 p-5 rounded-xl bg-white dark:bg-gray-900 ring-1 ring-gray-200/60 dark:ring-white/10 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">تفاصيل سريعة</h3>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex justify-between"><span>الفئة</span><span className="font-medium">{tool.category}</span></div>
                      <div className="flex justify-between"><span>التسعير</span><span className="font-medium">{tool.pricing}</span></div>
                      <div className="flex justify-between"><span>التقييم</span><span className="font-medium">{tool.rating.toFixed(1)}</span></div>
                    </div>
                  </div>
                </aside>
              </div>

              <div className="px-6 md:px-8 lg:px-10 pb-8">
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">هل كانت هذه الأداة مفيدة؟</h3>
                  <div className="space-y-4">
                    <div className="flex space-x-4 space-x-reverse">
                      <button
                        onClick={() => handleVote(true)}
                        disabled={isVoting}
                        className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors
                          ${userVote === 'helpful'
                            ? 'border-transparent text-white bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600'
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-900 disabled:opacity-50`}
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
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900 disabled:opacity-50`}
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
          </div>

          {relatedTools.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">قد يعجبك أيضاً</h2>
              <ToolsGrid tools={relatedTools} />
            </div>
          )}
        </div>
      ) : null}

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
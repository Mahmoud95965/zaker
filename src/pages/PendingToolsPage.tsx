import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Tool } from '../types/tool';
import PageLayout from '../components/layout/PageLayout';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { sendNotification } from '../services/notification.service';

const PendingToolsPage: React.FC = () => {
  const [pendingTools, setPendingTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }

    const toolsRef = collection(db, 'tools');
    const pendingToolsQuery = query(toolsRef, where('status', '==', 'pending'));

    const unsubscribe = onSnapshot(pendingToolsQuery, (snapshot) => {
      const tools: Tool[] = [];
      snapshot.forEach((doc) => {
        tools.push({ id: doc.id, ...doc.data() } as Tool);
      });
      setPendingTools(tools);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching pending tools:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin, navigate]);

  const handleToolAction = async (tool: Tool, action: 'approve' | 'reject') => {
    if (!user) return;

    try {
      const toolRef = doc(db, 'tools', tool.id);
      await updateDoc(toolRef, {
        status: action === 'approve' ? 'approved_pending' : 'rejected',
        reviewedBy: user.email,
        reviewedAt: new Date().toISOString()
      });
      
      // Send notification to the submitter
      if (tool.submittedBy) {
        if (action === 'approve') {
          await sendNotification({
            userId: tool.submittedBy,
            type: 'tool_approved',
            title: 'تم قبول أداتك!',
            message: `تم قبول الأداة "${tool.name}" بنجاح! سيتم إضافتها إلى منصتنا قريباً. شكراً لمساهمتك القيمة!`,
            toolName: tool.name,
            toolId: tool.id
          });
        } else {
          await sendNotification({
            userId: tool.submittedBy,
            type: 'tool_rejected',
            title: 'تم رفض الأداة',
            message: `عذراً، تم رفض الأداة "${tool.name}" لعدم توافقها مع <a href="/terms" class="text-indigo-600 hover:text-indigo-800">شروط الاستخدام</a>. يمكنك مراجعة الشروط وإعادة تقديم الأداة.`,
            toolName: tool.name,
            toolId: tool.id
          });
        }
      }
      
      // Update local state
      setPendingTools(current => current.filter(t => t.id !== tool.id));
    } catch (error) {
      console.error(`Error ${action}ing tool:`, error);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">تحقق من الأدوات المعلقة</h1>
        {pendingTools.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            لا توجد أدوات معلقة للمراجعة
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    تم الإضافة بواسطة: {tool.submittedBy}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToolAction(tool, 'reject')}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      title="رفض"
                    >
                      <ThumbsDown className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleToolAction(tool, 'approve')}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                      title="موافقة"
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default PendingToolsPage;

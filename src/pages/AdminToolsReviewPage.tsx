import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import PageLayout from '../components/layout/PageLayout';
import { Tool } from '../types';
import { useAuth } from '../context/AuthContext';
import { ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { sendNotification } from '../services/notification.service';
import { Link } from 'react-router-dom';

export const AdminToolsReviewPage: React.FC = () => {
  const [pendingTools, setPendingTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<{
    type: 'approve' | 'reject';
    toolName: string;
  } | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPendingTools = async () => {
      try {
        const toolsRef = collection(db, 'tools');
        const q = query(toolsRef, where('status', '==', 'pending'));
        const querySnapshot = await getDocs(q);
        const tools = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Tool));
        setPendingTools(tools);
      } catch (error) {
        console.error('Error fetching pending tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingTools();
  }, []);

  const handleApprove = async (toolId: string) => {
    try {
      const tool = pendingTools.find(t => t.id === toolId);
      if (!tool || !user) return;

      const toolRef = doc(db, 'tools', toolId);
      await updateDoc(toolRef, {
        status: 'approved_pending',
        reviewedBy: user.email,
        reviewedAt: new Date().toISOString()
      });

      // Send notification with updated message
      await sendNotification({
        userId: tool.submittedBy,
        type: 'tool_approved',
        title: 'تم قبول أداتك!',
        message: `تم قبول الأداة "${tool.name}" بنجاح! سيتم إضافتها إلى منصتنا قريباً. شكراً لمساهمتك القيمة!`,
        toolName: tool.name,
        toolId: tool.id
      });
      
      // Show success message
      setShowSuccessMessage({
        type: 'approve',
        toolName: tool.name
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(null);
      }, 3000);
      
      // Update local state
      setPendingTools(current => current.filter(t => t.id !== toolId));
    } catch (error) {
      console.error('Error approving tool:', error);
    }
  };

  const handleReject = async () => {
    if (!selectedToolId || !rejectReason.trim() || !user) {
      return;
    }

    try {
      const tool = pendingTools.find(t => t.id === selectedToolId);
      if (!tool) return;

      const toolRef = doc(db, 'tools', selectedToolId);
      await updateDoc(toolRef, {
        status: 'rejected',
        reviewedBy: user.email,
        reviewedAt: new Date().toISOString(),
        rejectionReason: rejectReason
      });      // Send notification
      await sendNotification({
        userId: tool.submittedBy,
        type: 'tool_rejected',
        title: 'تم رفض الأداة',
        message: `عذراً، تم رفض الأداة "${tool.name}" لعدم توافقها مع شروط الاستخدام: ${rejectReason}`,
        toolName: tool.name,
        toolId: tool.id
      });
      
      // Show success message
      setShowSuccessMessage({
        type: 'reject',
        toolName: tool.name
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(null);
      }, 3000);
      
      // Update local state
      setPendingTools(current => current.filter(tool => tool.id !== selectedToolId));
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedToolId(null);
    } catch (error) {
      console.error('Error rejecting tool:', error);
    }
  };

  const openRejectModal = (toolId: string) => {
    setSelectedToolId(toolId);
    setShowRejectModal(true);
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Navigation */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">لوحة تحكم المسؤول</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/tools-review"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              مراجعة الأدوات
            </Link>
            <Link
              to="/admin/final-tools"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
            >
              الأدوات النهائية
            </Link>
          </div>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-4 p-4 rounded-md bg-green-50 dark:bg-green-900">
            <p className="text-green-800 dark:text-green-200">
              {showSuccessMessage.type === 'approve'
                ? `تم قبول "${showSuccessMessage.toolName}" بنجاح!`
                : `تم رفض "${showSuccessMessage.toolName}".`}
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              الأدوات قيد المراجعة
            </h3>

            <div className="space-y-6">
              {pendingTools.map((tool) => (
                <div 
                  key={tool.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-right">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-right">
                        {tool.description}
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1 text-right">
                        <p>التصنيف: {tool.category}</p>
                        <p>الرابط: <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline" dir="ltr">{tool.url}</a></p>
                        <p>مقترح بواسطة: <span dir="ltr">{tool.submittedBy}</span></p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleApprove(tool.id)}
                        className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
                      >
                        <ThumbsUp className="ml-2 h-4 w-4" />
                        موافقة
                      </button>
                      <button
                        onClick={() => openRejectModal(tool.id)}
                        className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
                      >
                        <ThumbsDown className="ml-2 h-4 w-4" />
                        رفض
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <button 
                    onClick={() => {
                      setShowRejectModal(false);
                      setRejectReason('');
                      setSelectedToolId(null);
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">سبب الرفض</h3>
                </div>
                
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full h-32 p-2 border rounded-md mb-4 text-right dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="اكتب سبب رفض الأداة..."
                  dir="rtl"
                />
                
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <button
                    onClick={handleReject}
                    disabled={!rejectReason.trim()}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    تأكيد الرفض
                  </button>
                  <button
                    onClick={() => {
                      setShowRejectModal(false);
                      setRejectReason('');
                      setSelectedToolId(null);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};
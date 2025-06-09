import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTools } from '../hooks/useTools';
import PageLayout from '../components/layout/PageLayout';
import SavedTools from '../components/tools/SavedTools';
import { updateProfile } from 'firebase/auth';
import { User, Camera, Loader, Bell } from 'lucide-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../config/firebase';
import NotificationsList from '../components/notifications/NotificationsList';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { tools, isLoading: isLoadingTools } = useTools();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const storage = getStorage();

  // Get saved tools
  const savedTools = tools.filter(tool => tool.savedBy?.includes(user?.uid || ''));

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    try {
      setIsLoading(true);
      setError(null);
      
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `profile-images/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      // Update user profile
      await updateProfile(auth.currentUser!, {
        photoURL: downloadURL
      });
      
      // Force refresh to show new image
      window.location.reload();
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('حدث خطأ أثناء تحميل الصورة');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      
      await updateProfile(auth.currentUser!, {
        displayName: displayName
      });
      
      setIsEditing(false);
      // Force refresh to show new name
      window.location.reload();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('حدث خطأ أثناء تحديث الملف الشخصي');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          {/* Profile section */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">الملف الشخصي</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">معلوماتك الشخصية</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                {isEditing ? 'إلغاء' : 'تعديل'}
              </button>
            </div>
          </div>
          
          {/* Profile content */}
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
                {isEditing && (
                  <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg cursor-pointer">
                    <Camera className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isLoading}
                    />
                  </label>
                )}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm dark:bg-gray-700 dark:text-white"
                    placeholder="اسمك"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.displayName || 'مستخدم'}</h2>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>

            {error && (
              <div className="mt-4 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {isEditing && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  حفظ التغييرات
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Saved Tools Section */}
        <div className="mt-8">
          {isLoadingTools ? (
            <div className="flex justify-center py-4">
              <Loader className="h-5 w-5 animate-spin text-indigo-600 dark:text-indigo-400" />
            </div>
          ) : (
            <SavedTools tools={savedTools} />
          )}
        </div>

        <div className="mt-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Bell className="ml-2 h-5 w-5" />
                الإشعارات
              </h2>
            </div>
            <NotificationsList />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;

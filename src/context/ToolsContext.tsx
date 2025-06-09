import React, { createContext, useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Tool } from '../types/tool';
import { FilterOptions } from '../types';
import { filterTools } from '../utils/filterTools';
import { convertFirestoreDoc } from '../services/tools.service';

interface ToolsContextType {
  tools: Tool[];
  isLoading: boolean;
  error: string | null;
  featuredTools: Tool[];
  popularTools: Tool[];
  newTools: Tool[];
  getToolById: (id: string) => Tool | undefined;
  getRelatedTools: (tool: Tool, limit?: number) => Tool[];
  filterToolsByOptions: (options: FilterOptions) => Tool[];
}

export const ToolsContext = createContext<ToolsContextType | null>(null);

export const ToolsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // إعداد مستمع مباشر للتغييرات
    const unsubscribe = onSnapshot(
      collection(db, 'tools'),
      (snapshot) => {
        const updatedTools = snapshot.docs
          .map(convertFirestoreDoc)
          .sort((a, b) => {
            // ترتيب حسب التقييم وعدد المراجعات
            return (b.rating * b.reviewCount) - (a.rating * a.reviewCount);
          });
        setTools(updatedTools);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error listening to tools updates:', err);
        setError('حدث خطأ في تحميل الأدوات');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const featuredTools = tools.filter(tool => tool.isFeatured);
  const popularTools = tools
    .filter(tool => tool.isPopular)
    .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));
  const newTools = tools
    .filter(tool => tool.isNew)
    .sort((a, b) => new Date(b.submittedAt || '').getTime() - new Date(a.submittedAt || '').getTime());

  const getToolById = (id: string) => {
    const normalizedId = id.toString().padStart(3, '0');
    return tools.find(tool => tool.id === normalizedId);
  };

  const getRelatedTools = (tool: Tool, limit: number = 3) => {
    return tools
      .filter(t => 
        t.id !== tool.id && 
        (t.category === tool.category || 
         t.tags.some(tag => tool.tags.includes(tag)))
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  };

  const filterToolsByOptions = (options: FilterOptions) => {
    return filterTools(tools, options);
  };

  const value: ToolsContextType = {
    tools,
    isLoading,
    error,
    featuredTools,
    popularTools,
    newTools,
    getToolById,
    getRelatedTools,
    filterToolsByOptions
  };

  return (
    <ToolsContext.Provider value={value}>
      {children}
    </ToolsContext.Provider>
  );
};

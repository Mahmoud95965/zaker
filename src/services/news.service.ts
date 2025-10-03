import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { NewsArticle } from '../types';

const NEWS_COLLECTION = 'news';

export async function publishNewsArticle(input: Omit<NewsArticle, 'id' | 'createdAt' | 'status'> & { status?: 'draft' | 'published' }) {
  const data = {
    title: input.title,
    content: input.content,
    coverImageUrl: input.coverImageUrl || '',
    tags: input.tags || [],
    authorId: input.authorId,
    authorEmail: input.authorEmail || '',
    status: input.status || 'published',
    createdAt: serverTimestamp(),
  } as any;

  const ref = await addDoc(collection(db, NEWS_COLLECTION), data);
  return ref.id;
}

export async function listPublishedNews(): Promise<NewsArticle[]> {
  // Avoid composite index requirement by ordering on client
  const q = query(collection(db, NEWS_COLLECTION), where('status', '==', 'published'));
  const snapshot = await getDocs(q);
  const items = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any), createdAt: (d.data() as any).createdAt?.toDate?.()?.toISOString?.() || '' })) as NewsArticle[];
  return items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export async function getNewsById(id: string): Promise<NewsArticle | null> {
  const ref = doc(db, NEWS_COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data() as any;
  return { id: snap.id, ...data, createdAt: data.createdAt?.toDate?.()?.toISOString?.() || '' } as NewsArticle;
}

export async function updateNewsStatus(id: string, status: 'draft' | 'published') {
  const ref = doc(db, NEWS_COLLECTION, id);
  await updateDoc(ref, { status });
}

export async function listAllNews(): Promise<NewsArticle[]> {
  // Avoid composite index requirement by ordering on client
  const q = query(collection(db, NEWS_COLLECTION));
  const snapshot = await getDocs(q);
  const items = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any), createdAt: (d.data() as any).createdAt?.toDate?.()?.toISOString?.() || '' })) as NewsArticle[];
  return items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export async function updateNews(id: string, updates: Partial<Omit<NewsArticle, 'id' | 'createdAt'>>) {
  const ref = doc(db, NEWS_COLLECTION, id);
  await updateDoc(ref, updates as any);
}

export async function deleteNews(id: string) {
  const ref = doc(db, NEWS_COLLECTION, id);
  await deleteDoc(ref);
}

export async function seedDemoNews(count: number = 3) {
  const samples = Array.from({ length: count }).map((_, i) => ({
    title: `خبر تجريبي رقم ${i + 1}`,
    content: `هذا محتوى تجريبي لخبر رقم ${i + 1}. يمكنك تعديل هذا المحتوى لاحقاً أو حذفه.`,
    coverImageUrl: '',
    tags: ['تجريبي', 'ذكاء اصطناعي'],
    authorId: 'demo',
    authorEmail: 'demo@example.com',
    status: 'published' as const,
    createdAt: serverTimestamp(),
  }));

  for (const sample of samples) {
    await addDoc(collection(db, NEWS_COLLECTION), sample as any);
  }
}


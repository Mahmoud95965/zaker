import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const updatedTools = [
  {
    id: '001',
    name: 'ChatGPT',
    description: 'توليد نصوص ذكي ومتعدد الاستخدامات من OpenAI.',
    longDescription: `ChatGPT هو نموذج ذكاء اصطناعي متقدم من OpenAI متخصص في فهم اللغة الطبيعية وتوليد النصوص بجودة عالية. يمكن استخدامه في كتابة المقالات، صياغة الرسائل، توليد الأفكار الإبداعية، والتحليل اللغوي. يوفر واجهة دردشة بسيطة وسهلة الاستخدام تدعم العديد من اللغات.`,
    category: 'Writing',
    tags: ['توليد النصوص', 'الدردشة', 'الإبداع'],
    url: 'https://chat.openai.com/',
    imageUrl: 'https://i.imgur.com/qxRN2vD.png',
    pricing: 'Freemium',
    features: ['دعم متعدد اللغات', 'اقتراحات إبداعية', 'تحسين الأسلوب والقواعد', 'توليد مخططات ونقاط رئيسية'],
    rating: 4.8,
    reviewCount: 15234,
    isNew: false,
    isFeatured: true,
    isPopular: true
  },
  // ...the rest of the tools (tools 2-12)
];

// Update tools in Firestore
const updateFirestoreTools = async () => {
  try {
    console.log('بدء تحديث الأدوات...');
    const toolsRef = collection(db, 'tools');
    
    for (const tool of updatedTools) {
      const toolDoc = doc(toolsRef, tool.id);
      await setDoc(toolDoc, {
        ...tool,
        updatedAt: new Date().toISOString()
      });
      console.log(`✓ تم تحديث: ${tool.name}`);
    }
    
    console.log('✨ تم تحديث جميع الأدوات بنجاح');
  } catch (error) {
    console.error('❌ حدث خطأ أثناء تحديث الأدوات:', error);
    process.exit(1);
  }
};

// Run the update
updateFirestoreTools().then(() => process.exit(0));

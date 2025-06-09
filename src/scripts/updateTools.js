const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDgTnOb1Wiu-964QaV2Q1oxLYgWLJkqFsQ",
  authDomain: "zakerly0.firebaseapp.com",
  databaseURL: "https://zakerly0-default-rtdb.firebaseio.com",
  projectId: "zakerly0",
  storageBucket: "zakerly0.firebasestorage.app",
  messagingSenderId: "718838819739",
  appId: "1:718838819739:web:fb0c10967caeaee59d4f3e",
  measurementId: "G-TVZZCE0TF2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const updatedTools = [
  {
    id: '001',
    name: 'ChatGPT',
    description: 'توليد نصوص ذكي ومتعدد الاستخدامات من OpenAI.',
    longDescription: `ChatGPT هو نموذج ذكاء اصطناعي متقدم من OpenAI متخصص في فهم اللغة الطبيعية وتوليد النصوص بجودة عالية. يمكن استخدامه في كتابة المقالات، صياغة الرسائل، توليد الأفكار الإبداعية، والتحليل اللغوي.`,
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
  // Add remaining tools here...
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

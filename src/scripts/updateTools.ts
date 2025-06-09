import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Tool data structure
interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  url: string;
  imageUrl: string;
  pricing: string;
  features: string[];
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isFeatured: boolean;
  isPopular: boolean;
}

// Using db from firebase config

const updatedTools: Tool[] = [
  {
    id: '001',
    name: 'ChatGPT',
    description: 'توليد نصوص ذكي ومتعدد الاستخدامات من OpenAI.',
    longDescription: `ChatGPT هو نموذج ذكاء اصطناعي متقدم من OpenAI متخصص في فهم اللغة الطبيعية وتوليد النصوص بجودة عالية. يمكن استخدامه في كتابة المقالات، صياغة الرسائل، توليد الأفكار الإبداعية، والتحليل اللغوي. يوفر واجهة دردشة بسيطة وسهلة الاستخدام تدعم العديد من اللغات.`,
    category: 'Writing',
    tags: ['توليد النصوص', 'الدردشة', 'الإبداع'],
    url: 'https://chat.openai.com/',
    imageUrl: 'https://i.imgur.com/qxRN2vD.png', // شعار ChatGPT
    pricing: 'Freemium',
    features: ['دعم متعدد اللغات', 'اقتراحات إبداعية', 'تحسين الأسلوب والقواعد', 'توليد مخططات ونقاط رئيسية'],
    rating: 4.8,
    reviewCount: 15234,
    isNew: false,
    isFeatured: true,
    isPopular: true
  },
  {
    id: '002',
    name: 'Google Gemini',
    description: 'مساعد ذكي متعدد المهام من Google.',
    longDescription: `Google Gemini هو مساعد ذكي متقدم من Google يستخدم تقنيات التعلم العميق لفهم السياق وتنفيذ المهام المتعددة. يمكنه تلخيص النصوص، الإجابة عن الأسئلة، إنشاء المحتوى، والترجمة بسلاسة عالية.`,
    category: 'Other',
    tags: ['مساعد ذكي', 'تلخيص', 'ترجمة'],
    url: 'https://gemini.google.com/',
    imageUrl: 'https://i.imgur.com/2JwpZP9.png', // شعار Gemini
    pricing: 'Freemium',
    features: ['تكامل مع خدمات Google', 'تلخيص احترافي', 'إجابات دقيقة', 'دعم متعدد اللغات'],
    rating: 4.6,
    reviewCount: 8321,
    isNew: true,
    isFeatured: true,
    isPopular: true
  },
  {
    id: '003',
    name: 'Claude',
    description: 'نموذج ذكاء اصطناعي آمن ودقيق من Anthropic.',
    longDescription: `Claude هو نموذج ذكاء اصطناعي مطور من Anthropic مصمم لتوفير إجابات دقيقة وآمنة. يتميز بقدرته على معالجة النصوص الطويلة وتقديم ملخصات واضحة وموثوقة.`,
    category: 'Other',
    tags: ['السلامة', 'الدقة', 'الملخصات'],
    url: 'https://www.anthropic.com/claude',
    imageUrl: 'https://i.imgur.com/QY1oKUV.png', // شعار Claude
    pricing: 'Paid',
    features: ['معايير أمان عالية', 'دقة في الإجابات', 'معالجة النصوص الطويلة', 'ملخصات موثوقة'],
    rating: 4.5,
    reviewCount: 5620,
    isNew: true,
    isFeatured: true,
    isPopular: false
  },
  {
    id: '004',
    name: 'DALL·E',
    description: 'توليد صور من نصوص بواسطة OpenAI.',
    longDescription: `DALL·E هو نموذج توليد صور متقدم من OpenAI يحول الأوصاف النصية إلى صور عالية الدقة. يمكنه إنشاء مشاهد فنية، تصاميم، ورسومات توضيحية متنوعة.`,
    category: 'Other',
    tags: ['توليد الصور', 'الرسم النصي', 'التصميم'],
    url: 'https://openai.com/dall-e-2/',
    imageUrl: 'https://i.imgur.com/kSlMbRm.png', // شعار DALL·E
    pricing: 'Paid',
    features: ['تحكم في الأسلوب الفني', 'دقة عالية', 'توليد متعدد', 'تنقيح النتائج'],
    rating: 4.7,
    reviewCount: 12045,
    isNew: false,
    isFeatured: true,
    isPopular: true
  },
  {
    id: '005',
    name: 'Midjourney',
    description: 'إنشاء صور فنية وإبداعية باستخدام الذكاء الاصطناعي.',
    longDescription: `Midjourney هي منصة متخصصة في توليد الصور الفنية والإبداعية بناءً على الأوصاف النصية. تتميز بأسلوبها الفني الفريد وقدرتها على إنتاج تصاميم جذابة.`,
    category: 'Other',
    tags: ['فن رقمي', 'الإبداع', 'توليد الصور'],
    url: 'https://www.midjourney.com/',
    imageUrl: 'https://i.imgur.com/K6zGjbn.png', // شعار Midjourney
    pricing: 'Subscription',
    features: ['أساليب فنية متنوعة', 'واجهة تفاعلية', 'معاينة فورية', 'مشاركة المجتمع'],
    rating: 4.8,
    reviewCount: 9800,
    isNew: false,
    isFeatured: true,
    isPopular: true
  },
  {
    id: '006',
    name: 'Runway ML',
    description: 'أدوات تحرير فيديو بالذكاء الاصطناعي.',
    longDescription: `Runway ML يوفر مجموعة متكاملة من أدوات تحرير الفيديو المدعومة بالذكاء الاصطناعي. يتيح التتبع التلقائي، إزالة الخلفية، وإضافة تأثيرات متقدمة.`,
    category: 'Other',
    tags: ['تحرير الفيديو', 'التأثيرات البصرية', 'الذكاء الاصطناعي'],
    url: 'https://runwayml.com/',
    imageUrl: 'https://i.imgur.com/x2YPVlM.png', // شعار Runway
    pricing: 'Freemium',
    features: ['إزالة الخلفية', 'تتبع الكائنات', 'توليد التأثيرات', 'تحرير نصي'],
    rating: 4.5,
    reviewCount: 6742,
    isNew: true,
    isFeatured: false,
    isPopular: true
  },
  {
    id: '007',
    name: 'Grammarly',
    description: 'تدقيق وتحسين القواعد والأسلوب اللغوي.',
    longDescription: `Grammarly هو مساعد كتابة ذكي يكتشف الأخطاء النحوية والإملائية ويقترح تحسينات للأسلوب. يدعم العديد من المنصات والتطبيقات.`,
    category: 'Writing',
    tags: ['تدقيق لغوي', 'تحسين الكتابة', 'قواعد'],
    url: 'https://www.grammarly.com/',
    imageUrl: 'https://i.imgur.com/xN3NR3X.png', // شعار Grammarly
    pricing: 'Freemium',
    features: ['تدقيق نحوي وإملائي', 'اقتراحات الأسلوب', 'كشف الانتحال', 'إضافات للمتصفح'],
    rating: 4.7,
    reviewCount: 15432,
    isNew: false,
    isFeatured: true,
    isPopular: true
  },
  {
    id: '008',
    name: 'Notion AI',
    description: 'تنظيم الملاحظات وإدارة المشاريع باستخدام الذكاء الاصطناعي.',
    longDescription: `Notion AI يدمج الذكاء الاصطناعي في منصة Notion لتحسين تنظيم الملاحظات وإدارة المشاريع. يساعد في توليد المحتوى وتنظيم المعلومات.`,
    category: 'Productivity',
    tags: ['إنتاجية', 'تنظيم', 'إدارة المشاريع'],
    url: 'https://www.notion.so/product/ai',
    imageUrl: 'https://i.imgur.com/UQxBxmY.png', // شعار Notion AI
    pricing: 'Subscription',
    features: ['توليد المحتوى', 'تنظيم تلقائي', 'تحليل البيانات', 'قوالب ذكية'],
    rating: 4.6,
    reviewCount: 8320,
    isNew: true,
    isFeatured: true,
    isPopular: true
  },
  {
    id: '009',
    name: 'Jasper AI',
    description: 'إنشاء محتوى تسويقي وإعلاني.',
    longDescription: `Jasper AI متخصص في إنشاء محتوى تسويقي احترافي. يوفر قوالب متنوعة ويدعم إنشاء محتوى للمنصات المختلفة بأساليب مخصصة.`,
    category: 'Writing',
    tags: ['تسويق', 'محتوى', 'إعلانات'],
    url: 'https://www.jasper.ai/',
    imageUrl: 'https://i.imgur.com/d4K6JJ7.png', // شعار Jasper
    pricing: 'Subscription',
    features: ['قوالب متخصصة', 'توليد محتوى', 'تخصيص الأسلوب', 'دعم متعدد اللغات'],
    rating: 4.5,
    reviewCount: 7410,
    isNew: false,
    isFeatured: true,
    isPopular: true
  },
  {
    id: '010',
    name: 'Synthesia',
    description: 'توليد فيديوهات بالذكاء الاصطناعي مع شخصيات افتراضية.',
    longDescription: `Synthesia يمكّن من إنشاء فيديوهات احترافية باستخدام متحدثين افتراضيين. مثالي للتدريب والتسويق وإنشاء المحتوى التعليمي.`,
    category: 'Other',
    tags: ['فيديو', 'شخصيات افتراضية', 'تدريب'],
    url: 'https://www.synthesia.io/',
    imageUrl: 'https://i.imgur.com/jL2Tb4K.png', // شعار Synthesia
    pricing: 'Subscription',
    features: ['متحدثون افتراضيون', 'ترجمة تلقائية', 'تخصيص المحتوى', 'جودة عالية'],
    rating: 4.4,
    reviewCount: 5234,
    isNew: true,
    isFeatured: false,
    isPopular: false
  },
  {
    id: '011',
    name: 'Descript',
    description: 'تحرير صوت وفيديو مدعوم بالذكاء الاصطناعي.',
    longDescription: `Descript يقدم طريقة مبتكرة لتحرير الصوت والفيديو من خلال تحرير النص. يوفر أدوات متقدمة لتحسين جودة الصوت وإنتاج محتوى احترافي.`,
    category: 'Other',
    tags: ['تحرير صوت', 'تحرير فيديو', 'بودكاست'],
    url: 'https://www.descript.com/',
    imageUrl: 'https://i.imgur.com/XHkGg6W.png', // شعار Descript
    pricing: 'Freemium',
    features: ['تحرير عبر النص', 'تحسين الصوت', 'إزالة الضوضاء', 'أدوات احترافية'],
    rating: 4.6,
    reviewCount: 6890,
    isNew: false,
    isFeatured: true,
    isPopular: true
  },
  {
    id: '012',
    name: 'Copy.ai',
    description: 'إنشاء نصوص تسويقية وإبداعية بسرعة.',
    longDescription: `Copy.ai يساعد في إنشاء محتوى تسويقي إبداعي بسرعة وسهولة. يوفر أدوات متخصصة لكتابة العناوين، الوصف، ومحتوى وسائل التواصل الاجتماعي.`,
    category: 'Writing',
    tags: ['تسويق', 'محتوى', 'وسائل التواصل'],
    url: 'https://www.copy.ai/',
    imageUrl: 'https://i.imgur.com/LNtxpK7.png', // شعار Copy.ai
    pricing: 'Freemium',
    features: ['توليد محتوى سريع', 'قوالب متنوعة', 'تخصيص الأسلوب', 'دعم متعدد اللغات'],
    rating: 4.5,
    reviewCount: 6145,
    isNew: true,
    isFeatured: false,
    isPopular: true
  }
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
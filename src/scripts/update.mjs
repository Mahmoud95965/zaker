import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUiSuip8Mu7W8XAx9Zr-pZIdMYiVOl6mU",
  authDomain: "zakerly-demo.firebaseapp.com",
  projectId: "zakerly-demo",
  storageBucket: "zakerly-demo.appspot.com",
  messagingSenderId: "1011226971717",
  appId: "1:1011226971717:web:254ece2d112b8615750b01",
  measurementId: "G-5ZN6JCRZJY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const updatedTools = [
  {
    id: "001",
    name: "ChatGPT",
    description: "توليد نصوص ذكي ومتعدد الاستخدامات من OpenAI.",
    longDescription: "ChatGPT هو نموذج ذكاء اصطناعي متقدم من OpenAI متخصص في فهم اللغة الطبيعية وتوليد النصوص بجودة عالية. يمكن استخدامه في كتابة المقالات صياغة الرسائل توليد الأفكار الإبداعية والتحليل اللغوي. يوفر واجهة دردشة بسيطة وسهلة الاستخدام تدعم العديد من اللغات.",
    category: "Writing",
    tags: ["توليد النصوص", "الدردشة", "الإبداع"],
    url: "https://chat.openai.com/",
    imageUrl: "/image/1.svg",
    pricing: "Freemium",
    features: ["دعم متعدد اللغات", "اقتراحات إبداعية", "تحسين الأسلوب والقواعد", "توليد مخططات ونقاط رئيسية"],
    rating: 4.8,
    reviewCount: 15234,
    isNew: false,
    isFeatured: true,
    isPopular: true
  },
  {
    id: "002",
    name: "Google Gemini",
    description: "Gemini هي أداة ذكاء اصطناعي متعددة الاستخدامات من Google.",
    longDescription: "Gemini هي منصة ذكاء اصطناعي متقدمة من Google مصممة لتقديم مساعد ذكي ومتعدد المهام.",
    category: "Other",
    tags: ["مساعد ذكي", "تلخيص", "ترجمة"],
    url: "https://gemini.google.com/",
    imageUrl: "/image/2.png",
    pricing: "Freemium",
    features: ["تكامل مع خدمات Google", "تلخيص احترافي", "إجابات دقيقة", "دعم متعدد اللغات"],
    rating: 4.6,
    reviewCount: 8321,
    isNew: false,
    isFeatured: true,
    isPopular: true
  },
  {
    id: "003",
    name: "Claude",
    description: "نموذج ذكاء اصطناعي آمن ودقيق من Anthropic.",
    longDescription: "Claude هو أداة ذكاء اصطناعي متطورة طورتها شركة Anthropic.",
    category: "Other",
    tags: ["السلامة", "الدقة", "الملخصات"],
    url: "https://www.anthropic.com/claude",
    imageUrl: "/image/3.png",
    pricing: "Paid",
    features: ["معايير أمان عالية", "دقة في الإجابات", "معالجة النصوص الطويلة", "ملخصات موثوقة"],
    rating: 4.4,
    reviewCount: 4520,
    isNew: true,
    isFeatured: false,
    isPopular: false
  },
  {
    id: "004",
    name: "DALLE",
    description: "توليد صور من نصوص بواسطة OpenAI.",
    longDescription: "DALLE هو نموذج توليد صور متقدم من OpenAI يحول الأوصاف النصية إلى صور عالية الدقة.",
    category: "Other",
    tags: ["توليد الصور", "الرسم النصي", "التصميم"],
    url: "https://openai.com/dall-e-2/",
    imageUrl: "/image/4.png",
    pricing: "Paid",
    features: ["تحكم في الأسلوب الفني", "دقة عالية", "توليد متعدد", "تنقيح النتائج"],
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
      longDescription: `Midjourney هي منصة متخصصة في توليد الصور الفنية والإبداعية بناءً على الأوصاف النصية. تتميز بأسلوبها الفني الفريد وقدرتها على إنتاج تصاميم جذابة ومتنوعة تناسب المشاريع الإبداعية.` ,
      category: 'Other',
      tags: ['فن رقمي', 'الإبداع', 'توليد الصورة'],
      url: 'https://midjourney.com/',
      imageUrl: "/image/5.png",
      pricing: 'Subscription',
      features: ['أساليب فنية متنوعة', 'واجهة تفاعلية', 'معاينة فورية', 'مشاركة المجتمع'],
      rating: 0,
      reviewCount: 0,
      isNew: false,
      isFeatured: true,
      isPopular: true
    },

      {
        id: '006',
        name: 'Runway ML',
        description: 'أدوات تحرير فيديو بالذكاء الاصطناعي.',
        longDescription: `Runway ML توفر مجموعة من الأدوات المدعومة بالذكاء الاصطناعي لتحرير الفيديو، بما في ذلك التتبع التلقائي، إزالة الخلفية، وتوليد التأثيرات البصرية. مناسبة للمحترفين والمبتدئين على حد سواء لإنشاء محتوى جذاب بسرعة.` ,
        category: 'Other',
        tags: ['تحرير الفيديو', 'التأثيرات البصرية', 'الذكاء الاصطناعي'],
        url: 'https://runwayml.com/',
        imageUrl: '/image/6.png',
        pricing: 'Freemium',
        features: ['إزالة الخلفية', 'تتبع الكائنات', 'توليد التأثيرات', 'تحرير نصي'],
        rating: 5,
        reviewCount: 10000,
        isNew: true,
        isFeatured: true,
        isPopular: false
      },
      {
          id: '007',
          name: 'Grammarly',
          description: 'تدقيق وتحسين القواعد والأسلوب اللغوي.',
          longDescription: `Grammarly هو مساعد الكتابة الذي يكتشف الأخطاء النحوية والإملائية ويقدم اقتراحات لتحسين الأسلوب والمفردات. يدعم العديد من المنصات بما في ذلك المتصفح وبرامج تحرير النصوص.` ,
          category: 'Writing',
          tags: ['قواعد', 'إملاء', 'أسلوب'],
          url: 'https://www.grammarly.com/',
          imageUrl: '/image/7.1.png',
          pricing: 'Freemium',
          features: ['تدقيق نحوي وإملائي', 'اقتراحات الأسلوب', 'كشف الانتحال', 'إضافات للمتصفح'],
          rating: 0,
          reviewCount: 0,
          isNew: false,
          isFeatured: true,
          isPopular: true
        },
        {
            id: '008',
            name: 'Notion AI',
            description: 'تنظيم الملاحظات وإدارة المشاريع باستخدام الذكاء الاصطناعي.',
            longDescription: `Notion AI مدمج داخل Notion لتسريع عملية الكتابة والتنظيم. يمكنه توليد ملخصات، اقتراح مهام، وتحليل البيانات المضافة داخل قواعد البيانات لجعل إدارة المشاريع أكثر كفاءة.` ,
            category: 'Productivity',
            tags: ['إنتاجية', 'تنظيم', 'كتابة الملاحظات'],
            url: 'https://www.notion.so/product/ai',
            imageUrl: '/image/8.png',
            pricing: 'Subscription',
            features: ['توليد الملخصات', 'اقتراح المهام', 'تحليل البيانات', 'دعم قواعد البيانات'],
            rating: 4.6,
            reviewCount: 8320,
            isNew: true,
            isFeatured: false,
            isPopular: true
          },

            {
              id: '009',
              name: 'Jasper AI',
              description: 'إنشاء محتوى تسويقي وإعلاني.',
              longDescription: `Jasper AI هو أداة لإنشاء محتوى تسويقي وإعلاني بسرعة وكفاءة. يوفر قوالب جاهزة للشبكات الاجتماعية، المدونات، والبريد الإلكتروني مع إمكانية تخصيص الأسلوب والنبرة.` ,
              category: 'Writing',
              tags: ['التسويق', 'الإعلانات', 'المحتوى'],
              url: 'https://www.jasper.ai/',
              imageUrl: '/image/9.png',
              pricing: 'Subscription',
              features: ['قوالب تسويقية', 'ضبط النبرة', 'الكتابة التعاونية', 'تكامل مع CMS'],
              rating: 0,
              reviewCount: 0,
              isNew: false,
              isFeatured: false,
              isPopular: true
            },

           {
           id: '010',
    name: 'Synthesia',
    description: 'توليد فيديوهات بالذكاء الاصطناعي مع شخصيات افتراضية.',
    longDescription: `Synthesia يتيح إنشاء فيديوهات احترافية باستخدام شخصيات افتراضية تتحدث بلغات متعددة. مناسب لتوليد مقاطع تدريبية وتسويقية دون الحاجة لاستوديو تسجيل.` ,
    category: 'Other',
    tags: ['الفيديو', 'الشخصيات الافتراضية', 'التدريب'],
    url: 'https://www.synthesia.io/',
    imageUrl: '/image/10.png',
    pricing: 'Subscription',
    features: ['شخصيات متعددة', 'دعم لغات متعددة', 'نص إلى فيديو', 'تخصيص الخلفية'],
    rating: 0,
    reviewCount: 0,
    isNew: false,
    isFeatured: false,
    isPopular: false
  },

    {
      id: '011',
      name: 'Descript',
      description: 'تحرير صوت وفيديو مدعوم بالذكاء الاصطناعي.',
      longDescription: `Descript هو محرر وسائط يجمع بين تحرير الصوت والفيديو. يمكنه تفريغ الصوت للنص، إزالة الضوضاء، وتعديل مقاطع الفيديو عبر النص مباشرة.` ,
      category: 'Other',
      tags: ['تحرير صوتي', 'تحرير فيديو', 'تفريغ النص'],
      url: 'https://www.descript.com/',
      imageUrl: '/image/11.png',
      pricing: 'Freemium',
      features: ['تفريغ صوتي', 'إزالة الضوضاء', 'تحرير بالفيديو عبر النص', 'تصدير متعدد الصيغ'],
      rating: 0,
      reviewCount: 0,
      isNew: false,
      isFeatured: true,
      isPopular: true
    },

      {
        id: '012',
        name: 'Copy.ai',
        description: 'إنشاء نصوص تسويقية وإبداعية بسرعة.',
        longDescription: `Copy.ai يساعد على توليد نصوص تسويقية وإبداعية في ثوانٍ معدودة. يوفر قوالب متنوعة للمنشورات الاجتماعية، رسائل البريد الإلكتروني، والأفكار الإعلانية.` ,
        category: 'Writing',
        tags: ['التسويق', 'الإبداع', 'النصوص'],
        url: 'https://www.copy.ai/',
        imageUrl: '/image/12.png',
        pricing: 'Subscription',
        features: ['قوالب متعددة', 'توليد سريع', 'ضبط النبرة', 'تكاملات'],
        rating: 0,
        reviewCount: 0,
        isNew: false,
        isFeatured: false,
        isPopular: true
      }
];

const updateFirestoreTools = async () => {
  try {
    console.log("بدء تحديث الأدوات...");
    const toolsRef = collection(db, "tools");
    
    for (const tool of updatedTools) {
      const toolDoc = doc(toolsRef, tool.id);
      await setDoc(toolDoc, {
        ...tool,
        updatedAt: new Date().toISOString()
      });
      console.log(` تم تحديث: ${tool.name}`);
    }
    
    console.log(" تم تحديث جميع الأدوات بنجاح");
  } catch (error) {
    console.error(" حدث خطأ أثناء تحديث الأدوات:", error);
    process.exit(1);
  }
};

updateFirestoreTools().then(() => process.exit(0));

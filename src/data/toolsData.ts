import { Tool, ToolCategory, ToolPricing } from '../types/tool';

export const tools: Tool[] = [
  // Writing Tools (001-020)
  {
    id: '001',
    name: 'ChatGPT',
    description: 'توليد نصوص ذكي ومتعدد الاستخدامات من OpenAI.',
    longDescription: `ChatGPT هو نموذج ذكاء اصطناعي متقدم من OpenAI متخصص في فهم اللغة الطبيعية وتوليد النصوص بجودة عالية. يمكن استخدامه في كتابة المقالات، صياغة الرسائل، توليد الأفكار الإبداعية، والتحليل اللغوي. يوفر واجهة دردشة بسيطة وسهلة الاستخدام تدعم العديد من اللغات.`,
    category: 'Writing' as ToolCategory,
    tags: ['توليد النصوص', 'الدردشة', 'الإبداع'],
    url: 'https://chat.openai.com/',
    imageUrl: '/image/1.svg',
    pricing: 'Freemium' as ToolPricing,
    features: ['دعم متعدد اللغات', 'اقتراحات إبداعية', 'تحسين الأسلوب والقواعد', 'توليد مخططات ونقاط رئيسية'],
    rating: 4.8,
    reviewCount: 15234,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '002',
    name: 'Grammarly',
    description: 'تدقيق وتحسين القواعد والأسلوب اللغوي.',
    longDescription: `Grammarly هو مساعد الكتابة الذي يكتشف الأخطاء النحوية والإملائية ويقدم اقتراحات لتحسين الأسلوب والمفردات. يدعم العديد من المنصات بما في ذلك المتصفح وبرامج تحرير النصوص.`,
    category: 'Writing' as ToolCategory,
    tags: ['قواعد', 'إملاء', 'أسلوب'],
    url: 'https://www.grammarly.com/',
    imageUrl: '/image/7.png',
    pricing: 'Freemium' as ToolPricing,
    features: ['تدقيق نحوي وإملائي', 'اقتراحات الأسلوب', 'كشف الانتحال', 'إضافات للمتصفح'],
    rating: 4.8,
    reviewCount: 12500,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '003',
    name: 'Jasper AI',
    description: 'إنشاء محتوى تسويقي وإعلاني.',
    longDescription: `Jasper AI هو أداة لإنشاء محتوى تسويقي وإعلاني بسرعة وكفاءة. يوفر قوالب جاهزة للشبكات الاجتماعية، المدونات، والبريد الإلكتروني مع إمكانية تخصيص الأسلوب والنبرة.`,
    category: 'Writing' as ToolCategory,
    tags: ['التسويق', 'الإعلانات', 'المحتوى'],
    url: 'https://www.jasper.ai/',
    imageUrl: '/image/3.png',
    pricing: 'Subscription' as ToolPricing,
    features: ['قوالب تسويقية', 'ضبط النبرة', 'الكتابة التعاونية', 'تكامل مع CMS'],
    rating: 4.5,
    reviewCount: 5600,
    isNew: false,
    isFeatured: false,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '004',
    name: 'Copy.ai',
    description: 'إنشاء نصوص تسويقية وإبداعية بسرعة.',
    longDescription: `Copy.ai يساعد على توليد نصوص تسويقية وإبداعية في ثوانٍ معدودة. يوفر قوالب متنوعة للمنشورات الاجتماعية، رسائل البريد الإلكتروني، والأفكار الإعلانية.`,
    category: 'Writing' as ToolCategory,
    tags: ['التسويق', 'الإبداع', 'النصوص'],
    url: 'https://www.copy.ai/',
    imageUrl: '/image/4.png',
    pricing: 'Subscription' as ToolPricing,
    features: ['قوالب متعددة', 'توليد سريع', 'ضبط النبرة', 'تكاملات'],
    rating: 4.4,
    reviewCount: 2890,
    isNew: false,
    isFeatured: false,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },

  // AI Tools (005-020)
  {
    id: '005',
    name: 'Google Gemini',
    description: 'Gemini هي أداة ذكاء اصطناعي متعددة الاستخدامات من Google.',
    longDescription: `Gemini هي منصة ذكاء اصطناعي متقدمة من Google، مصممة لتقديم مساعد ذكي ومتعدد المهام. تمكِّن المستخدمين من توليد النصوص، تحليل البيانات، وإنشاء المحتوى بكفاءة عالية.`,
    category: 'Other' as ToolCategory,
    tags: ['مساعد ذكي', 'تلخيص', 'ترجمة'],
    url: 'https://gemini.google.com/',
    imageUrl: '/image/5.png',
    pricing: 'Freemium' as ToolPricing,
    features: ['تكامل مع خدمات Google', 'تلخيص احترافي', 'إجابات دقيقة', 'دعم متعدد اللغات'],
    rating: 4.7,
    reviewCount: 8321,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '006',
    name: 'Claude',
    description: 'Claude هو نموذج ذكاء اصطناعي متقدم من Anthropic.',
    longDescription: `Claude هو أداة ذكاء اصطناعي متطورة تركز على تقديم تجربة تفاعلية آمنة وأخلاقية. يتميز بدقته العالية وقدرته على فهم السياق بشكل عميق.`,
    category: 'Other' as ToolCategory,
    tags: ['السلامة', 'الدقة', 'الملخصات'],
    url: 'https://www.anthropic.com/claude',
    imageUrl: '/image/6.png',
    pricing: 'Paid' as ToolPricing,
    features: ['معايير أمان عالية', 'دقة في الإجابات', 'معالجة النصوص الطويلة', 'ملخصات موثوقة'],
    rating: 4.4,
    reviewCount: 4520,
    isNew: true,
    isFeatured: false,
    isPopular: false,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '007',
    name: 'Midjourney',
    description: 'توليد صور إبداعية باستخدام الذكاء الاصطناعي.',
    longDescription: `Midjourney هو أداة متقدمة لتوليد الصور باستخدام الذكاء الاصطناعي. يمكنه تحويل النصوص إلى صور فنية مذهلة بجودة عالية.`,
    category: 'Other' as ToolCategory,
    tags: ['توليد صور', 'فن', 'تصميم'],
    url: 'https://www.midjourney.com/',
    imageUrl: '/image/7.png',
    pricing: 'Paid' as ToolPricing,
    features: ['توليد صور عالية الجودة', 'تحكم دقيق', 'تنوع الأساليب', 'دعم مجتمعي'],
    rating: 4.7,
    reviewCount: 15000,
    isNew: true,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '008',
    name: 'DALL-E',
    description: 'منصة OpenAI لتوليد وتحرير الصور.',
    longDescription: `DALL-E هو نموذج ذكاء اصطناعي من OpenAI لتوليد وتحرير الصور بناءً على الوصف النصي. يتميز بقدرته على فهم التفاصيل الدقيقة.`,
    category: 'Other' as ToolCategory,
    tags: ['توليد صور', 'تحرير صور', 'فن رقمي'],
    url: 'https://openai.com/dall-e-3',
    imageUrl: '/image/8.png',
    pricing: 'Paid' as ToolPricing,
    features: ['توليد صور واقعية', 'تحرير ذكي', 'تنوع الأنماط', 'دقة عالية'],
    rating: 4.8,
    reviewCount: 12000,
    isNew: true,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '009',
    name: 'Stable Diffusion',
    description: 'نموذج مفتوح المصدر لتوليد الصور.',
    longDescription: `Stable Diffusion هو نموذج مفتوح المصدر لتوليد الصور يمكن تشغيله محلياً. يتميز بمرونته وقابليته للتخصيص.`,
    category: 'Other' as ToolCategory,
    tags: ['توليد صور', 'مفتوح المصدر', 'تخصيص'],
    url: 'https://stability.ai/',
    imageUrl: '/image/9.png',
    pricing: 'Free' as ToolPricing,
    features: ['تشغيل محلي', 'تخصيص كامل', 'مجتمع نشط', 'تحديثات مستمرة'],
    rating: 4.6,
    reviewCount: 8000,
    isNew: true,
    isFeatured: false,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '010',
    name: 'GitHub Copilot',
    description: 'مساعد برمجة ذكي من GitHub و OpenAI.',
    longDescription: `GitHub Copilot هو مساعد برمجة يستخدم الذكاء الاصطناعي لاقتراح الكود وإكمال الأكواد البرمجية تلقائياً.`,
    category: 'Other' as ToolCategory,
    tags: ['برمجة', 'أتمتة', 'إنتاجية'],
    url: 'https://github.com/features/copilot',
    imageUrl: '/image/10.png',
    pricing: 'Subscription' as ToolPricing,
    features: ['اقتراح الكود', 'إكمال تلقائي', 'دعم متعدد اللغات', 'تكامل مع IDE'],
    rating: 4.9,
    reviewCount: 25000,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },

  // Research Tools (021-035)
  {
    id: '021',
    name: 'Perplexity AI',
    description: 'محرك بحث ذكي مدعوم بالذكاء الاصطناعي.',
    longDescription: `Perplexity AI هو محرك بحث متقدم يستخدم الذكاء الاصطناعي لتقديم إجابات دقيقة ومفصلة مع مصادر موثوقة.`,
    category: 'Research' as ToolCategory,
    tags: ['بحث', 'مصادر', 'معلومات'],
    url: 'https://www.perplexity.ai/',
    imageUrl: '/image/21.png',
    pricing: 'Freemium' as ToolPricing,
    features: ['بحث ذكي', 'مصادر موثوقة', 'ملخصات فورية', 'تحديث مستمر'],
    rating: 4.5,
    reviewCount: 8900,
    isNew: true,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '022',
    name: 'Consensus',
    description: 'البحث في الأوراق العلمية والدراسات الأكاديمية.',
    longDescription: `Consensus هو محرك بحث متخصص في الأوراق العلمية والدراسات الأكاديمية. يستخدم الذكاء الاصطناعي لتحليل الدراسات وتقديم إجابات مبنية على الأدلة العلمية.`,
    category: 'Research' as ToolCategory,
    tags: ['بحث علمي', 'دراسات أكاديمية', 'أوراق بحثية'],
    url: 'https://consensus.app/',
    imageUrl: '/image/22.png',
    pricing: 'Freemium' as ToolPricing,
    features: ['بحث في الأوراق العلمية', 'تحليل الدراسات', 'إجابات مبنية على أدلة', 'ملخصات البحوث'],
    rating: 4.3,
    reviewCount: 1200,
    isNew: true,
    isFeatured: true,
    isPopular: false,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '023',
    name: 'Connected Papers',
    description: 'اكتشاف وتنظيم الأوراق البحثية المترابطة.',
    longDescription: `Connected Papers يساعد الباحثين في اكتشاف الأوراق البحثية المترابطة وفهم العلاقات بينها. يقدم تمثيلاً بصرياً لشبكة الأبحاث المتصلة.`,
    category: 'Research' as ToolCategory,
    tags: ['بحث أكاديمي', 'شبكة الأبحاث', 'تنظيم المراجع'],
    url: 'https://www.connectedpapers.com/',
    imageUrl: '/image/23.png',
    pricing: 'Free' as ToolPricing,
    features: ['تمثيل بصري', 'اكتشاف الأبحاث', 'تتبع الاستشهادات', 'تصدير المراجع'],
    rating: 4.2,
    reviewCount: 2100,
    isNew: false,
    isFeatured: false,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '024',
    name: 'ResearchGate',
    description: 'شبكة اجتماعية للباحثين والأكاديميين.',
    longDescription: `ResearchGate هي منصة تواصل اجتماعي للباحثين تتيح مشاركة الأبحاث والتعاون العلمي. توفر وصولاً لملايين الأوراق البحثية والتواصل مع الباحثين.`,
    category: 'Research' as ToolCategory,
    tags: ['بحث علمي', 'تواصل أكاديمي', 'نشر أبحاث'],
    url: 'https://www.researchgate.net/',
    imageUrl: '/image/24.png',
    pricing: 'Free' as ToolPricing,
    features: ['مشاركة الأبحاث', 'تواصل مع الباحثين', 'متابعة الاستشهادات', 'نقاشات علمية'],
    rating: 4.4,
    reviewCount: 50000,
    isNew: false,
    isFeatured: false,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '025',
    name: 'Mendeley',
    description: 'إدارة المراجع والاستشهادات البحثية.',
    longDescription: `Mendeley هو برنامج لإدارة المراجع العلمية يساعد الباحثين في تنظيم وإدارة مكتبتهم البحثية. يوفر أدوات للاستشهاد وتنسيق المراجع.`,
    category: 'Research' as ToolCategory,
    tags: ['إدارة مراجع', 'استشهادات', 'تنظيم أبحاث'],
    url: 'https://www.mendeley.com/',
    imageUrl: '/image/25.png',
    pricing: 'Freemium' as ToolPricing,
    features: ['تنظيم المراجع', 'توليد الاستشهادات', 'مزامنة عبر الأجهزة', 'تعاون بحثي'],
    rating: 4.5,
    reviewCount: 35000,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },

  // Language Learning Tools (056-065)
  {
    id: '056',
    name: 'Duolingo',
    description: 'تعلم اللغات بطريقة تفاعلية وممتعة.',
    longDescription: `Duolingo هو تطبيق تعليم اللغات الأكثر شعبية في العالم. يقدم دروساً تفاعلية قصيرة تجعل تعلم اللغات أمراً ممتعاً وفعالاً من خلال الألعاب والتحديات.`,
    category: 'Language Learning' as ToolCategory,
    tags: ['تعلم اللغات', 'تفاعلي', 'ألعاب تعليمية'],
    url: 'https://www.duolingo.com/',
    imageUrl: '/image/56.png',
    pricing: 'Freemium' as ToolPricing,
    features: ['دروس تفاعلية', 'متابعة التقدم', 'تذكيرات يومية', 'مجتمع متعلمين'],
    rating: 4.7,
    reviewCount: 250000,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '057',
    name: 'Busuu',
    description: 'تعلم اللغات مع متحدثين أصليين.',
    longDescription: `Busuu يجمع بين الدروس المنظمة والتفاعل مع متحدثين أصليين. يوفر خطط تعلم مخصصة ودروس في النحو والمفردات مع تصحيح من المجتمع.`,
    category: 'Language Learning' as ToolCategory,
    tags: ['تعلم اللغات', 'محادثة', 'تصحيح لغوي'],
    url: 'https://www.busuu.com/',
    imageUrl: '/image/57.png',
    pricing: 'Freemium' as ToolPricing,
    features: ['تعلم مع متحدثين أصليين', 'خطط مخصصة', 'شهادات معتمدة', 'تمارين تفاعلية'],
    rating: 4.5,
    reviewCount: 120000,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '058',
    name: 'Rosetta Stone',
    description: 'برنامج شامل لتعلم اللغات.',
    longDescription: `Rosetta Stone هو برنامج متكامل لتعلم اللغات يستخدم تقنيات متقدمة للتعرف على الصوت والنطق. يوفر دروساً تفاعلية ومحادثات واقعية.`,
    category: 'Language Learning' as ToolCategory,
    tags: ['تعلم لغات', 'نطق', 'محادثة'],
    url: 'https://www.rosettastone.com/',
    imageUrl: '/image/58.png',
    pricing: 'Subscription' as ToolPricing,
    features: ['دروس تفاعلية', 'تقنية التعرف على النطق', 'محادثات واقعية', 'تطبيقات متعددة'],
    rating: 4.3,
    reviewCount: 85000,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },

  // Productivity Tools (066-075)
  {
    id: '066',
    name: 'Notion',
    description: 'منصة شاملة للملاحظات وإدارة المشاريع.',
    longDescription: `Notion هو تطبيق متكامل يجمع بين الملاحظات، إدارة المهام، قواعد البيانات، والتعاون. يمكن تخصيصه بشكل كامل ليناسب مختلف أساليب العمل والتنظيم.`,
    category: 'Productivity' as ToolCategory,
    tags: ['تنظيم', 'إدارة المشاريع', 'ملاحظات'],
    url: 'https://www.notion.so/',
    imageUrl: '/image/66.png',
    pricing: 'Freemium' as ToolPricing,
    features: ['ملاحظات منظمة', 'قواعد بيانات', 'نماذج قابلة للتخصيص', 'تعاون فريق'],
    rating: 4.8,
    reviewCount: 180000,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '067',
    name: 'Todoist',
    description: 'تطبيق إدارة المهام والمشاريع الشخصية.',
    longDescription: `Todoist هو تطبيق بسيط وقوي لإدارة المهام اليومية والمشاريع. يتميز بواجهة نظيفة وميزات ذكية لتنظيم وتتبع المهام.`,
    category: 'Productivity' as ToolCategory,
    tags: ['إدارة المهام', 'تنظيم', 'مواعيد'],
    url: 'https://todoist.com/',
    imageUrl: '/image/67.png',
    pricing: 'Freemium' as ToolPricing,
    features: ['تنظيم المهام', 'تذكيرات', 'أولويات', 'مشاريع متعددة'],
    rating: 4.6,
    reviewCount: 150000,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },

  // Studying Tools (076-085)
  {
    id: '076',
    name: 'Anki',
    description: 'بطاقات الذاكرة للحفظ والمراجعة.',
    longDescription: `Anki هو نظام بطاقات ذاكرة يستخدم خوارزمية التكرار المتباعد لتحسين الحفظ والاستذكار. مفيد جداً للطلاب الذين يحتاجون لحفظ معلومات كثيرة.`,
    category: 'Studying' as ToolCategory,
    tags: ['بطاقات ذاكرة', 'حفظ', 'مراجعة'],
    url: 'https://apps.ankiweb.net/',
    imageUrl: '/image/76.png',
    pricing: 'Free' as ToolPricing,
    features: ['بطاقات ذاكرة', 'تكرار متباعد', 'إحصائيات التقدم', 'مشاركة البطاقات'],
    rating: 4.7,
    reviewCount: 25000,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '077',
    name: 'Quizlet',
    description: 'إنشاء بطاقات تعليمية واختبارات.',
    longDescription: `Quizlet يساعد الطلاب على إنشاء بطاقات تعليمية واختبارات تفاعلية. يوفر عدة أنماط للدراسة والمراجعة مما يجعل التعلم أكثر متعة وفعالية.`,
    category: 'Studying' as ToolCategory,
    tags: ['بطاقات تعليمية', 'اختبارات', 'مراجعة'],
    url: 'https://quizlet.com/',
    imageUrl: '/image/77.png',
    pricing: 'Freemium' as ToolPricing,
    features: ['بطاقات تفاعلية', 'اختبارات متنوعة', 'ألعاب تعليمية', 'مشاركة المحتوى'],
    rating: 4.4,
    reviewCount: 180000,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },

  // Test Prep Tools (086-090)
  {
    id: '086',
    name: 'Khan Academy',
    description: 'تعليم مجاني شامل لجميع المستويات.',
    longDescription: `Khan Academy توفر تعليم مجاني عالي الجودة لأي شخص في أي مكان. تشمل دروس في الرياضيات، العلوم، التاريخ، والعديد من المواضيع الأخرى مع تمارين تفاعلية.`,
    category: 'Test Prep' as ToolCategory,
    tags: ['تعليم مجاني', 'شامل', 'تمارين تفاعلية'],
    url: 'https://www.khanacademy.org/',
    imageUrl: '/image/86.png',
    pricing: 'Free' as ToolPricing,
    features: ['محتوى شامل', 'تمارين تفاعلية', 'متابعة التقدم', 'دعم متعدد اللغات'],
    rating: 4.8,
    reviewCount: 150000,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },

  // Teaching Tools (091-095)
  {
    id: '091',
    name: 'Kahoot',
    description: 'إنشاء اختبارات تفاعلية وألعاب تعليمية.',
    longDescription: `Kahoot هو منصة تعليمية تفاعلية تسمح للمعلمين بإنشاء اختبارات وألعاب تعليمية ممتعة. يمكن استخدامها في الفصول الدراسية أو عن بُعد لجعل التعلم أكثر إشراكاً.`,
    category: 'Teaching' as ToolCategory,
    tags: ['اختبارات تفاعلية', 'ألعاب تعليمية', 'تعليم ممتع'],
    url: 'https://kahoot.com/',
    imageUrl: '/image/91.png',
    pricing: 'Freemium' as ToolPricing,
    features: ['اختبارات تفاعلية', 'ألعاب تعليمية', 'تقارير الأداء', 'مشاركة جماعية'],
    rating: 4.6,
    reviewCount: 95000,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  },
  {
    id: '092',
    name: 'Nearpod',
    description: 'منصة تفاعلية للتعليم عن بعد.',
    longDescription: `Nearpod هي منصة تعليمية تفاعلية تتيح للمعلمين إنشاء وتقديم دروس تفاعلية غنية بالوسائط المتعددة. تدعم التعلم عن بعد والتعلم المختلط.`,
    category: 'Teaching' as ToolCategory,
    tags: ['تعليم تفاعلي', 'تعلم عن بعد', 'وسائط متعددة'],
    url: 'https://nearpod.com/',
    imageUrl: '/image/92.png',
    pricing: 'Freemium' as ToolPricing,
    features: ['دروس تفاعلية', 'تقييم مباشر', 'محتوى غني', 'تعاون طلابي'],
    rating: 4.5,
    reviewCount: 45000,
    isNew: false,
    isFeatured: true,
    isPopular: true,
    votes: {
      helpful: [],
      notHelpful: []
    },
    votingStats: {
      helpfulCount: 0,
      notHelpfulCount: 0,
      totalVotes: 0
    },
    savedBy: []
  }
];

export const categories: ToolCategory[] = [
  'Writing',
  'Research',
  'Math',
  'Science',
  'Language Learning',
  'Productivity',
  'Studying',
  'Test Prep',
  'Teaching',
  'Other'
];

export const pricingOptions: ToolPricing[] = [
  'Free',
  'Freemium',
  'Paid',
  'Subscription'
];

export const getFeaturedTools = (): Tool[] => {
  return tools.filter(tool => tool.isFeatured);
};

export const getPopularTools = (): Tool[] => {
  return tools.filter(tool => tool.isPopular);
};

export const getNewTools = (): Tool[] => {
  return tools.filter(tool => tool.isNew);
};

export const getToolById = (id: string): Tool | undefined => {
  const normalizedId = id.toString().padStart(3, '0');
  return tools.find(tool => tool.id === normalizedId);
};

export const getRelatedTools = (tool: Tool, limit: number = 3): Tool[] => {
  return tools
    .filter(t => 
      t.id !== tool.id && 
      (t.category === tool.category || 
       t.tags.some(tag => tool.tags.includes(tag)))
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
};

export const getAllToolsByCategory = (category: ToolCategory): Tool[] => {
  return tools.filter(tool => tool.category === category);
};

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { tools } from '../data/toolsData';

// تحديث هذه القيم بتكوين Firebase الخاص بك
const firebaseConfig = {
  // أضف تكوين Firebase الخاص بك هنا
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadTools = async () => {
  try {
    for (const tool of tools) {
      const paddedId = tool.id.toString().padStart(3, '0');
      const toolRef = doc(db, 'tools', paddedId);
      
      await setDoc(toolRef, {
        ...tool,
        id: paddedId,
        votes: { helpful: [], notHelpful: [] },
        votingStats: {
          helpfulCount: 0,
          notHelpfulCount: 0,
          totalVotes: 0
        },
        savedBy: [],
        submittedAt: new Date().toISOString()
      });
      
      console.log(`Uploaded tool: ${tool.name}`);
    }
    
    console.log('All tools uploaded successfully!');
  } catch (error) {
    console.error('Error uploading tools:', error);
  }
};

uploadTools();
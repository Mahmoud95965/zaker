import { db } from '../config/firebase';
import { doc, runTransaction } from 'firebase/firestore';

export const updateToolVote = async (
  toolId: string,
  userId: string,
  isHelpful: boolean
) => {
  try {
    const toolRef = doc(db, 'tools', toolId);
    
    return await runTransaction(db, async (transaction) => {
      const toolDoc = await transaction.get(toolRef);
      
      if (!toolDoc.exists()) {
        throw new Error('Tool not found');
      }
      
      const toolData = toolDoc.data();
      const votes = { 
        helpful: [...(toolData.votes?.helpful || [])],
        notHelpful: [...(toolData.votes?.notHelpful || [])]
      };
      
      let newRating = toolData.rating || 0;

      if (isHelpful) {
        const index = votes.helpful.indexOf(userId);
        if (index > -1) {
          votes.helpful.splice(index, 1);
          newRating = Math.max(0, newRating - 0.25);
        } else {
          votes.helpful.push(userId);
          // Remove from notHelpful if exists
          const notHelpfulIndex = votes.notHelpful.indexOf(userId);
          if (notHelpfulIndex > -1) {
            votes.notHelpful.splice(notHelpfulIndex, 1);
          }
          newRating = Math.min(5, newRating + 0.25);
        }
      } else {
        const index = votes.notHelpful.indexOf(userId);
        if (index > -1) {
          votes.notHelpful.splice(index, 1);
          newRating = Math.min(5, newRating + 0.25);
        } else {
          votes.notHelpful.push(userId);
          // Remove from helpful if exists
          const helpfulIndex = votes.helpful.indexOf(userId);
          if (helpfulIndex > -1) {
            votes.helpful.splice(helpfulIndex, 1);
          }
          newRating = Math.max(0, newRating - 0.25);
        }
      }

      const updates = {
        votes,
        rating: newRating,
        reviewCount: votes.helpful.length + votes.notHelpful.length,
        votingStats: {
          helpfulCount: votes.helpful.length,
          notHelpfulCount: votes.notHelpful.length,
          totalVotes: votes.helpful.length + votes.notHelpful.length
        }
      };

      transaction.update(toolRef, updates);
      return { success: true, updates };
    });
  } catch (error) {
    console.error('Error updating vote:', error);
    throw new Error('Failed to update vote. Please try again.');
  }
};

export const updateToolSave = async (
  toolId: string,
  userId: string
) => {
  try {
    const toolRef = doc(db, 'tools', toolId);
    
    return await runTransaction(db, async (transaction) => {
      const toolDoc = await transaction.get(toolRef);
      
      if (!toolDoc.exists()) {
        throw new Error('Tool not found');
      }
      
      const toolData = toolDoc.data();
      const savedBy = [...(toolData.savedBy || [])];
      const isCurrentlySaved = savedBy.includes(userId);

      if (isCurrentlySaved) {
        const index = savedBy.indexOf(userId);
        savedBy.splice(index, 1);
      } else {
        savedBy.push(userId);
      }

      transaction.update(toolRef, { savedBy });
      return { success: true, isSaved: !isCurrentlySaved };
    });
  } catch (error) {
    console.error('Error updating save:', error);
    throw new Error('Failed to update saved status. Please try again.');
  }
};

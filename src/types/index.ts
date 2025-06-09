export type ToolStatus = 'pending' | 'approved' | 'rejected' | 'approved_pending';

export interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: ToolCategory;
  tags: string[];  
  url: string;
  imageUrl: string;
  pricing: ToolPricing;
  features: string[];
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  status?: ToolStatus;
  submittedBy?: string;
  submittedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  votes: {
    helpful: string[]; // Array of user IDs
    notHelpful: string[]; // Array of user IDs
  };
  votingStats: {
    helpfulCount: number;
    notHelpfulCount: number;
    totalVotes: number;
  };
  savedBy: string[]; // Array of user IDs who saved this tool
}

export interface FilterOptions {
  category: ToolCategory | 'All';
  pricing: ToolPricing | 'All';
  searchQuery?: string;
}

export type ToolCategory = 
  | 'Writing' 
  | 'Research' 
  | 'Math' 
  | 'Science' 
  | 'Language Learning' 
  | 'Productivity' 
  | 'Studying' 
  | 'Test Prep' 
  | 'Teaching' 
  | 'Other';

export type ToolPricing = 
  | 'Free' 
  | 'Freemium' 
  | 'Paid' 
  | 'Subscription';
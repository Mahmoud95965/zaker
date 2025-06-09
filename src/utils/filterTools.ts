import type { FilterOptions, Tool } from '../types/index';

export const filterTools = (tools: Tool[], filterOptions: FilterOptions): Tool[] => {
  return tools.filter(tool => {
    // Only show fully approved tools
    if (tool.status !== undefined && tool.status !== 'approved') {
      return false;
    }

    // Filter by category
    if (filterOptions.category !== 'All' && tool.category !== filterOptions.category) {
      return false;
    }

    // Filter by pricing
    if (filterOptions.pricing !== 'All' && tool.pricing !== filterOptions.pricing) {
      return false;
    }

    // Filter by search query
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase();
      const nameMatch = tool.name.toLowerCase().includes(query);
      const descriptionMatch = tool.description.toLowerCase().includes(query);
      const tagsMatch = tool.tags.some(tag => tag.toLowerCase().includes(query));
      
      if (!nameMatch && !descriptionMatch && !tagsMatch) {
        return false;
      }
    }

    return true;
  });
};
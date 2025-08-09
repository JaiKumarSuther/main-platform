import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { searchAPI } from '@/api/search';

export function useSearch() {
  // Search listings query
  const useSearchListings = (params = {}) => {
    return useQuery({
      queryKey: ['search', 'listings', params],
      queryFn: async () => {
        try {
          const result = await searchAPI.searchListings(params);
          // Handle empty or null responses
          if (!result || !result.data) {
            return { data: [], total: 0, message: 'No results found' };
          }
          return result;
        } catch (error) {
          console.error('Search API Error:', error);
          throw error;
        }
      },
      enabled: computed(() => {
        const hasParams = params && (
          params.value?.q || 
          params.value?.date || 
          params.value?.type || 
          Object.keys(params.value || {}).some(key => params.value[key])
        );
        console.log('🔄 Query enabled check:', hasParams, params.value);
        return hasParams || true; // Enable even with empty params for now
      }),
      staleTime: 2 * 60 * 1000, // 2 minutes
      retry: 1, // Only retry once on failure
    });
  };

  // Search by location query
  const useSearchByLocation = (location, params = {}) => {
    return useQuery({
      queryKey: ['search', 'location', location, params],
      queryFn: async () => {
        try {
          const result = await searchAPI.searchByLocation(location, params);
          if (!result || !result.data) {
            return { data: [], total: 0, message: 'No results found' };
          }
          return result;
        } catch (error) {
          console.error('Search by Location Error:', error);
          throw error;
        }
      },
      enabled: !!location,
      staleTime: 2 * 60 * 1000, // 2 minutes
      retry: 1,
    });
  };

  // Search by type query
  const useSearchByType = (type, params = {}) => {
    return useQuery({
      queryKey: ['search', 'type', type, params],
      queryFn: async () => {
        try {
          const result = await searchAPI.searchByType(type, params);
          if (!result || !result.data) {
            return { data: [], total: 0, message: 'No results found' };
          }
          return result;
        } catch (error) {
          console.error('Search by Type Error:', error);
          throw error;
        }
      },
      enabled: !!type,
      staleTime: 2 * 60 * 1000, // 2 minutes
      retry: 1,
    });
  };

  // Advanced search query
  const useAdvancedSearch = (searchParams) => {
    return useQuery({
      queryKey: ['search', 'advanced', searchParams],
      queryFn: () => searchAPI.advancedSearch(searchParams),
      enabled: Object.keys(searchParams).length > 0,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Get search suggestions query
  const useSearchSuggestions = (query) => {
    return useQuery({
      queryKey: ['search', 'suggestions', query],
      queryFn: () => searchAPI.getSearchSuggestions(query),
      enabled: !!query && query.length > 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get popular searches query
  const usePopularSearches = () => {
    return useQuery({
      queryKey: ['search', 'popular'],
      queryFn: searchAPI.getPopularSearches,
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  return {
    useSearchListings,
    useSearchByLocation,
    useSearchByType,
    useAdvancedSearch,
    useSearchSuggestions,
    usePopularSearches
  };
}

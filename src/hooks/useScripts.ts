import { useState, useEffect, useCallback } from 'react';
import { Script, ScriptResponse, FilterOptions } from '../types';

export const useScripts = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [hasMore, setHasMore] = useState(true);

  const fetchApi = async (url: string): Promise<ScriptResponse> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return response.json();
  };

  const buildApiUrl = useCallback((currentPage: number) => {
    const params = new URLSearchParams();
    
    if (searchTerm) {
      params.append('q', searchTerm);
    }
    
    params.append('page', currentPage.toString());
    params.append('max', '20');
    
    if (filters.mode) params.append('mode', filters.mode);
    if (filters.patched !== undefined) params.append('patched', filters.patched ? '1' : '0');
    if (filters.key !== undefined) params.append('key', filters.key ? '1' : '0');
    if (filters.universal !== undefined) params.append('universal', filters.universal ? '1' : '0');
    if (filters.verified !== undefined) params.append('verified', filters.verified ? '1' : '0');
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.order) params.append('order', filters.order);
    if (filters.strict !== undefined) params.append('strict', filters.strict.toString());

    const baseUrl = searchTerm || Object.keys(filters).length > 0 
      ? '/scriptblox-api/api/script/search'
      : '/scriptblox-api/api/script/fetch';
    
    return `${baseUrl}?${params.toString()}`;
  }, [searchTerm, filters]);

  const loadScripts = useCallback(async (reset = false) => {
    if (isLoading) return;
    
    setIsLoading(true);
    const currentPage = reset ? 1 : page;

    try {
      const apiUrl = buildApiUrl(currentPage);
      const data = await fetchApi(apiUrl);
      const newScripts = data.result?.scripts || [];
      
      if (reset) {
        setScripts(newScripts);
        setPage(2);
      } else {
        setScripts(prev => [...prev, ...newScripts]);
        setPage(prev => prev + 1);
      }

      setHasMore(newScripts.length > 0);
    } catch (error) {
      console.error('Failed to load scripts:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page, buildApiUrl]);

  const searchScripts = useCallback((term: string) => {
    setSearchTerm(term);
    setPage(1);
    setHasMore(true);
    loadScripts(true);
  }, [loadScripts]);

  const updateFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    setPage(1);
    setHasMore(true);
    loadScripts(true);
  }, [loadScripts]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      loadScripts();
    }
  }, [hasMore, isLoading, loadScripts]);

  useEffect(() => {
    loadScripts(true);
  }, []);

  return {
    scripts,
    isLoading,
    searchScripts,
    updateFilters,
    filters,
    loadMore,
    hasMore,
    page: page - 1
  };
};
import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X, Check, Star, Shield, Key, Globe, Zap } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters };
    if (value === undefined || value === null || value === '') {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const activeFiltersCount = Object.keys(filters).length;

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] 
                 border border-[#4d4d4d]/50 text-[#cccccc] rounded-lg hover:from-[#4d4d4d]/30 
                 hover:to-[#2d2d2d] hover:border-[#4d4d4d]/70 transition-all duration-300 
                 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden"
      >
        <Filter size={18} className="drop-shadow-sm" />
        <span className="font-medium">Filters</span>
        {activeFiltersCount > 0 && (
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs 
                         px-2 py-1 rounded-full font-bold animate-pulse">
            {activeFiltersCount}
          </span>
        )}
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 
                      hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </button>

      {isExpanded && (
        <div className="mt-4 p-6 bg-gradient-to-br from-[#2d2d2d]/90 to-[#1a1a1a]/90 
                      border border-[#4d4d4d]/50 rounded-xl backdrop-blur-md shadow-2xl 
                      animate-fade-in-up relative overflow-hidden">
          
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4d4d4d]/10 via-transparent to-[#4d4d4d]/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#cccccc] flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                Advanced Filters
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 
                           border border-red-500/30 rounded-lg hover:bg-red-500/30 
                           transition-all duration-300 text-sm"
                >
                  <X size={14} />
                  Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Script Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#cccccc]/80 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Script Type
                </label>
                <select
                  value={filters.mode || ''}
                  onChange={(e) => updateFilter('mode', e.target.value || undefined)}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4d4d4d]/50 text-[#cccccc] 
                           rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                           focus:border-blue-500/50 transition-all duration-300"
                >
                  <option value="">All Types</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#cccccc]/80">Sort By</label>
                <select
                  value={filters.sortBy || 'updatedAt'}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4d4d4d]/50 text-[#cccccc] 
                           rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                           focus:border-blue-500/50 transition-all duration-300"
                >
                  <option value="updatedAt">Recently Updated</option>
                  <option value="createdAt">Recently Created</option>
                  <option value="views">Most Views</option>
                  <option value="likeCount">Most Liked</option>
                  <option value="accuracy">Most Accurate</option>
                </select>
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#cccccc]/80">Order</label>
                <select
                  value={filters.order || 'desc'}
                  onChange={(e) => updateFilter('order', e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#4d4d4d]/50 text-[#cccccc] 
                           rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                           focus:border-blue-500/50 transition-all duration-300"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>

            {/* Boolean Filters */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'verified', label: 'Verified', icon: Shield, color: 'green' },
                { key: 'key', label: 'Has Key', icon: Key, color: 'blue' },
                { key: 'universal', label: 'Universal', icon: Globe, color: 'purple' },
                { key: 'patched', label: 'Patched', icon: Check, color: 'orange' }
              ].map(({ key, label, icon: Icon, color }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={filters[key as keyof FilterOptions] === true}
                      onChange={(e) => updateFilter(key as keyof FilterOptions, e.target.checked ? true : undefined)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 border-2 rounded transition-all duration-300 flex items-center justify-center
                                   ${filters[key as keyof FilterOptions] === true
                                     ? `border-${color}-500 bg-${color}-500/20` 
                                     : 'border-[#4d4d4d] hover:border-[#4d4d4d]/70'}`}>
                      {filters[key as keyof FilterOptions] === true && (
                        <Check size={12} className={`text-${color}-400 animate-scale-in`} />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon size={16} className={`text-${color}-400 group-hover:animate-pulse`} />
                    <span className="text-sm text-[#cccccc]/80 group-hover:text-[#cccccc] transition-colors duration-300">
                      {label}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {/* Strict Search Toggle */}
            <div className="mt-6 pt-4 border-t border-[#4d4d4d]/30">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.strict !== false}
                    onChange={(e) => updateFilter('strict', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-all duration-300 flex items-center justify-center
                                 ${filters.strict !== false
                                   ? 'border-purple-500 bg-purple-500/20' 
                                   : 'border-[#4d4d4d] hover:border-[#4d4d4d]/70'}`}>
                    {filters.strict !== false && (
                      <Check size={12} className="text-purple-400 animate-scale-in" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-purple-400 group-hover:animate-pulse" />
                  <span className="text-sm text-[#cccccc]/80 group-hover:text-[#cccccc] transition-colors duration-300">
                    Strict Search (More Precise Results)
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
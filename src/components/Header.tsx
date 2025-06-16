import React, { useState } from 'react';
import { Search, Shield, Zap, Code2 } from 'lucide-react';
import { FilterPanel } from './FilterPanel';
import { FilterOptions } from '../types';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
  onFiltersChange: (filters: FilterOptions) => void;
  filters: FilterOptions;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onFiltersChange, filters }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(searchValue.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-8 pb-6 border-b border-[#4d4d4d]/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative p-3 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] rounded-xl border border-[#4d4d4d]/30 shadow-lg">
            <Shield className="w-8 h-8 text-[#cccccc] drop-shadow-sm" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
            <Zap className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#cccccc] tracking-wide drop-shadow-sm">
              Secret Service Panel
            </h1>
            <p className="text-sm text-[#cccccc]/60 mt-1">Made By _1.7s903 On Discord</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-[#cccccc]/40">
          <Code2 className="w-5 h-5 animate-pulse" />
          <span className="text-sm font-mono">v2.0</span>
        </div>
      </div>
      
      <div className="flex gap-3 max-w-4xl mb-6">
        <div className="relative flex-1 group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4d4d4d]/20 to-transparent rounded-lg blur-sm group-hover:blur-none transition-all duration-300"></div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search scripts..."
            className="relative w-full px-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d]/50 text-[#cccccc] 
                     rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4d4d4d] focus:border-[#4d4d4d]
                     focus:border-transparent placeholder-[#cccccc]/40 transition-all duration-300
                     hover:border-[#4d4d4d]/70 hover:bg-[#2d2d2d]/80 backdrop-blur-sm
                     shadow-inner"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        <button
          onClick={handleSearch}
          className="relative px-6 py-3 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] border border-[#4d4d4d]/50 text-[#cccccc] 
                   rounded-lg hover:from-[#4d4d4d]/30 hover:to-[#2d2d2d] hover:border-[#4d4d4d]/70 
                   transition-all duration-300 flex items-center gap-2 whitespace-nowrap font-medium
                   shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95
                   before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r 
                   before:from-white/10 before:to-transparent before:opacity-0 
                   hover:before:opacity-100 before:transition-opacity before:duration-300"
        >
          <Search size={18} className="drop-shadow-sm" />
          <span className="relative z-10">Search</span>
        </button>
      </div>

      <FilterPanel filters={filters} onFiltersChange={onFiltersChange} />
    </div>
  );
};
import React from 'react';
import { Hash } from 'lucide-react';

interface PageIndicatorProps {
  page: number;
}

export const PageIndicator: React.FC<PageIndicatorProps> = ({ page }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                  bg-gradient-to-br from-[#2d2d2d]/90 to-[#1a1a1a]/90 text-[#cccccc] 
                  px-6 py-3 rounded-full border border-[#4d4d4d]/50 font-medium 
                  shadow-2xl z-40 backdrop-blur-md transition-all duration-300
                  hover:from-[#4d4d4d]/40 hover:to-[#2d2d2d]/90 hover:border-[#4d4d4d]/70
                  hover:scale-105 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4d4d4d]/20 via-transparent to-[#4d4d4d]/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 flex items-center gap-2">
        <Hash className="w-4 h-4 text-[#cccccc]/70" />
        <span className="text-sm drop-shadow-sm">Page {page}</span>
      </div>
    </div>
  );
};
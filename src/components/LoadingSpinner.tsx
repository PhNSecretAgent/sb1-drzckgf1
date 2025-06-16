import React from 'react';
import { Code, Zap } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12">
      <div className="relative mb-4">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-[#4d4d4d]/30 border-t-[#cccccc]/70 
                      rounded-full animate-spin" />
        
        {/* Inner ring */}
        <div className="absolute inset-2 w-12 h-12 border-4 border-transparent border-t-[#4d4d4d]/60 
                      rounded-full animate-spin animate-reverse" 
             style={{ animationDuration: '1.5s' }} />
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Code className="w-6 h-6 text-[#cccccc]/80 animate-pulse" />
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 w-16 h-16 rounded-full bg-[#cccccc]/10 blur-md animate-pulse"></div>
      </div>
      
      <div className="flex items-center gap-2 text-[#cccccc]/60">
        <Zap className="w-4 h-4 animate-pulse" />
        <span className="text-sm font-medium">Loading scripts...</span>
      </div>
    </div>
  );
};
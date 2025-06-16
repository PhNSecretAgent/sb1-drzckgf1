import React, { useState } from 'react';
import { Copy, Eye, Code, Sparkles, Download, Shield, Key, Globe, Check, Star, Crown } from 'lucide-react';
import { Script } from '../types';

interface ScriptCardProps {
  script: Script;
  onCopy: (script: string, scriptId: string) => void;
  copyingId: string | null;
  index: number;
}

export const ScriptCard: React.FC<ScriptCardProps> = ({ script, onCopy, copyingId, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const scriptId = script._id || script.id;
  const isCopying = copyingId === scriptId;
  
  const imageUrl = script.image
    ? (script.image.startsWith('http') 
        ? script.image 
        : `https://scriptblox.com${script.image}`)
    : script.game?.imageUrl || 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=220&h=120&fit=crop';

  const handleCopy = () => {
    if (script.script && !isCopying) {
      onCopy(script.script, scriptId);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div 
      className="relative bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] border border-[#4d4d4d]/30 
                rounded-xl overflow-hidden flex flex-col h-80 transition-all duration-500 
                hover:border-[#4d4d4d]/60 hover:shadow-2xl hover:shadow-black/50 group
                animate-fade-in-up transform hover:scale-[1.02] hover:-translate-y-1"
      style={{ 
        animationDelay: `${index * 80}ms`,
        animationFillMode: 'both'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#4d4d4d]/20 via-transparent to-[#4d4d4d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      
      {/* Status badges */}
      <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1">
        {script.verified && (
          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/30 
                         rounded-full text-green-400 text-xs font-medium backdrop-blur-sm">
            <Shield size={10} />
            <span>Verified</span>
          </div>
        )}
        {script.key && (
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 
                         rounded-full text-blue-400 text-xs font-medium backdrop-blur-sm">
            <Key size={10} />
            <span>Key</span>
          </div>
        )}
        {script.isUniversal && (
          <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 border border-purple-500/30 
                         rounded-full text-purple-400 text-xs font-medium backdrop-blur-sm">
            <Globe size={10} />
            <span>Universal</span>
          </div>
        )}
        {script.isPatched && (
          <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 border border-orange-500/30 
                         rounded-full text-orange-400 text-xs font-medium backdrop-blur-sm">
            <Check size={10} />
            <span>Patched</span>
          </div>
        )}
        {script.scriptType === 'paid' && (
          <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 
                         rounded-full text-yellow-400 text-xs font-medium backdrop-blur-sm">
            <Crown size={10} />
            <span>Premium</span>
          </div>
        )}
      </div>

      {/* Sparkle effect */}
      <div className="absolute top-2 right-2 z-20">
        <Sparkles className={`w-4 h-4 text-yellow-400 transition-all duration-300 ${isHovered ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
      </div>

      <div className="relative overflow-hidden bg-[#1a1a1a] border-b border-[#4d4d4d]/20">
        {!imageLoaded && (
          <div className="w-full h-32 bg-[#1a1a1a] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#4d4d4d]/50 border-t-[#cccccc]/70 rounded-full animate-spin"></div>
          </div>
        )}
        
        {!imageError ? (
          <img 
            src={imageUrl}
            alt={script.title}
            className={`w-full h-32 object-cover transition-all duration-500 
                       group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-32 bg-[#1a1a1a] flex items-center justify-center">
            <Code className="w-8 h-8 text-[#4d4d4d]" />
          </div>
        )}
        
        {/* Image overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4d4d4d]/10 via-transparent to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="relative p-4 flex flex-col flex-grow">
        {/* Content glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d2d2d]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
        
        <h3 className="relative text-[#cccccc] font-semibold text-lg mb-2 line-clamp-2 leading-tight
                     group-hover:text-white transition-colors duration-300 drop-shadow-sm">
          {script.title}
        </h3>
        
        <div className="relative flex items-center gap-4 text-[#cccccc]/60 text-sm mb-3">
          <span className="truncate group-hover:text-[#cccccc]/80 transition-colors duration-300">
            {script.game?.name || 'No game specified'}
          </span>
          {script.views && (
            <div className="flex items-center gap-1 group-hover:text-[#cccccc]/80 transition-colors duration-300">
              <Eye size={14} />
              <span>{script.views.toLocaleString()}</span>
            </div>
          )}
        </div>
        
        <button
          onClick={handleCopy}
          disabled={!script.script || isCopying}
          className="relative mt-auto w-full py-3 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] 
                   text-[#cccccc] border border-[#4d4d4d]/30 rounded-lg 
                   hover:from-[#4d4d4d]/40 hover:to-[#2d2d2d] hover:border-[#4d4d4d]/60 
                   hover:text-white transition-all duration-300 
                   flex items-center justify-center gap-2 disabled:opacity-50 
                   disabled:cursor-not-allowed font-medium shadow-lg
                   hover:shadow-xl transform hover:scale-105 active:scale-95
                   before:absolute before:inset-0 before:rounded-lg 
                   before:bg-gradient-to-r before:from-white/10 before:to-transparent 
                   before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                   overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          {isCopying ? (
            <>
              <Download size={16} className="animate-bounce" />
              <span className="relative z-10">Copying...</span>
            </>
          ) : (
            <>
              <Copy size={16} className="drop-shadow-sm" />
              <span className="relative z-10">Copy Script</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
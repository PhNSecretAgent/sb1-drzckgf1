import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { NotificationProps } from '../types';

export const Notification: React.FC<NotificationProps> = ({ 
  message, 
  type, 
  isVisible, 
  onClose 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-24 right-6 z-50 flex items-center gap-3 px-6 py-4 
                   rounded-xl shadow-2xl border transform transition-all duration-500 
                   backdrop-blur-md relative overflow-hidden
                   ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}
                   ${type === 'success' 
                     ? 'bg-gradient-to-br from-green-900/90 to-green-800/80 border-green-600/50 text-green-100' 
                     : 'bg-gradient-to-br from-red-900/90 to-red-800/80 border-red-600/50 text-red-100'}`}>
      
      {/* Background glow */}
      <div className={`absolute inset-0 rounded-xl blur-sm opacity-50
                     ${type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}></div>
      
      {/* Sparkle effect for success */}
      {type === 'success' && (
        <div className="absolute top-1 right-1">
          <Sparkles className="w-3 h-3 text-green-300 animate-pulse" />
        </div>
      )}
      
      {/* Animated border */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r opacity-30
                     ${type === 'success' 
                       ? 'from-green-400 via-transparent to-green-400' 
                       : 'from-red-400 via-transparent to-red-400'}
                     animate-pulse`}></div>
      
      <div className="relative z-10 flex items-center gap-3">
        {type === 'success' ? (
          <CheckCircle size={20} className="text-green-400 drop-shadow-sm" />
        ) : (
          <XCircle size={20} className="text-red-400 drop-shadow-sm" />
        )}
        <span className="font-medium drop-shadow-sm">{message}</span>
      </div>
    </div>
  );
};
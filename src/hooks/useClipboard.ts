import { useState, useCallback } from 'react';

export const useClipboard = () => {
  const [copyingId, setCopyingId] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string, scriptId: string): Promise<boolean> => {
    if (copyingId) return false;
    
    setCopyingId(scriptId);
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    } finally {
      setTimeout(() => setCopyingId(null), 500);
    }
  }, [copyingId]);

  return { copyToClipboard, copyingId };
};
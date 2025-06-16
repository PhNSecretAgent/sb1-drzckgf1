import React, { useState } from 'react';
import { Header } from './components/Header';
import { ScriptsGrid } from './components/ScriptsGrid';
import { Notification } from './components/Notification';
import { PageIndicator } from './components/PageIndicator';
import { useScripts } from './hooks/useScripts';
import { useClipboard } from './hooks/useClipboard';

function App() {
  const { scripts, isLoading, searchScripts, updateFilters, filters, loadMore, hasMore, page } = useScripts();
  const { copyToClipboard, copyingId } = useClipboard();
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const handleCopy = async (scriptContent: string, scriptId: string) => {
    if (!scriptContent) {
      showNotification('No script content found', 'error');
      return;
    }

    const success = await copyToClipboard(scriptContent, scriptId);
    showNotification(
      success ? 'Script copied to clipboard!' : 'Failed to copy script',
      success ? 'success' : 'error'
    );
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200 relative overflow-x-hidden">
      {/* Animated background effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}>
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d2d2d]/20 via-transparent to-[#0d0d0d]/30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,120,120,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(100,100,100,0.08),transparent_50%)]"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-600 rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <Header 
            onSearch={searchScripts} 
            onFiltersChange={updateFilters}
            filters={filters}
          />
          
          <ScriptsGrid
            scripts={scripts}
            isLoading={isLoading}
            onCopy={handleCopy}
            onLoadMore={loadMore}
            hasMore={hasMore}
            copyingId={copyingId}
          />
        </div>
      </div>

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      <PageIndicator page={page} />
    </div>
  );
}

export default App;
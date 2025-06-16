import React, { useEffect, useRef } from 'react';
import { ScriptCard } from './ScriptCard';
import { LoadingSpinner } from './LoadingSpinner';
import { Script } from '../types';

interface ScriptsGridProps {
  scripts: Script[];
  isLoading: boolean;
  onCopy: (script: string, scriptId: string) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  copyingId: string | null;
}

export const ScriptsGrid: React.FC<ScriptsGridProps> = ({
  scripts,
  isLoading,
  onCopy,
  onLoadMore,
  hasMore,
  copyingId
}) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore]);

  if (scripts.length === 0 && isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                    2xl:grid-cols-5 gap-6 mb-20">
        {scripts.map((script, index) => (
          <ScriptCard
            key={script._id || script.id || `${script.title}-${index}`}
            script={script}
            onCopy={onCopy}
            copyingId={copyingId}
            index={index}
          />
        ))}
      </div>
      
      {hasMore && (
        <div ref={loadMoreRef} className="w-full">
          {isLoading && <LoadingSpinner />}
        </div>
      )}
      
      {!hasMore && scripts.length > 0 && (
        <div className="text-center py-8 text-gray-500 animate-fade-in">
          No more scripts to load
        </div>
      )}
    </>
  );
};
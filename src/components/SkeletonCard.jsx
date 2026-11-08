import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col animate-pulse">
      <div className="w-full aspect-square bg-slate-200 rounded-xl mb-4" />
      <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
      <div className="h-5 bg-slate-200 rounded w-4/5 mb-3" />
      <div className="h-4 bg-slate-200 rounded w-1/2 mb-4" />
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="h-6 bg-slate-200 rounded w-20" />
        <div className="h-9 bg-slate-200 rounded-lg w-24" />
      </div>
    </div>
  );
};

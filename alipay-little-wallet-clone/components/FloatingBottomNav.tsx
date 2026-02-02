import React from 'react';
import { Flame, ScanLine, Compass } from 'lucide-react';

export const FloatingBottomNav = () => {
  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <div className="bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-8 py-3 flex items-center gap-12 pointer-events-auto border border-white/50">
        <div className="flex flex-col items-center gap-0.5 cursor-pointer group">
          <div className="text-orange-500 transition-transform group-active:scale-90">
            <Flame size={24} fill="currentColor" />
          </div>
          <span className="text-[10px] font-medium text-gray-800">小荷包</span>
        </div>
        
        <div className="flex flex-col items-center gap-0.5 cursor-pointer group">
          <div className="text-gray-400 transition-transform group-active:scale-90 group-hover:text-gray-600">
            <ScanLine size={24} />
          </div>
          <span className="text-[10px] font-medium text-gray-500">荷包付</span>
        </div>
        
        <div className="flex flex-col items-center gap-0.5 cursor-pointer group">
          <div className="text-gray-400 transition-transform group-active:scale-90 group-hover:text-gray-600">
            <Compass size={24} />
          </div>
          <span className="text-[10px] font-medium text-gray-500">荷包圈</span>
        </div>
      </div>
    </div>
  );
};
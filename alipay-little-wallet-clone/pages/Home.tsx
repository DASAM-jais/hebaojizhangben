import React from 'react';
import { ChevronLeft, MoreHorizontal, Plus, ScanLine, LayoutGrid, Disc, Bell, ListFilter, CirclePlus } from 'lucide-react';
import { Account } from '../types';
import { formatMoney } from '../App';
import { FloatingBottomNav } from '../components/FloatingBottomNav';

interface HomeViewProps {
  accounts: Account[];
  userAvatar: string;
  mascotAvatar: string;
  onCardClick: (account: Account) => void;
  onCreate: () => void;
  onMascotClick: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ accounts, userAvatar, mascotAvatar, onCardClick, onCreate, onMascotClick }) => {
  return (
    <div className="h-full flex flex-col bg-[#F5F5F5]">
      {/* 1. Top Navigation Bar */}
      <div className="px-4 pt-3 pb-2 bg-[#F5F5F5] flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-1">
           <button className="p-1 -ml-1"><ChevronLeft size={26} className="text-gray-900" /></button>
           <span className="text-lg font-normal text-gray-900 ml-1">支付宝小荷包</span>
        </div>
        <div className="flex gap-5 text-gray-900 items-center">
           <LayoutGrid size={24} strokeWidth={1.5} />
           <MoreHorizontal size={24} strokeWidth={1.5} />
           <Disc size={24} strokeWidth={1.5} />
        </div>
      </div>

      {/* 2. Sub-Header (Mascot & Actions) */}
      <div className="px-4 pb-2 flex justify-between items-center bg-[#F5F5F5]">
          {/* Mascot Icon - Clickable to change Mascot Avatar ONLY */}
          <div 
             onClick={onMascotClick}
             className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden cursor-pointer active:scale-90 transition-transform"
          >
             {/* Display independent mascotAvatar if set, otherwise default placeholder */}
             {mascotAvatar ? (
               <img src={mascotAvatar} className="w-full h-full object-cover" alt="mascot" />
             ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-200 to-yellow-400 flex items-center justify-center">
                    <span className="text-xl">🎒</span>
                </div>
             )}
          </div>
          
          {/* Action Icons */}
          <div className="flex items-center gap-6 text-gray-800">
             <Bell size={24} strokeWidth={1.5} />
             <div className="relative">
                 <ListFilter size={24} strokeWidth={1.5} />
                 <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></div>
             </div>
             <CirclePlus size={24} strokeWidth={1.5} onClick={onCreate} />
          </div>
      </div>

      {/* 3. Cards List */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-24 space-y-4 no-scrollbar">
        {accounts.map(acc => (
          <div 
            key={acc.id} 
            onClick={() => onCardClick(acc)} 
            className={`relative h-48 rounded-xl overflow-hidden shadow-sm active:scale-[0.98] transition-all duration-200 group ${acc.bgType === 'gradient' ? acc.bgColorClass : 'bg-gray-800'}`}
          >
            {acc.bgType === 'image' && (
               <>
                <img src={acc.bgImage} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="bg" />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
               </>
            )}

            {/* Gradient Overlay for yellow cards */}
            {acc.bgType === 'gradient' && (
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            )}
            
            <div className={`relative z-10 p-4 h-full flex flex-col justify-between ${acc.bgType === 'gradient' ? 'text-white' : 'text-white'}`}>
              
              {/* Top Row: Name and Avatar */}
              <div className="flex justify-between items-start">
                <span className="font-medium text-[17px] drop-shadow-md tracking-wide">
                    {acc.name} 
                </span>
                <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm p-0.5 border border-white/40 overflow-hidden shadow-sm">
                  {/* Use Shared User Avatar here (not Mascot) */}
                  <img src={userAvatar} className="w-full h-full object-cover rounded-full" alt="avatar"/>
                </div>
              </div>
              
              {/* Bottom Row: Balance and Actions */}
              <div className="flex justify-between items-end">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-base font-medium">¥</span>
                    <span className="text-[2rem] font-bold font-mono tracking-tight drop-shadow-sm leading-none">{formatMoney(acc.balance)}</span>
                  </div>

                  <div className="flex gap-4 opacity-90 mb-0.5">
                    <button className="p-1.5 hover:bg-white/20 rounded-full transition-colors">
                        <ScanLine size={22} strokeWidth={2} className="drop-shadow-sm"/>
                    </button>
                    <button className="p-1.5 hover:bg-white/20 rounded-full transition-colors">
                        <LayoutGrid size={22} strokeWidth={2} className="drop-shadow-sm"/>
                    </button>
                 </div>
              </div>

            </div>
          </div>
        ))}

        {/* Create New Button (Pill Shape) */}
        <button 
            onClick={onCreate}
            className="w-full h-12 bg-white rounded-full flex items-center justify-center gap-2 text-gray-800 font-medium shadow-sm hover:bg-gray-50 active:scale-[0.99] transition-all mt-4"
        >
            <Plus size={18} strokeWidth={2.5} />
            <span className="text-[15px]">新建小荷包</span>
        </button>

      </div>

      <FloatingBottomNav />
    </div>
  );
};
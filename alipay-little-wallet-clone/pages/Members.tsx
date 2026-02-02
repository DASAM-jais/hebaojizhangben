import React from 'react';
import { ChevronLeft, MoreHorizontal, Minus, ChevronRight } from 'lucide-react';
import { Account } from '../types';

interface MemberProps {
  account: Account;
  onBack: () => void;
  onChangeAvatar: () => void;
}

export const MemberView: React.FC<MemberProps> = ({ account, onBack, onChangeAvatar }) => {
  return (
    <div className="h-full flex flex-col bg-[#F5F5F5]">
      <div className="px-4 pt-4 pb-3 flex items-center justify-between bg-white sticky top-0 border-b border-gray-100">
        <button onClick={onBack}><ChevronLeft size={24} className="text-gray-900" /></button>
        <span className="text-lg font-medium text-gray-900">成员</span>
        <MoreHorizontal size={24} className="text-gray-900" />
      </div>

      <div className="p-3 space-y-3">
         {/* Delete Action */}
         <div className="bg-white rounded-xl py-5 flex flex-col items-center justify-center gap-2 active:bg-gray-50 transition-colors cursor-pointer shadow-sm">
            <div className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
               <Minus className="text-gray-400" size={24} />
            </div>
            <span className="text-xs text-gray-600 font-medium">删除成员</span>
         </div>

         <div className="bg-white rounded-xl overflow-hidden shadow-sm">
             <div className="flex justify-between items-center px-4 py-4 bg-white active:bg-gray-50 transition-colors cursor-pointer">
                <span className="text-[15px] text-gray-900">资金使用权限</span>
                <ChevronRight size={18} className="text-gray-300" />
             </div>
         </div>

         <div className="bg-white rounded-xl p-4 shadow-sm">
             <div className="text-xs text-gray-400 mb-4 font-medium">管理员</div>
             <div className="flex items-center gap-3 cursor-pointer" onClick={onChangeAvatar}>
                <div className="w-11 h-11 rounded-full bg-gray-100 overflow-hidden relative border border-gray-100">
                   <img src={account.avatar} className="w-full h-full object-cover" alt="user" />
                </div>
                <div className="flex flex-col">
                   <div className="text-[15px] font-bold text-gray-900 flex items-center gap-2">
                     相酌(付应超) 
                     <span className="text-[10px] bg-gray-50 text-gray-400 px-1.5 py-0.5 rounded border border-gray-200 font-normal">创建者</span>
                   </div>
                </div>
             </div>
         </div>

         <div className="text-center text-gray-400 text-xs mt-6">共1人</div>
      </div>
    </div>
  );
};
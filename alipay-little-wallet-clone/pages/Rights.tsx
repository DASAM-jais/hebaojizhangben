import React from 'react';
import { ChevronLeft, ScanLine, MoreHorizontal, Eye, PiggyBank } from 'lucide-react';
import { Account } from '../types';
import { formatMoney } from '../App';

interface RightsProps {
  account: Account;
  onBack: () => void;
}

export const RightsView: React.FC<RightsProps> = ({ account, onBack }) => {
  return (
    <div className="h-full flex flex-col bg-[#F5F5F5]">
       <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <button onClick={onBack}><ChevronLeft size={24} className="text-gray-900" /></button>
        <div className="flex gap-4 text-gray-900">
           <ScanLine size={22} />
           <MoreHorizontal size={22} />
        </div>
      </div>

      <div className="px-4 mt-2">
         <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            总金额(元) <Eye size={12} />
         </div>
         <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold text-gray-900 font-mono tracking-tighter">{formatMoney(account.balance)}</span>
            <span className="text-gray-400 text-xs mt-1">明细 &gt;</span>
         </div>

         {/* Current Benefits */}
         <div className="bg-white rounded-2xl p-5 mb-3 shadow-sm relative overflow-hidden">
             <div className="text-sm font-bold text-gray-900 mb-6">活期权益</div>
             <div className="flex justify-between items-start">
                 <div>
                    <div className="text-xs text-gray-400 mb-1">金额(元)</div>
                    <div className="text-2xl font-bold font-mono text-gray-900">{formatMoney(account.balance)}</div>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] text-gray-400 mb-1">特权(银行卡转入享免费提现)</div>
                    <div className="flex items-center justify-end gap-1 text-sm font-bold text-gray-800">
                        <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                        </div> 
                        安心攒 &gt;
                    </div>
                 </div>
             </div>
             <div className="mt-8 text-xs text-gray-400 border-t border-gray-50 pt-3">
                昨日收益 0.00元 | 累计收益 1.92元
             </div>
         </div>

         {/* Fixed Benefits */}
         <div className="bg-white rounded-2xl p-5 mb-3 shadow-sm">
             <div className="text-sm font-bold text-gray-900 mb-6">定期权益</div>
             <div className="flex justify-between items-start">
                 <div>
                    <div className="text-xs text-gray-400 mb-1">金额(元)</div>
                    <div className="text-2xl font-bold font-mono text-gray-900">0.00</div>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] text-gray-400 mb-1">特权</div>
                    <div className="text-sm font-bold text-orange-500">暂未开启</div>
                 </div>
             </div>
         </div>

         {/* Promo Card */}
         <div className="bg-[#FFF8F0] rounded-2xl p-4 border border-[#FFE8D6] relative overflow-hidden">
             <div className="flex items-center gap-1.5 mb-3">
                 <PiggyBank className="text-orange-500 fill-orange-500" size={16} />
                 <span className="font-bold text-gray-900 text-sm">周周盈</span>
                 <span className="text-[10px] bg-[#FFE0C4] text-[#B85C00] px-1.5 py-0.5 rounded">稳健低波</span>
             </div>
             <div className="flex justify-between items-end relative z-10">
                 <div>
                    <div className="text-xs text-gray-400 mb-1 scale-90 origin-left">近一月年化</div>
                    <div className="text-xl font-bold text-[#FF5900]">1.66%</div>
                 </div>
                 <div className="text-center pl-4">
                    <div className="text-xs text-gray-400 mb-1 scale-90">投资期限</div>
                    <div className="text-sm font-bold text-gray-800">每周灵活转出</div>
                 </div>
                 <button className="bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-orange-200 shadow-md">开启</button>
             </div>
             <div className="mt-4 bg-white/60 p-2 rounded-lg text-[10px] text-center text-gray-600 font-medium border border-white/50">
                 5000元 周周盈 · 体验金 免费体验 赚的都归你
             </div>
         </div>
      </div>
    </div>
  );
};
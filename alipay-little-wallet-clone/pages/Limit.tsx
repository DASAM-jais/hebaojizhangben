import React from 'react';
import { ChevronLeft, MoreHorizontal, ChevronRight } from 'lucide-react';
import { Account } from '../types';
import { formatMoney } from '../App';

interface LimitProps {
  account: Account;
  onBack: () => void;
  onUpdate: (data: Partial<Account>) => void;
}

export const LimitView: React.FC<LimitProps> = ({ account, onBack }) => {
  const currentMonthExpense = account.transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const percentage = Math.min((currentMonthExpense / (account.monthlyLimit || 1)) * 100, 100);

  return (
    <div className="h-full flex flex-col bg-[#F5F5F5]">
      <div className="px-4 pt-4 pb-3 flex items-center justify-between bg-[#F5F5F5]">
        <button onClick={onBack}><ChevronLeft size={24} className="text-gray-900" /></button>
        <span className="text-lg font-medium text-gray-900">支出限额管理</span>
        <MoreHorizontal size={24} className="text-gray-900" />
      </div>

      <div className="px-4 mt-2">
         <div className="text-xs text-gray-400 mb-3 px-1">管理员可修改支出限额</div>
         <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-1">
               <span className="font-bold text-gray-900 text-lg">总支出限额</span>
               <ChevronRight size={20} className="text-gray-300" />
            </div>
            <div className="text-xs text-gray-400 mb-6">有支出权限的成员共享该额度</div>
            
            <div className="flex items-baseline mb-5">
               <span className="text-2xl font-bold text-gray-900">¥</span>
               <span className="text-4xl font-bold font-mono mx-1 text-gray-900">{formatMoney(account.monthlyLimit)}</span>
               <span className="text-sm text-gray-500">/月</span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
               <div 
                 className="h-full bg-[#1677FF] rounded-full transition-all duration-700 ease-out" 
                 style={{width: `${percentage}%`}}
               ></div>
            </div>

            <div className="flex justify-between text-xs text-gray-500 font-medium">
               <span className="font-mono text-gray-700">已使用 ¥{currentMonthExpense.toFixed(2)}</span>
               <span className="font-mono text-gray-400">剩余额度 ¥{(account.monthlyLimit - currentMonthExpense).toFixed(2)}</span>
            </div>
         </div>
      </div>
      
      <div className="mt-auto mb-10 text-center">
         <button className="text-[#1677FF] text-sm font-medium hover:opacity-80">修改记录</button>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Lock, CreditCard, LayoutGrid, Disc, MoreHorizontal, Pencil, Headset, FlaskConical } from 'lucide-react';
import { Account } from '../types';

interface SettingsProps {
  account: Account;
  onBack: () => void;
  onNavigate: (page: any) => void;
  onUpdate: (data: Partial<Account>) => void;
  onChangeBg: () => void;
}

export const SettingsView: React.FC<SettingsProps> = ({ account, onBack, onNavigate, onChangeBg }) => {
  const [notify, setNotify] = useState(true);

  return (
    <div className="h-full flex flex-col bg-[#F5F5F5] overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="sticky top-0 bg-[#F5F5F5] z-10 px-4 pt-4 pb-2 flex items-center justify-between">
        <button onClick={onBack} className="p-1 -ml-1"><ChevronLeft size={26} className="text-gray-900" /></button>
        <div className="flex gap-5 text-gray-900 items-center">
            <LayoutGrid size={24} strokeWidth={1.5} />
            <MoreHorizontal size={24} strokeWidth={1.5} />
            <Disc size={24} strokeWidth={1.5} />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 pt-2 pb-10 space-y-3">
        
        {/* Profile Header (Plain) */}
        <div className="px-2 mb-2">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-[1.6rem] font-bold text-gray-900 leading-tight">{account.name}</span>
                <Pencil size={18} className="text-gray-400" />
            </div>
            <span className="text-[11px] text-gray-500 bg-white/60 border border-gray-200 px-1.5 py-0.5 rounded-md">自己用</span>
        </div>

        {/* Group 1: Permission */}
        <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <SettingItem label="资金使用权限" isLink />
        </div>

        {/* Group 2: Wallet Settings */}
        <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="px-4 pt-4 pb-2 text-xs text-gray-400 font-medium">小荷包设置</div>
            <SettingItem label="小荷包名称" value={account.name} isLink />
            <SettingItem label="背景图" onClick={onChangeBg} isLink />
        </div>

        {/* Group 3: Funds Management */}
        <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="px-4 pt-4 pb-2 text-xs text-gray-400 font-medium">资金管理</div>
            <SettingItem 
                icon={<div className="w-4 h-4 rounded-full border border-gray-900 flex items-center justify-center text-[10px] text-gray-900 font-bold">¥</div>} 
                label="权益类型" 
                value="安心攒" 
                onClick={() => onNavigate('rights')} 
                isLink
            />
            <SettingItem 
                icon={<CreditCard size={18} strokeWidth={1.5} />} 
                label="支出限额" 
                value={account.monthlyLimit > 0 ? `${account.monthlyLimit.toFixed(2)}元/月` : "不限额"} 
                onClick={() => onNavigate('limit')} 
                isLink
            />
            <SettingItem icon={<Lock size={18} strokeWidth={1.5} />} label="锁定余额" isLink />
        </div>

        {/* Group 4: Personal Settings */}
        <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="px-4 pt-4 pb-2 text-xs text-gray-400 font-medium">个人设置，仅对自己生效</div>
            <div className="flex justify-between items-center px-4 py-4 bg-white active:bg-gray-50 transition-colors">
               <span className="text-[15px] text-gray-900">资金变动时提醒我</span>
               <div 
                 onClick={() => setNotify(!notify)}
                 className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 cursor-pointer ${notify ? 'bg-[#1677FF]' : 'bg-gray-200'}`}
               >
                 <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${notify ? 'translate-x-5' : 'translate-x-0'}`}></div>
               </div>
            </div>
            <SettingItem label="轻松管控支付权限" value={<span className="text-xs text-gray-500 flex items-center gap-1">去设置 <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span></span>} isLink />
        </div>

        {/* Group 5: Lab */}
        <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
             <div className="px-4 pt-4 pb-2 text-xs text-gray-400 font-medium">实验室</div>
             <SettingItem 
                label="公开荷包，分享美好" 
                value={<span className="text-xs text-gray-500 flex items-center gap-1">去公开 <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span></span>} 
                isLink 
             />
        </div>

        {/* Group 6: Services (Customer Service, Guide, Export) */}
        <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
             <SettingItem label="我的客服" isLink />
             <SettingItem 
                label="使用指南" 
                value={<div className="bg-[#F53F3F] text-white text-[10px] px-1.5 h-4 flex items-center justify-center rounded-full font-bold">NEW</div>} 
                isLink 
             />
             <SettingItem label="导出账单" isLink />
        </div>

        {/* Delete Button */}
        <div className="pt-2 pb-6">
            <button className="w-full bg-white text-gray-900 font-medium text-[16px] py-3.5 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] active:bg-gray-50">
                注销当前小荷包
            </button>
        </div>

      </div>
    </div>
  );
};

const SettingItem = ({ icon, label, value, isLink, onClick }: any) => (
    <div className="flex justify-between items-center px-4 py-[1.1rem] bg-white active:bg-gray-50 transition-colors cursor-pointer" onClick={onClick}>
        <div className="flex items-center gap-3">
            {icon && <span className="text-gray-900">{icon}</span>}
            <span className="text-[16px] text-gray-900">{label}</span>
        </div>
        <div className="flex items-center gap-1">
            <span className="text-[14px] text-gray-400 tracking-wide flex items-center">{value}</span>
            {isLink && <ChevronRight size={18} className="text-gray-300 ml-1" />}
        </div>
    </div>
);
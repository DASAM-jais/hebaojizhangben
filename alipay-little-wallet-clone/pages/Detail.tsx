import React, { useState } from 'react';
import { ChevronLeft, Settings, Eye, EyeOff, CreditCard, PiggyBank, Gift, MoreHorizontal, Bell, LayoutGrid, Disc, FilePenLine, QrCode, ChevronDown } from 'lucide-react';
import { Account, Transaction } from '../types';
import { formatMoney } from '../App';

interface DetailViewProps {
  account: Account;
  onBack: () => void;
  onNavigate: (page: any) => void;
  onTransferIn: () => void;
  onTransferOut: () => void;
  onDeleteTrans: (id: number) => void;
  onChangeBg: () => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ account, onBack, onNavigate, onTransferIn, onTransferOut, onDeleteTrans, onChangeBg }) => {
  const [isEyeOpen, setEyeOpen] = useState(true);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 1. Top Navigation Bar (Fixed) */}
      <div className="px-4 py-3 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="flex items-center gap-3 flex-1 overflow-hidden">
            <button onClick={onBack} className="active:opacity-60">
                <ChevronLeft size={26} className="text-gray-900" />
            </button>
            <span className="text-xl font-normal text-gray-900 truncate">{account.name}</span>
        </div>
        <div className="flex items-center gap-5 text-gray-800 pl-4 shrink-0">
            <LayoutGrid size={24} strokeWidth={1.5} />
            <MoreHorizontal size={24} strokeWidth={1.5} />
            <Disc size={24} strokeWidth={1.5} />
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
          
          {/* 2. Sub-header (Avatar & Settings) */}
          <div className="px-5 py-2 flex justify-between items-center bg-white">
             {/* Left: Avatar */}
             <div className="w-9 h-9 rounded-full bg-gray-100 overflow-hidden border border-gray-100" onClick={(e) => { e.stopPropagation(); onNavigate('members'); }}>
                <img src={account.avatar} className="w-full h-full object-cover" alt="avatar" />
             </div>

             {/* Right: Bell & Settings */}
             <div className="flex gap-6 text-gray-700 items-center">
                <div className="relative">
                   <Bell size={24} strokeWidth={1.5} />
                   <div className="absolute top-0 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                </div>
                <Settings size={24} strokeWidth={1.5} onClick={() => onNavigate('settings')} />
             </div>
          </div>

          {/* 3. Main Card Area */}
          <div className="px-4 py-3 bg-white">
             <div 
                className="relative h-44 rounded-[20px] overflow-hidden shadow-sm active:scale-[0.99] transition-transform"
                onClick={onChangeBg}
             >
                {/* Background */}
                {account.bgType === 'image' ? (
                   <>
                    <img src={account.bgImage} className="w-full h-full object-cover" alt="bg" />
                    <div className="absolute inset-0 bg-black/10"></div>
                   </>
                ) : (
                   <div className={`w-full h-full ${account.bgColorClass}`}></div>
                )}

                {/* Card Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                   <div className="flex justify-between items-start">
                      <span className="text-[10px] font-medium bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/20">自己用</span>
                   </div>
                   
                   <div className="mt-auto mb-1">
                      <div className="flex items-center gap-2 text-xs opacity-90 mb-1 cursor-pointer w-max" onClick={(e) => {e.stopPropagation(); setEyeOpen(!isEyeOpen)}}>
                         总金额(元) {isEyeOpen ? <Eye size={12} /> : <EyeOff size={12}/>}
                      </div>
                      <div className="flex justify-between items-end">
                         <span className="text-[2.5rem] font-bold font-mono tracking-tight text-shadow-sm leading-none">
                            {isEyeOpen ? formatMoney(account.balance) : "****"}
                         </span>
                         <span className="text-xs opacity-90 mb-1 font-medium">收益已开启</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* 4. Action Buttons (Transfer) */}
          <div className="bg-white px-4 pb-6 pt-2">
             <div className="flex gap-3">
                <button onClick={onTransferOut} className="flex-1 h-[3.25rem] flex items-center justify-center bg-[#F7F8FA] text-[#1A1A1A] font-medium text-[17px] rounded-xl active:bg-gray-200 transition-colors">
                   转出
                </button>
                <button onClick={onTransferIn} className="flex-1 h-[3.25rem] flex items-center justify-center bg-[#F7F8FA] text-[#1A1A1A] font-medium text-[17px] rounded-xl active:bg-gray-200 transition-colors">
                   转入
                </button>
             </div>
          </div>

          {/* 5. Icon Grid */}
          <div className="bg-white px-3 pb-8 flex justify-between">
              <NavIcon icon={<CreditCard size={26} strokeWidth={1.5} />} label="付款" />
              <NavIcon icon={<QrCode size={26} strokeWidth={1.5} />} label="收款" />
              <NavIcon icon={<PiggyBank size={26} strokeWidth={1.5} />} label="攒钱" onClick={onTransferIn}/>
              <NavIcon icon={<FilePenLine size={26} strokeWidth={1.5} />} label="限额" onClick={() => onNavigate('limit')}/>
              <NavIcon icon={<Gift size={26} className="text-gray-800" strokeWidth={1.5} />} label="权益" onClick={() => onNavigate('rights')} badge />
          </div>

          {/* 6. Banner */}
          <div className="px-4 pb-6 bg-white">
              <div className="bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-xl p-3.5 flex items-center justify-between relative overflow-hidden">
                  <div className="flex-1 pr-2">
                      <div className="font-bold text-gray-900 text-[15px] mb-1">推荐开启定期权益</div>
                      <div className="text-xs text-gray-400">锁定一部分资金来赚取更大收益</div>
                  </div>
                  <button className="bg-[#FF7D00] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shrink-0 shadow-sm">去看看</button>
                  <button className="text-gray-300 ml-3 self-center p-1"><span className="text-lg leading-none">×</span></button>
              </div>
          </div>

          {/* 7. Transaction List */}
          <div className="bg-white min-h-[500px]">
             {/* List Tabs */}
             <div className="px-4 py-2 flex items-center gap-6 sticky top-0 bg-white z-10">
                <button className="font-bold text-gray-900 text-[17px] relative flex items-center gap-1">
                    账单 <ChevronDown size={12} className="text-orange-500 mt-0.5" strokeWidth={3} />
                </button>
                <button className="text-gray-500 text-[17px] font-medium">统计</button>
             </div>
             
             <div className="p-4 space-y-7">
                {account.transactions.length === 0 ? (
                    <div className="py-10 text-center text-gray-400 text-sm">暂无账单记录</div>
                ) : (
                    account.transactions.map(t => (
                        <TransactionItem key={t.id} t={t} onDelete={() => onDeleteTrans(t.id)} />
                    ))
                )}
             </div>
          </div>

      </div>
    </div>
  );
};

interface NavIconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  badge?: boolean;
}

const NavIcon: React.FC<NavIconProps> = ({ icon, label, onClick, badge }) => (
    <div className="flex flex-col items-center gap-2.5 text-gray-800 active:opacity-60 transition-opacity cursor-pointer min-w-[3.5rem]" onClick={onClick}>
        <div className="p-0.5 relative">
            {icon}
            {badge && <div className="absolute -top-0.5 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></div>}
        </div>
        <span className="text-[13px] font-medium text-gray-700">{label}</span>
    </div>
);

interface TransactionItemProps {
  t: Transaction;
  onDelete: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ t, onDelete }) => (
    <div className="flex justify-between items-start group">
        <div className="flex gap-3.5">
           <div className="w-[2.75rem] h-[2.75rem] rounded-full bg-gray-100 overflow-hidden border border-gray-100 shrink-0">
               <img src={t.avatar} alt="avatar" className="w-full h-full object-cover"/>
           </div>
           <div className="flex flex-col pt-0.5">
               <div className="font-medium text-gray-900 text-[15px] leading-tight mb-1.5">{t.title}</div>
               <div className="text-xs text-gray-400 truncate max-w-[180px] mb-1.5">{t.subtitle}</div>
               <div className="text-[11px] text-gray-300">{t.time}</div>
           </div>
        </div>
        <div className="text-right flex flex-col items-end pt-1">
            <div className={`font-bold font-mono text-[15px] ${t.amount > 0 ? 'text-[#F53F3F]' : 'text-gray-900'}`}>
                {t.amount > 0 ? `+${formatMoney(t.amount)}` : formatMoney(t.amount)}
            </div>
            <button onClick={onDelete} className="text-gray-300 p-2 -mr-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal size={16}/>
            </button>
        </div>
    </div>
);
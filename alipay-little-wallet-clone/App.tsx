import React, { useState, useRef } from 'react';
import { INITIAL_ACCOUNTS, INITIAL_BG, USER_AVATAR } from './constants';
import { Account, ModalState, PageRoute } from './types';
import { HomeView } from './pages/Home';
import { DetailView } from './pages/Detail';
import { SettingsView } from './pages/Settings';
import { LimitView } from './pages/Limit';
import { RightsView } from './pages/Rights';
import { MemberView } from './pages/Members';
import { NumberPad } from './components/NumberPad';
import { Image as ImageIcon, Camera, QrCode } from 'lucide-react';

// Utility
export const formatMoney = (num: number) => num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default function App() {
  const [pageStack, setPageStack] = useState<PageRoute[]>(['home']);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  
  // Global Avatar State - Shared by all wallets (User Profile Pic)
  const [userAvatar, setUserAvatar] = useState<string>(USER_AVATAR);
  
  // Mascot State - Independent for Home Page Top-Left (App Branding/Mascot)
  const [mascotAvatar, setMascotAvatar] = useState<string>(""); 

  const [amount, setAmount] = useState('');
  
  const [modalState, setModalState] = useState<ModalState>({
    transaction: false,
    qr: false,
    bgSelect: false,
    avatarSelect: false,
    mascotSelect: false,
    create: false
  });
  const [transType, setTransType] = useState<'in' | 'out'>('out');

  // Router Logic
  const currentPage = pageStack[pageStack.length - 1];
  const currentAccount = accounts.find(a => a.id === selectedAccountId);

  const navigateTo = (page: PageRoute) => setPageStack(prev => [...prev, page]);
  const goBack = () => {
    if (pageStack.length > 1) {
      setPageStack(prev => prev.slice(0, -1));
    }
  };

  const handleCardClick = (account: Account) => {
    setSelectedAccountId(account.id);
    navigateTo('detail');
  };

  const handleUpdateAccount = (updatedData: Partial<Account>) => {
    if (!currentAccount) return;
    
    // Intercept user avatar updates to handle them globally
    if (updatedData.avatar) {
        setUserAvatar(updatedData.avatar);
        // We don't strictly need to update individual accounts if we use the global state, 
        // but let's keep data consistent just in case.
        setAccounts(prev => prev.map(acc => ({ ...acc, avatar: updatedData.avatar! })));
    } else {
        setAccounts(prev => prev.map(acc => 
            acc.id === currentAccount.id ? { ...acc, ...updatedData } : acc
        ));
    }
  };

  // Transaction Logic
  const handleTransactionSubmit = () => {
    if (!currentAccount) return;
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    const isExpense = transType === 'out';
    const finalAmount = isExpense ? -numAmount : numAmount;

    // Check Limit
    if (isExpense && currentAccount.monthlyLimit > 0) {
      const currentMonthExpense = currentAccount.transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      if (currentMonthExpense + numAmount > currentAccount.monthlyLimit) {
        alert("超出月度限额，请注意消费！");
        return;
      }
    }

    const newTransaction = {
      id: Date.now(),
      title: "我",
      subtitle: isExpense ? "支出" : "收入",
      amount: finalAmount,
      time: "刚刚",
      avatar: userAvatar // Use global user avatar
    };

    setAccounts(prev => prev.map(acc => {
      if (acc.id === currentAccount.id) {
        return {
          ...acc,
          balance: acc.balance + finalAmount,
          transactions: [newTransaction, ...acc.transactions]
        };
      }
      return acc;
    }));
    setAmount('');
    setModalState(prev => ({ ...prev, transaction: false }));
  };

  const handleDeleteTransaction = (transId: number) => {
    if (!currentAccount) return;
    setAccounts(prev => prev.map(acc => acc.id === currentAccount.id ? {
      ...acc, transactions: acc.transactions.filter(t => t.id !== transId)
    } : acc));
  };

  // Render Page
  return (
    <div className="bg-gray-100 h-screen w-full max-w-md mx-auto overflow-hidden font-sans relative flex flex-col shadow-2xl">
      <div className="flex-1 overflow-hidden relative bg-[#F5F5F5]">
        {currentPage === 'home' && (
          <HomeView 
            accounts={accounts} 
            userAvatar={userAvatar}
            mascotAvatar={mascotAvatar}
            onCardClick={handleCardClick}
            onMascotClick={() => setModalState(prev => ({ ...prev, mascotSelect: true }))}
            onCreate={() => setModalState(prev => ({ ...prev, create: true }))} 
          />
        )}
        
        {currentPage === 'detail' && currentAccount && (
          <DetailView 
            account={{...currentAccount, avatar: userAvatar}} // Inject global avatar
            onBack={goBack}
            onNavigate={navigateTo}
            onTransferIn={() => { setTransType('in'); setModalState(prev => ({ ...prev, transaction: true })); }}
            onTransferOut={() => { setTransType('out'); setModalState(prev => ({ ...prev, transaction: true })); }}
            onDeleteTrans={handleDeleteTransaction}
            onChangeBg={() => setModalState(prev => ({ ...prev, bgSelect: true }))}
          />
        )}

        {currentPage === 'settings' && currentAccount && (
          <SettingsView 
            account={{...currentAccount, avatar: userAvatar}} 
            onBack={goBack} 
            onNavigate={navigateTo}
            onUpdate={handleUpdateAccount}
            onChangeBg={() => setModalState(prev => ({ ...prev, bgSelect: true }))}
          />
        )}

        {currentPage === 'limit' && currentAccount && (
          <LimitView 
            account={currentAccount} 
            onBack={goBack}
            onUpdate={handleUpdateAccount}
          />
        )}

        {currentPage === 'rights' && currentAccount && (
          <RightsView 
            account={currentAccount} 
            onBack={goBack} 
          />
        )}

        {currentPage === 'members' && currentAccount && (
          <MemberView 
            account={{...currentAccount, avatar: userAvatar}} 
            onBack={goBack}
            onChangeAvatar={() => setModalState(prev => ({ ...prev, avatarSelect: true }))}
          />
        )}
      </div>

      {/* --- Modals --- */}
      {modalState.transaction && (
        <NumberPad 
          amount={amount}
          type={transType} 
          onChange={setAmount}
          onClose={() => { setModalState(prev => ({ ...prev, transaction: false })); setAmount(''); }}
          onSubmit={handleTransactionSubmit}
        />
      )}
      
      {modalState.bgSelect && (
        <ImageSelectModal 
          title="更换背景图"
          desc="支持自定义上传图片作为荷包背景"
          icon={<ImageIcon size={32} className="mb-2 opacity-80" />}
          onClose={() => setModalState(prev => ({ ...prev, bgSelect: false }))}
          onSelect={(url) => {
            handleUpdateAccount({ bgImage: url, bgType: 'image' });
            setModalState(prev => ({ ...prev, bgSelect: false }));
          }}
        />
      )}

      {modalState.avatarSelect && (
        <ImageSelectModal
          title="更换用户头像"
          desc="更换您的个人头像，将同步到所有荷包 (全局生效)"
          icon={<Camera size={32} className="mb-1 opacity-80" />}
          onClose={() => setModalState(prev => ({ ...prev, avatarSelect: false }))}
          onSelect={(url) => {
            handleUpdateAccount({ avatar: url }); 
            setModalState(prev => ({ ...prev, avatarSelect: false }));
          }}
        />
      )}

      {modalState.mascotSelect && (
        <ImageSelectModal
          title="更换首页形象"
          desc="自定义首页左上角的小荷包形象"
          icon={<Camera size={32} className="mb-1 opacity-80" />}
          onClose={() => setModalState(prev => ({ ...prev, mascotSelect: false }))}
          onSelect={(url) => {
            setMascotAvatar(url);
            setModalState(prev => ({ ...prev, mascotSelect: false }));
          }}
        />
      )}

      {modalState.qr && <QrCodeModal onClose={() => setModalState(prev => ({ ...prev, qr: false }))} />}
      
      {modalState.create && (
        <CreateAccountModal 
            onClose={() => setModalState(prev => ({ ...prev, create: false }))} 
            onSubmit={(name) => {
                const newAcc: Account = { 
                    id: Date.now(), 
                    name: name || "新荷包", 
                    balance: 0, 
                    bgImage: INITIAL_BG, 
                    bgType: 'image',
                    avatar: userAvatar, // Use global avatar
                    monthlyLimit: 0,
                    role: 'admin',
                    type: 'personal',
                    transactions: []
                };
                setAccounts([...accounts, newAcc]);
                setModalState(prev => ({ ...prev, create: false }));
            }} 
        />
      )}
    </div>
  );
}

// Helpers for Modals
const ImageSelectModal = ({ onClose, onSelect, title, desc, icon }: any) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => onSelect(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="fixed inset-0 z-[70] bg-black/50 flex flex-col justify-end" onClick={onClose}>
            <div className="bg-white rounded-t-2xl p-4 animate-in slide-in-from-bottom duration-300" onClick={e => e.stopPropagation()}>
                <div className="text-center font-bold mb-6 text-lg text-gray-800">{title}</div>
                <div className="flex flex-col items-center justify-center py-6 gap-3">
                    <div onClick={() => fileInputRef.current?.click()} className="w-full h-40 rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 cursor-pointer active:bg-gray-100 transition-colors">
                        {icon}
                        <span className="text-sm font-medium">从相册选择</span>
                        <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
                    </div>
                    <p className="text-xs text-gray-400">{desc}</p>
                </div>
                <button onClick={onClose} className="w-full py-3 text-gray-600 font-medium border-t border-gray-100 mt-2 text-lg">取消</button>
            </div>
        </div>
    );
};

const QrCodeModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white p-8 rounded-2xl flex flex-col items-center gap-4 animate-in zoom-in duration-300">
            <QrCode size={200} className="text-gray-800" />
            <p className="text-gray-500 font-medium">扫码加入小荷包</p>
        </div>
    </div>
);

const CreateAccountModal = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: (val: string) => void }) => {
    const [v, s] = useState('');
    return (
        <div className="fixed inset-0 z-[80] bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white p-6 rounded-2xl w-80 shadow-2xl animate-in zoom-in duration-200">
                <h3 className="font-bold text-lg mb-6 text-gray-900">新建小荷包</h3>
                <input autoFocus className="border-b-2 border-blue-500 w-full mb-8 text-xl p-2 outline-none text-gray-900 placeholder:text-gray-300" placeholder="给荷包起个名" value={v} onChange={e => s(e.target.value)} />
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2.5 rounded-lg text-gray-500 font-medium hover:bg-gray-50">取消</button>
                    <button onClick={() => onSubmit(v)} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-bold shadow-blue-200 shadow-lg active:scale-95 transition-transform">创建</button>
                </div>
            </div>
        </div>
    );
};
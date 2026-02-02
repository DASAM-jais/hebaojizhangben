import React from 'react';
import { Delete, ChevronDown } from 'lucide-react';

interface NumberPadProps {
  amount: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  type: 'in' | 'out';
}

export const NumberPad: React.FC<NumberPadProps> = ({ amount, onChange, onSubmit, onClose, type }) => {
  const handleNum = (n: string) => {
    if (n === 'back') {
      onChange(amount.slice(0, -1));
    } else if (n === '.') {
      if (!amount.includes('.')) onChange(amount + n);
    } else {
      if (amount.includes('.') && amount.split('.')[1].length >= 2) return;
      onChange(amount + n);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/40 backdrop-blur-[1px]">
      <div className="bg-gray-100 rounded-t-2xl flex flex-col animate-in slide-in-from-bottom duration-300 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-3 flex justify-between items-center bg-gray-50 border-b border-gray-100">
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <ChevronDown size={24} />
          </button>
          <span className="font-bold text-gray-800 text-lg">{type === 'in' ? '转入金额' : '转出金额'}</span>
          <div className="w-10"></div>
        </div>

        {/* Display */}
        <div className="px-6 py-8 bg-white text-center flex flex-col items-center border-b border-gray-100">
             <div className="flex items-baseline gap-1 text-gray-900">
                <span className="text-3xl font-bold">¥</span>
                <span className="text-5xl font-bold font-mono tracking-tight">{amount || '0.00'}</span>
             </div>
             {type === 'out' && <span className="text-xs text-gray-400 mt-2 bg-gray-50 px-2 py-0.5 rounded">使用余额支付</span>}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-[1px] bg-gray-200">
          {[1, 2, 3].map(n => (
            <button key={n} onClick={() => handleNum(n.toString())} className="bg-white h-16 text-2xl font-medium active:bg-gray-50 text-gray-800">
              {n}
            </button>
          ))}
          <button onClick={() => handleNum('back')} className="bg-white h-16 flex items-center justify-center active:bg-gray-50 text-gray-800">
            <Delete size={24} />
          </button>

          {[4, 5, 6].map(n => (
            <button key={n} onClick={() => handleNum(n.toString())} className="bg-white h-16 text-2xl font-medium active:bg-gray-50 text-gray-800">
              {n}
            </button>
          ))}
          <button className="bg-orange-50 h-16 text-orange-500 font-medium text-sm active:bg-orange-100 row-span-2 flex items-center justify-center flex-col leading-tight">
            <span>备注</span>
          </button>

          {[7, 8, 9].map(n => (
            <button key={n} onClick={() => handleNum(n.toString())} className="bg-white h-16 text-2xl font-medium active:bg-gray-50 text-gray-800">
              {n}
            </button>
          ))}
          
          <button onClick={() => handleNum('.')} className="bg-white h-16 text-2xl font-bold pb-2 active:bg-gray-50 text-gray-800">.</button>
          <button onClick={() => handleNum('0')} className="bg-white h-16 text-2xl font-medium active:bg-gray-50 text-gray-800">0</button>
          <div className="bg-white h-16"></div> {/* Empty slot */}

          {/* Confirm Button spans 2 columns height in last col */}
          <button 
            onClick={onSubmit} 
            className="col-start-4 row-start-2 row-end-5 bg-blue-600 text-white font-bold text-xl active:bg-blue-700 flex items-center justify-center"
            style={{ gridRow: '3 / 5'}}
          >
            确定
          </button>
        </div>
        <div className="bg-white h-safe-bottom w-full"></div>
      </div>
    </div>
  );
};
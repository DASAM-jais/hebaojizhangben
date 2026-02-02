import { Account } from './types';

// Using high-quality placeholder images
export const INITIAL_BG = "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=800&auto=format&fit=crop"; 
export const DRAGON_BG = "https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=800&auto=format&fit=crop";
export const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";
export const USER_AVATAR = "https://api.dicebear.com/7.x/notionists/svg?seed=Alex";

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 1,
    name: "还款备用金",
    balance: 2320.03,
    bgImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop",
    bgType: 'image',
    avatar: USER_AVATAR,
    monthlyLimit: 10000.00,
    role: 'admin',
    type: 'personal',
    transactions: [
      { id: 1, title: "相酌", subtitle: "花呗主动还款-2026年02月账单", amount: -837.11, time: "今天 21:05", avatar: USER_AVATAR },
      { id: 2, title: "相酌", subtitle: "粤父隆江猪脚饭", amount: -20.00, time: "今天 19:36", avatar: USER_AVATAR },
      { id: 3, title: "相酌", subtitle: "转出到银行卡", amount: -1722.36, time: "今天 19:05", avatar: USER_AVATAR }
    ]
  },
  {
    id: 2,
    name: "浅酌清酒，静品温茶",
    balance: 0.00,
    bgImage: DRAGON_BG,
    bgType: 'image',
    avatar: USER_AVATAR,
    monthlyLimit: 0,
    role: 'admin',
    type: 'personal',
    transactions: [
      { id: 4, title: "相酌", subtitle: "磨合煎饼·饭团·烤冷面(科大店)外卖订单", amount: -14.59, time: "01-28 14:05", avatar: USER_AVATAR },
      { id: 5, title: "相酌", subtitle: "转出到银行卡", amount: -1.00, time: "01-28 13:00", avatar: USER_AVATAR }
    ]
  },
  {
    id: 3,
    name: "团队经费",
    balance: 0.00,
    bgImage: "", 
    bgType: 'gradient',
    bgColorClass: "bg-gradient-to-br from-yellow-300 to-yellow-500",
    avatar: USER_AVATAR,
    monthlyLimit: 5000,
    role: 'admin',
    type: 'group',
    transactions: []
  }
];
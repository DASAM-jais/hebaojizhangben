export interface Transaction {
  id: number;
  title: string;
  subtitle: string;
  amount: number;
  time: string;
  avatar: string;
}

export interface Account {
  id: number;
  name: string;
  balance: number;
  bgImage: string;
  bgType?: 'image' | 'gradient'; // To support the yellow "Team Funds" style
  bgColorClass?: string;
  avatar: string;
  monthlyLimit: number;
  transactions: Transaction[];
  role: 'admin' | 'member';
  type: 'personal' | 'group';
}

export type PageRoute = 'home' | 'detail' | 'settings' | 'limit' | 'rights' | 'members';

export interface ModalState {
  transaction: boolean;
  qr: boolean;
  bgSelect: boolean;
  avatarSelect: boolean;
  mascotSelect: boolean;
  create: boolean;
}
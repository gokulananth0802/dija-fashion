import React from 'react';
import { Phone, MessageCircle, Lock, ShoppingBag, Heart } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { Language } from '../types';

interface MobileBottomNavProps {
  language: Language;
  onOpenAdmin: () => void;
  onOpenInquiryBag: () => void;
  inquiryCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  language,
  onOpenAdmin,
  onOpenInquiryBag,
  inquiryCount
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t-2 border-[#D4AF37] px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-4 gap-2 items-center text-center">
        
        {/* Action 1: Call Store */}
        <a
          href={`tel:${STORE_INFO.phone}`}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 hover:bg-gray-100 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-[#0A3A2A]" />
          <span className="text-[10px] font-bold mt-0.5">{language === 'EN' ? 'Call Us' : 'அழைக்க'}</span>
        </a>

        {/* Action 2: WhatsApp Order Now (Primary Accent) */}
        <a
          href={getGeneralWhatsAppUrl('Hi Dija Fashion! I would like to make an inquiry and check available collections.')}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-2 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0A3A2A] text-white font-bold text-xs shadow-md active:scale-95 transition-all"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
          <span>{language === 'EN' ? 'WhatsApp Order' : 'வாட்ஸ்அப் ஆர்டர்'}</span>
        </a>

        {/* Action 3: Bag or Owner Login */}
        <button
          onClick={inquiryCount > 0 ? onOpenInquiryBag : onOpenAdmin}
          className="relative flex flex-col items-center justify-center p-1.5 rounded-xl bg-amber-50 border border-amber-300 text-[#0A3A2A] active:scale-95 transition-all"
        >
          {inquiryCount > 0 ? (
            <>
              <ShoppingBag className="w-4 h-4 text-[#0A3A2A]" />
              <span className="text-[10px] font-bold mt-0.5">Bag ({inquiryCount})</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#800000] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {inquiryCount}
              </span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 text-[#0A3A2A]" />
              <span className="text-[10px] font-bold mt-0.5">Owner</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
};

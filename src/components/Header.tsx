import React, { useState, useEffect } from 'react';
import { Search, Phone, Heart, ShoppingBag, Lock, Sparkles, X, Globe, Star, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';
import { Language } from '../types';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  language: Language;
  toggleLanguage: () => void;
  wishlistCount: number;
  openWishlist: () => void;
  inquiryCount: number;
  openInquiryTray: () => void;
  openAdminModal: () => void;
  activeCategory: string;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  language,
  toggleLanguage,
  wishlistCount,
  openWishlist,
  inquiryCount,
  openInquiryTray,
  openAdminModal
}) => {
  const [currentMarqueeIndex, setCurrentMarqueeIndex] = useState(0);

  const announcements = [
    language === 'EN' 
      ? '✨ Visit Our Store at Karungalpalayam, Erode | 🛍️ Collections Starting @ ₹380'
      : '✨ ஈரோடு கருங்கல்பாளையம் கிளையில் நேரில் வாருங்கள் | 🛍️ ஆடைகள் ₹380 முதல்',
    language === 'EN'
      ? '🚚 Free Same-Day Local Delivery in Erode Area | 💬 Cash On Delivery Available'
      : '🚚 ஈரோட்டில் இலவச உள்ளூர் டெலிவரி | 💬 கேஷ் ஆன் டெலிவரி வசதி உண்டு',
    language === 'EN'
      ? '📞 WhatsApp Quick Orders & Video Calling: +91 63740 52425'
      : '📞 வாட்ஸ்அப் மூலம் உடனடியாக ஆர்டர் செய்ய: +91 63740 52425'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMarqueeIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-[#EADBB2]/50">
      {/* Top Announcement Bar */}
      <div className="bg-[#0A3A2A] text-[#F3E5AB] py-1.5 px-4 text-xs font-medium transition-all duration-500 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0 text-center sm:text-left">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse shrink-0 hidden sm:inline" />
            <span className="tracking-wide animate-fade-in font-sans">
              {announcements[currentMarqueeIndex]}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs text-[#EADBB2]">
            <a 
              href={getGeneralWhatsAppUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +91 63740 52425</span>
            </a>
            <span className="text-[#0A3A2A]/40">|</span>
            <span className="text-amber-200/90 font-mono">Erode 638003</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0A3A2A] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-gold group-hover:scale-105 transition-transform">
              <span className="font-serif text-xl font-bold tracking-tighter">DF</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0A3A2A] tracking-tight group-hover:text-[#B8860B] transition-colors">
                  Dija Fashion
                </h1>
                <span className="hidden md:inline-block px-1.5 py-0.5 text-[10px] uppercase font-semibold bg-[#FDF2F0] text-[#800000] border border-[#800000]/20 rounded-full">
                  Erode Boutique
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#666666] hidden sm:block font-sans tracking-wide">
                {language === 'EN' ? "Erode's Premier Ethnic & Fusion Boutique" : "ஈரோட்டின் முதன்மை பெண்கள் ஆடை நிலையம்"}
              </p>
            </div>
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg relative hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder={language === 'EN' ? "Search Organza, Anarkali, Soft Silk Sarees, Tops..." : "குர்தி, புடவை, டாப்ஸ் தேடுக..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 text-sm bg-[#FCFBF7] border border-[#D4AF37]/40 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0A3A2A] focus:border-transparent text-[#1A1A1A] placeholder-[#888888] shadow-inner transition-all"
              />
              <Search className="w-4 h-4 text-[#0A3A2A]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-200 text-gray-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Badges & Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Google Rated Pill */}
            <a 
              href="#reviews"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium hover:bg-amber-100 transition-colors"
              title="5.0 Rated on Google Reviews"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="font-semibold">{STORE_INFO.googleRating} ★</span>
              <span className="text-[10px] text-amber-700">Google Rated</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-full border border-[#D4AF37]/60 text-[#0A3A2A] bg-[#FCFBF7] hover:bg-[#0A3A2A] hover:text-[#D4AF37] transition-all shadow-xs"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'EN' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Direct Call Button */}
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-[#0A3A2A] text-white hover:bg-[#12533e] transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Call Store</span>
            </a>

            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              className="relative p-2 text-[#0A3A2A] hover:text-[#D4AF37] hover:bg-[#FDF2F0] rounded-full transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#800000] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Order Tray / Cart */}
            <button
              onClick={openInquiryTray}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FCFBF7] border border-[#0A3A2A]/30 text-[#0A3A2A] font-semibold text-xs hover:border-[#0A3A2A] transition-all"
              title="Inquiry Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#0A3A2A]" />
              <span className="hidden sm:inline">Bag</span>
              {inquiryCount > 0 && (
                <span className="w-4 h-4 bg-[#0A3A2A] text-[#D4AF37] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {inquiryCount}
                </span>
              )}
            </button>

            {/* Owner Admin Login Button */}
            <button
              onClick={openAdminModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium text-xs shadow-xs hover:from-amber-700 hover:to-amber-800 transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-amber-200" />
              <span className="hidden sm:inline">Owner Login</span>
              <span className="sm:hidden">Owner</span>
            </button>

          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder={language === 'EN' ? "Search Organza, Anarkali, Sarees, Kurtis..." : "ஆடைகள் தேடுக..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#FCFBF7] border border-[#D4AF37]/50 rounded-full focus:outline-none focus:ring-1 focus:ring-[#0A3A2A] text-[#1A1A1A]"
            />
            <Search className="w-4 h-4 text-[#0A3A2A]/60 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

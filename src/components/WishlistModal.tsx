import React from 'react';
import { X, Heart, Trash2, MessageCircle, Eye } from 'lucide-react';
import { Product, Language } from '../types';
import { getProductWhatsAppUrl, formatINR } from '../utils/whatsapp';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  language: Language;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onQuickView,
  language
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#D4AF37] max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0A3A2A] text-white p-4 flex items-center justify-between border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400 fill-current" />
            <h3 className="font-serif font-bold text-lg text-white">
              {language === 'EN' ? `My Saved Wishlist (${wishlist.length})` : `விருப்பப்பட்டியல் (${wishlist.length})`}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-[#FCFBF7]">
          {wishlist.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="font-semibold text-sm text-[#0A3A2A]">Your Wishlist is Empty</p>
              <p className="text-xs text-gray-400 mt-1">Click the heart icon on any product to save items for later.</p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between gap-3 shadow-xs"
              >
                <img src={product.image} alt={product.title} className="w-14 h-14 object-cover rounded-lg border" />
                <div className="flex-1">
                  <h4 className="font-serif font-bold text-xs text-[#1A1A1A] line-clamp-1">
                    {language === 'EN' ? product.title : (product.titleTamil || product.title)}
                  </h4>
                  <p className="text-xs font-bold text-[#0A3A2A]">{formatINR(product.price)}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{product.category}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onQuickView(product)}
                    className="p-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                    title="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <a
                    href={getProductWhatsAppUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-[#0A3A2A] text-emerald-400 hover:bg-[#12533e]"
                    title="Order on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-white border-t border-gray-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-bold text-[#0A3A2A] bg-amber-50 rounded-lg hover:bg-amber-100"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};

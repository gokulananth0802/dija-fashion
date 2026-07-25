import React from 'react';
import { X, ShoppingBag, Trash2, MessageCircle, Truck, ArrowRight } from 'lucide-react';
import { Product, Language } from '../types';
import { STORE_INFO } from '../data/initialData';
import { formatINR } from '../utils/whatsapp';

export interface InquiryBagItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

interface InquiryTrayModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InquiryBagItem[];
  onRemoveItem: (productId: string, size: string) => void;
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onClearBag: () => void;
  language: Language;
}

export const InquiryTrayModal: React.FC<InquiryTrayModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearBag,
  language
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const generateBulkWhatsAppLink = () => {
    let text = `Hi Dija Fashion! I would like to place an order/inquiry for the following items:\n\n`;
    items.forEach((item, index) => {
      text += `${index + 1}. *${item.product.title}*\n   - Size: ${item.selectedSize}\n   - Qty: ${item.quantity}\n   - Price: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}\n\n`;
    });
    text += `*Total Estimated Amount:* ₹${totalAmount.toLocaleString('en-IN')}\n`;
    text += `Please confirm stock availability and local delivery details in Erode!`;

    return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#D4AF37] max-h-[88vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0A3A2A] text-white p-4 flex items-center justify-between border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif font-bold text-lg text-white">
              {language === 'EN' ? `Inquiry Bag (${items.length} Items)` : `விசாரணை பை (${items.length} ஆடைகள்)`}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-[#FCFBF7]">
          {items.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="font-semibold text-sm text-[#0A3A2A]">Your Inquiry Bag is Empty</p>
              <p className="text-xs text-gray-400 mt-1">Add products to build a consolidated WhatsApp order.</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${idx}`}
                className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between gap-3 shadow-xs"
              >
                <img src={item.product.image} alt={item.product.title} className="w-14 h-14 object-cover rounded-lg border" />
                <div className="flex-1">
                  <h4 className="font-serif font-bold text-xs text-[#1A1A1A] line-clamp-1">
                    {language === 'EN' ? item.product.title : (item.product.titleTamil || item.product.title)}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 my-0.5">
                    <span className="bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 font-semibold text-[#0A3A2A]">
                      Size: {item.selectedSize}
                    </span>
                    <span className="font-bold text-[#0A3A2A]">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                      className="w-5 h-5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded font-bold text-xs flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                      className="w-5 h-5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded font-bold text-xs flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                  className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-gray-200 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-gray-700">Estimated Total:</span>
              <span className="font-serif font-extrabold text-lg text-[#0A3A2A]">{formatINR(totalAmount)}</span>
            </div>

            <a
              href={generateBulkWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-full bg-[#0A3A2A] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#12533e] transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>Send Multi-Item WhatsApp Order ({items.length})</span>
            </a>

            <button
              onClick={onClearBag}
              className="w-full text-center text-xs text-red-600 hover:underline"
            >
              Clear Inquiry Bag
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Heart, Eye, MessageCircle, Check, Tag, AlertCircle, ShoppingBag } from 'lucide-react';
import { Product, Language } from '../types';
import { getProductWhatsAppUrl, formatINR, calculateDiscount } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  language: Language;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToInquiryBag: (product: Product, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToInquiryBag
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Free Size');
  const discountPercent = calculateDiscount(product.price, product.mrp);

  const getTagStyle = (tag?: string) => {
    switch (tag) {
      case 'NEW ARRIVAL':
        return 'bg-[#0A3A2A] text-[#F3E5AB] border-[#D4AF37]/50';
      case 'BESTSELLER':
        return 'bg-[#800000] text-white border-red-300';
      case 'LIMITED STOCK':
        return 'bg-amber-700 text-white border-amber-400';
      case 'WHOLESALE AVAILABLE':
        return 'bg-blue-800 text-white border-blue-300';
      default:
        return 'bg-[#0A3A2A] text-white';
    }
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-[#EADBB2]/50 shadow-luxury hover:shadow-gold transition-all duration-300 flex flex-col justify-between">
      
      {/* Product Image & Top Overlays */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FCFBF7]">
        
        {/* Main Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Top Badges overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {product.tag ? (
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border shadow-xs pointer-events-auto ${getTagStyle(product.tag)}`}>
              {product.tag}
            </span>
          ) : (
            <span />
          )}

          {/* Wishlist Heart Button */}
          <button
            onClick={() => onToggleWishlist(product)}
            className={`p-2 rounded-full backdrop-blur-md shadow-md transition-all pointer-events-auto active:scale-90 ${
              isWishlisted
                ? 'bg-[#800000] text-white'
                : 'bg-white/80 hover:bg-white text-gray-700 hover:text-[#800000]'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-x-0 bottom-3 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
          <button
            onClick={() => onQuickView(product)}
            className="w-full py-2 px-3 rounded-lg bg-white/95 backdrop-blur-md text-[#0A3A2A] font-semibold text-xs shadow-md border border-[#D4AF37]/50 hover:bg-[#0A3A2A] hover:text-[#D4AF37] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{language === 'EN' ? 'Quick View' : 'முன்னோட்டம்'}</span>
          </button>
        </div>

        {/* Stock Status Badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-3 py-1.5 bg-[#800000] text-white text-xs font-bold rounded-full uppercase tracking-wider border border-white/30">
              {language === 'EN' ? 'Sold Out' : 'கையிருப்பில் இல்லை'}
            </span>
          </div>
        )}
      </div>

      {/* Product Details Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white">
        
        <div>
          {/* Category & Stock Indicator */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span className="font-medium text-[#0A3A2A]/80 uppercase tracking-wide">
              {product.category}
            </span>

            {/* Stock indicator */}
            {product.inStock ? (
              <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === 'EN' ? 'In Stock' : 'கையிருப்பில் உள்ளது'}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-600 font-semibold text-[10px]">
                <AlertCircle className="w-3 h-3" />
                <span>{language === 'EN' ? 'Out of Stock' : 'கையிருப்பில் இல்லை'}</span>
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif text-sm sm:text-base font-bold text-[#1A1A1A] line-clamp-2 hover:text-[#0A3A2A] cursor-pointer transition-colors leading-snug mb-2"
          >
            {language === 'EN' ? product.title : (product.titleTamil || product.title)}
          </h3>

          {/* Size Quick Selector */}
          <div className="flex items-center gap-1 flex-wrap my-2">
            <span className="text-[10px] text-gray-500 font-medium mr-1">
              {language === 'EN' ? 'Size:' : 'அளவு:'}
            </span>
            {product.sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`px-1.5 py-0.5 text-[10px] rounded font-semibold border transition-all ${
                  selectedSize === sz
                    ? 'bg-[#0A3A2A] text-[#D4AF37] border-[#0A3A2A]'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base sm:text-lg font-bold text-[#0A3A2A]">
              {formatINR(product.price)}
            </span>
            {product.mrp > product.price && (
              <>
                <span className="text-xs text-gray-400 line-through">
                  {formatINR(product.mrp)}
                </span>
                <span className="text-[10px] font-bold text-[#800000] bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>
        </div>

        {/* Buttons Action Area */}
        <div className="mt-3.5 space-y-2 pt-2 border-t border-gray-100">
          
          {/* Primary Action — WhatsApp Direct Order */}
          <a
            href={getProductWhatsAppUrl(product, selectedSize)}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-2.5 px-3 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 ${
              product.inStock
                ? 'bg-[#0A3A2A] text-white hover:bg-[#12533e] hover:shadow-emerald-900/20'
                : 'bg-gray-200 text-gray-500 pointer-events-none'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{language === 'EN' ? 'Order on WhatsApp' : 'வாட்ஸ்அப்பில் ஆர்டர் செய்ய'}</span>
          </a>

          {/* Quick View / Add to Bag */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => onQuickView(product)}
              className="w-full py-1.5 px-2 rounded-full border border-gray-300 text-gray-700 hover:border-[#0A3A2A] hover:text-[#0A3A2A] text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{language === 'EN' ? 'Details' : 'விவரங்கள்'}</span>
            </button>

            <button
              onClick={() => onAddToInquiryBag(product, selectedSize)}
              className="w-full py-1.5 px-2 rounded-full bg-[#FCFBF7] border border-[#D4AF37] text-[#0A3A2A] hover:bg-[#0A3A2A] hover:text-[#D4AF37] text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{language === 'EN' ? '+ Add Bag' : '+ பையில் சேர்'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { X, MessageCircle, Heart, Share2, Check, ShieldCheck, Truck, RefreshCw, Ruler, Tag, Sparkles } from 'lucide-react';
import { Product, Language } from '../types';
import { getProductWhatsAppUrl, formatINR, calculateDiscount } from '../utils/whatsapp';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  language: Language;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToInquiryBag: (product: Product, size: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  language,
  isWishlisted,
  onToggleWishlist,
  onAddToInquiryBag
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Free Size');
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [showSizeChart, setShowSizeChart] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const discountPercent = calculateDiscount(product.price, product.mrp);
  const imagesList = [product.image, ...(product.additionalImages || [])];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#D4AF37]/40 max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black transition-colors shadow-md"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image Gallery */}
        <div className="w-full md:w-1/2 bg-[#FCFBF7] p-4 flex flex-col justify-between">
          <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-gray-100 shadow-inner group">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-105"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 px-3 py-1 bg-[#0A3A2A] text-[#F3E5AB] text-xs font-bold rounded-full border border-[#D4AF37]">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {imagesList.length > 1 && (
            <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
              {imagesList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === imgUrl ? 'border-[#0A3A2A] ring-2 ring-[#D4AF37]' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            
            {/* Category & Item Code */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span className="font-semibold text-[#0A3A2A] uppercase tracking-wider">
                {product.category}
              </span>
              {product.code && (
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-[10px]">
                  Code: {product.code}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] leading-snug mb-2">
              {language === 'EN' ? product.title : (product.titleTamil || product.title)}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 my-3 p-3 rounded-xl bg-[#FCFBF7] border border-[#EADBB2]/60">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0A3A2A]">
                {formatINR(product.price)}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    {formatINR(product.mrp)}
                  </span>
                  <span className="px-2 py-0.5 bg-[#800000] text-white text-xs font-bold rounded-full">
                    SAVE {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Sizes & Size Guide Link */}
            <div className="my-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0A3A2A] uppercase tracking-wider">
                  {language === 'EN' ? 'Select Size:' : 'அளவு தேர்வு செய்க:'}
                </span>
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="text-xs font-semibold text-[#800000] hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{language === 'EN' ? 'Size Guide Table' : 'அளவு அட்டவணை'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedSize === sz
                        ? 'bg-[#0A3A2A] text-[#D4AF37] border-2 border-[#D4AF37] shadow-sm'
                        : 'bg-white text-gray-800 border border-gray-300 hover:border-[#0A3A2A]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric & Care Instructions */}
            <div className="my-4 p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{language === 'EN' ? 'Fabric & Care Details:' : 'துணி மற்றும் பராமரிப்பு:'}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {language === 'EN' ? product.fabricCare : (product.fabricCareTamil || product.fabricCare)}
              </p>
            </div>

            {/* Description */}
            <div className="my-3 text-xs text-gray-600 leading-relaxed">
              <p>{language === 'EN' ? product.description : (product.descriptionTamil || product.description)}</p>
            </div>

          </div>

          {/* Action Area */}
          <div className="pt-4 border-t border-gray-200 space-y-2.5">
            
            {/* Primary Order Button */}
            <a
              href={getProductWhatsAppUrl(product, selectedSize)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-full bg-[#0A3A2A] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#12533e] transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>
                {language === 'EN' 
                  ? `Order Size ${selectedSize} on WhatsApp` 
                  : `வாட்ஸ்அப்பில் ஆர்டர் செய்ய (${selectedSize})`}
              </span>
            </a>

            {/* Secondary Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onAddToInquiryBag(product, selectedSize)}
                className="py-2 px-3 rounded-full bg-[#FCFBF7] border border-[#0A3A2A] text-[#0A3A2A] font-semibold text-xs hover:bg-[#0A3A2A] hover:text-[#D4AF37] transition-all"
              >
                + Add to Inquiry Bag
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`py-2 px-3 rounded-full border font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  isWishlisted
                    ? 'bg-[#800000] text-white border-[#800000]'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-[#800000]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'Wishlisted' : 'Save Wishlist'}</span>
              </button>
            </div>

            {/* Share link */}
            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <Truck className="w-3.5 h-3.5" />
                <span>Free Erode Delivery Available</span>
              </span>

              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-[#0A3A2A] hover:underline"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Size Chart Modal Sub-Overlay */}
      {showSizeChart && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#D4AF37]">
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <h3 className="font-serif font-bold text-lg text-[#0A3A2A]">
                Women's Size Guide (Inches)
              </h3>
              <button onClick={() => setShowSizeChart(false)} className="p-1 text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0A3A2A] text-[#D4AF37]">
                    <th className="p-2 border border-emerald-900">Size</th>
                    <th className="p-2 border border-emerald-900">Bust (in)</th>
                    <th className="p-2 border border-emerald-900">Waist (in)</th>
                    <th className="p-2 border border-emerald-900">Hip (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-bold">S</td>
                    <td className="p-2">34 - 36</td>
                    <td className="p-2">28 - 30</td>
                    <td className="p-2">38 - 40</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-2 font-bold">M</td>
                    <td className="p-2">38 - 40</td>
                    <td className="p-2">32 - 34</td>
                    <td className="p-2">42 - 44</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-bold">L</td>
                    <td className="p-2">42 - 44</td>
                    <td className="p-2">36 - 38</td>
                    <td className="p-2">46 - 48</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-2 font-bold">XL</td>
                    <td className="p-2">46 - 48</td>
                    <td className="p-2">40 - 42</td>
                    <td className="p-2">50 - 52</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-bold">XXL</td>
                    <td className="p-2">50 - 52</td>
                    <td className="p-2">44 - 46</td>
                    <td className="p-2">54 - 56</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-gray-500 mt-3 italic">
              Note: For custom fitting or alteration queries, WhatsApp us directly before ordering.
            </p>

            <button
              onClick={() => setShowSizeChart(false)}
              className="mt-4 w-full py-2 bg-[#0A3A2A] text-white rounded-lg text-xs font-bold"
            >
              Close Size Chart
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

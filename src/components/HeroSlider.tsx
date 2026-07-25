import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { Language } from '../types';

interface HeroSliderProps {
  language: Language;
  onShopClick: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ language, onShopClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1600',
      title: language === 'EN' ? 'Elegance Redefined in Erode' : 'ஈரோட்டில் நேர்த்தி மற்றும் அழகு',
      subtitle: language === 'EN' ? 'Royal Organza Anarkalis & Festive Wear starting at ₹380' : 'ராயல் ஆர்கன்சா அனார்கலிகள் மற்றும் ஆடைகள் ₹380 முதல்',
      badge: 'NEW SEASON ARRIVALS 2026'
    },
    {
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1600',
      title: language === 'EN' ? 'Kanchipuram Soft Silk Sarees' : 'காஞ்சிபுரம் சாஃப்ட் சில்க் புடவைகள்',
      subtitle: language === 'EN' ? 'Rich zari weave for wedding & temple occasions in Karungalpalayam' : 'சுப நிகழ்ச்சிகளுக்கு உகந்த மரபுசார் புடவைகள்',
      badge: 'ERODE POPULAR CHOICE'
    },
    {
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1600',
      title: language === 'EN' ? 'Party Wear & Designer Lehengas' : 'பார்ட்டி வேர் & டிசைனர் லெஹங்கா',
      subtitle: language === 'EN' ? 'Intricate embroidery with instant WhatsApp order & size preview' : 'வாட்ஸ்அப் மூலமாக நேரடி முன்பதிவு செய்யலாம்',
      badge: 'EXCLUSIVE FESTIVE WEAR'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden bg-[#0A3A2A]">
      {/* Background Image Carousel with Overlay */}
      <div className="relative h-[480px] sm:h-[540px] md:h-[580px] w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
            />
            {/* Rich Luxury Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A3A2A]/90 via-[#0A3A2A]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A3A2A] via-transparent to-black/30" />
          </div>
        ))}

        {/* Content Box */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 flex flex-col justify-center">
          <div className="max-w-2xl text-white space-y-4 pt-4">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] backdrop-blur-md text-[#F3E5AB] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{slides[currentSlide].badge}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
              {language === 'EN' ? (
                <>
                  Discover Your Style at <br />
                  <span className="text-gold-gradient font-serif">Dija Fashion</span>
                </>
              ) : (
                <>
                  உங்கள் அழகை மிளிரச்செய்யும் <br />
                  <span className="text-gold-gradient font-serif">டிஜா ஃபேஷன்</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-amber-100/90 font-sans max-w-xl leading-relaxed">
              {language === 'EN' 
                ? 'Erode\'s trusted destination for Women\'s Ethnic & Fusion Wear. High quality Sarees, Anarkalis, Kurtis & Tops starting at ₹380.'
                : 'ஈரோட்டின் விசுவாசமான பெண்கள் ஆடை நிலையம். சிறந்த தரத்தில் அனார்கலி, புடவைகள், குர்தி மற்றும் டாப்ஸ் ₹380 முதல்.'}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onShopClick}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold-gradient text-[#0A3A2A] font-bold text-sm sm:text-base shadow-gold hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-[#0A3A2A]" />
                <span>{language === 'EN' ? 'Shop New Arrivals' : 'புதிய ஆடைகள் பார்க்க'}</span>
              </button>

              <a
                href={getGeneralWhatsAppUrl('Hi Dija Fashion! I would like to make an inquiry and check available collections.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600/90 border border-emerald-400 text-white font-bold text-sm sm:text-base hover:bg-emerald-500 transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-5 h-5 text-emerald-300" />
                <span>{language === 'EN' ? 'WhatsApp Direct Order' : 'வாட்ஸ்அப் ஆர்டர் செய்ய'}</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-white/15 grid grid-cols-3 gap-2 sm:gap-4 text-white/90 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="truncate">{language === 'EN' ? 'Cash on Delivery' : 'கேஷ் ஆன் டெலிவரி'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="truncate">{language === 'EN' ? 'Free Erode Delivery' : 'ஈரோடு இலவச டெலிவரி'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="truncate">{language === 'EN' ? 'Easy 7-Day Exchange' : '7 நாள் எளிதான மாற்று'}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Slider Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors backdrop-blur-xs"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors backdrop-blur-xs"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

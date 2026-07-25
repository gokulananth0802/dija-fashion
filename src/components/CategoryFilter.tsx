import React from 'react';
import { CATEGORIES } from '../data/initialData';
import { CategoryType, Language } from '../types';
import { Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  language: Language;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  language
}) => {
  return (
    <section className="py-8 bg-[#FCFBF7] border-b border-[#EADBB2]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#B8860B] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'EN' ? 'Explore Collections' : 'ஆடை பிரிவுகள்'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A3A2A]">
            {language === 'EN' ? 'Shop By Category' : 'பிரிவு வாரியாக தேர்வு செய்யுங்கள்'}
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2 rounded-full" />
        </div>

        {/* Visual Category Thumbnails Grid / Horizontal Scroll */}
        <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar pt-2 px-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group flex flex-col items-center shrink-0 text-center cursor-pointer focus:outline-none"
              >
                {/* Rounded Circle Image Container */}
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 transition-all duration-300 ${
                    isActive
                      ? 'ring-4 ring-[#D4AF37] ring-offset-2 scale-105 shadow-gold'
                      : 'border-2 border-[#D4AF37]/30 hover:border-[#0A3A2A] hover:scale-105'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-[#0A3A2A]/20 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full animate-ping" />
                    </div>
                  )}
                </div>

                {/* Category Name */}
                <span
                  className={`mt-2 text-xs sm:text-sm font-semibold transition-colors ${
                    isActive ? 'text-[#0A3A2A] font-bold' : 'text-gray-700 group-hover:text-[#0A3A2A]'
                  }`}
                >
                  {language === 'EN' ? cat.name : cat.nameTamil}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Filter Pill Buttons */}
        <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0A3A2A] text-[#D4AF37] shadow-sm font-bold border border-[#D4AF37]'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0A3A2A] hover:text-[#0A3A2A]'
                }`}
              >
                {language === 'EN' ? cat.name : cat.nameTamil}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

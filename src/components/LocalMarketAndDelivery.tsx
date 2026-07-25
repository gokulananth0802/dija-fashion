import React, { useState } from 'react';
import { MapPin, Clock, Truck, CheckCircle2, AlertCircle, Calendar, Sparkles, Store } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';
import { Language } from '../types';

interface LocalMarketAndDeliveryProps {
  language: Language;
}

export const LocalMarketAndDelivery: React.FC<LocalMarketAndDeliveryProps> = ({ language }) => {
  const [pincode, setPincode] = useState('');
  const [checkResult, setCheckResult] = useState<{
    status: 'idle' | 'erode' | 'national' | 'invalid';
    message: string;
  }>({ status: 'idle', message: '' });

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = pincode.trim();
    if (!/^\d{6}$/.test(cleaned)) {
      setCheckResult({
        status: 'invalid',
        message: language === 'EN' ? 'Please enter a valid 6-digit PIN code.' : 'சரியான 6 இலக்க பின்கோடு வழங்கவும்.'
      });
      return;
    }

    if (STORE_INFO.erodePinCodes.includes(cleaned) || cleaned.startsWith('638')) {
      setCheckResult({
        status: 'erode',
        message: language === 'EN' 
          ? '🎉 Great News! Eligible for FREE Same-Day Doorstep Local Delivery in Erode!'
          : '🎉 வாழ்த்துகள்! ஈரோட்டில் இலவச ஒரே நாளில் வீட்டுக்கே டெலிவரி பெறலாம்!'
      });
    } else {
      setCheckResult({
        status: 'national',
        message: language === 'EN'
          ? '📦 Eligible for Express All-India Courier Shipping (2-4 Business Days).'
          : '📦 இந்தியா முழுவதும் 2-4 நாட்களில் எக்ஸ்பிரஸ் கூரியர் மூலம் டெலிவரி.'
      });
    }
  };

  return (
    <section className="py-10 bg-gradient-to-b from-[#FCFBF7] to-white border-y border-[#EADBB2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Card 1: Weekly Erode Pop-Up Market Tracker */}
          <div className="bg-gradient-to-br from-[#0A3A2A] to-[#12533e] rounded-2xl p-6 text-white shadow-luxury relative overflow-hidden flex flex-col justify-between border border-[#D4AF37]/40">
            <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-semibold uppercase tracking-wider mb-3">
                <Store className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{language === 'EN' ? 'Erode Pop-Up Markets' : 'ஈரோடு வார சந்தை'}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-2 leading-snug">
                {language === 'EN' 
                  ? 'Catch Us At Erode Weekly Markets!' 
                  : 'ஈரோடு வாரம் தோறும் சந்தையில் எங்களைச் சந்தியுங்கள்!'}
              </h3>

              <p className="text-amber-100/80 text-xs sm:text-sm mb-4 leading-relaxed">
                {language === 'EN'
                  ? 'Can\'t visit our Karungalpalayam boutique? Experience our live saree & kurti collection at Erode night markets!'
                  : 'கருங்கல்பாளையம் கடைக்கு வர இயலவில்லையா? இரவு சந்தைகளில் எங்கள் ஆடைகளை நேரில் பார்த்து வாங்கலாம்!'}
              </p>

              {/* Schedules */}
              <div className="space-y-2.5">
                {STORE_INFO.marketStalls.map((stall, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      <div>
                        <p className="text-xs font-bold text-white">{stall.day}</p>
                        <p className="text-[11px] text-amber-200/90">{stall.location}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[#D4AF37] text-[#0A3A2A] text-xs font-extrabold rounded-full shadow-xs">
                      {stall.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-amber-200">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Karungalpalayam, Erode</span>
              </span>
              <a 
                href={`tel:${STORE_INFO.phone}`} 
                className="text-[#D4AF37] font-bold hover:underline"
              >
                Call Stall Incharge →
              </a>
            </div>
          </div>

          {/* Card 2: Erode PIN Code Delivery Checker */}
          <div className="bg-white rounded-2xl p-6 border border-[#EADBB2] shadow-luxury flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF2F0] border border-[#800000]/20 text-[#800000] text-xs font-semibold uppercase tracking-wider mb-3">
                <Truck className="w-3.5 h-3.5" />
                <span>{language === 'EN' ? 'Local Delivery Checker' : 'டெலிவரி சோதனையாளர்'}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#0A3A2A] mb-2">
                {language === 'EN' ? 'Check Delivery In Your Area' : 'உங்கள் பகுதி டெலிவரி வசதி அறிய'}
              </h3>

              <p className="text-gray-600 text-xs sm:text-sm mb-4">
                {language === 'EN' 
                  ? 'Enter your 6-digit postal PIN code to verify free local Erode delivery or express nationwide shipping eligibility.'
                  : 'ஈரோடு இலவச டெலிவரி அறிய உங்கள் 6 இலக்க பின்கோடு பதிவிடவும்.'}
              </p>

              {/* Form */}
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 638003"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-[#FCFBF7] border border-[#D4AF37]/60 focus:outline-none focus:ring-2 focus:ring-[#0A3A2A] text-[#1A1A1A] font-mono tracking-widest"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0A3A2A] text-[#D4AF37] font-bold text-xs hover:bg-[#12533e] transition-colors shadow-sm"
                >
                  {language === 'EN' ? 'Check PIN' : 'சரிபார்க்க'}
                </button>
              </form>

              {/* Status Output */}
              {checkResult.status !== 'idle' && (
                <div className={`mt-4 p-3.5 rounded-xl text-xs sm:text-sm font-medium flex items-start gap-2.5 animate-fade-in ${
                  checkResult.status === 'erode' 
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300' 
                    : checkResult.status === 'national' 
                      ? 'bg-amber-50 text-amber-900 border border-amber-300'
                      : 'bg-red-50 text-red-900 border border-red-200'
                }`}>
                  {checkResult.status === 'erode' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                  {checkResult.status === 'national' && <Truck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />}
                  {checkResult.status === 'invalid' && <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />}
                  <p>{checkResult.message}</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Erode Local Delivery: 2-6 Hours</span>
              <span className="font-semibold text-[#0A3A2A]">100% Guaranteed Safe Packing</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

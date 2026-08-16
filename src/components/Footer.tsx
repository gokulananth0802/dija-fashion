import React from 'react';
import { MapPin, Phone, MessageCircle, Instagram, Clock, Mail, ShieldCheck, Heart } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';
import { Language } from '../types';
import { getGeneralWhatsAppUrl, getWholesaleWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  language: Language;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenAdmin }) => {
  return (
    <footer className="bg-[#0A3A2A] text-white pt-12 pb-24 md:pb-12 border-t-2 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#0A3A2A] font-serif font-bold text-lg flex items-center justify-center">
                DF
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">Dija Fashion</h3>
            </div>

            <p className="text-xs text-amber-100/80 leading-relaxed font-sans">
              {STORE_INFO.tagline}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0A3A2A] flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-[#0A3A2A] flex items-center justify-center transition-colors"
                title="Call Us"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#D4AF37] uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#" className="hover:text-amber-200 transition-colors">Home & New Arrivals</a></li>
              <li><a href="#reviews" className="hover:text-amber-200 transition-colors">Customer Reviews (5.0★)</a></li>
              <li><a href={getWholesaleWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors">Wholesale & Reseller Catalog</a></li>
              <li><button onClick={onOpenAdmin} className="hover:text-amber-200 transition-colors text-left">Store Owner Portal Login</button></li>
            </ul>
          </div>

          {/* Column 3: Store Contact & Hours */}
          <div className="space-y-2.5 text-xs text-gray-300">
            <h4 className="font-serif font-bold text-sm text-[#D4AF37] uppercase tracking-wider mb-3">
              Boutique Location
            </h4>

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>{STORE_INFO.address}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <a href={`tel:${STORE_INFO.phone}`} className="hover:underline">{STORE_INFO.phone}</a>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{STORE_INFO.hours}</span>
            </div>
          </div>

          {/* Column 4: Embedded Google Map */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#D4AF37] uppercase tracking-wider mb-3">
              Find Us on Map
            </h4>
            <div className="rounded-xl overflow-hidden border border-[#D4AF37]/40 h-32 w-full shadow-inner bg-emerald-950/50">
              <iframe
                title="Dija Fashion Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.834789528859!2d77.7289!3d11.3508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f437024e6a1%3A0x8efb3b19280d940!2sKarungalpalayam%2C%20Erode%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Karungalpalayam+Erode+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-center text-[10px] text-[#D4AF37] hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>

        </div>

        {/* Bottom Payment Badges & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} <strong className="text-white">Dija Fashion</strong> — Karungalpalayam, Erode. All rights reserved.
          </p>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-[10px] text-gray-400 mr-1">Accepted Payment Options:</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] border border-white/20">Cash on Delivery</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] border border-white/20">Google Pay</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] border border-white/20">PhonePe / UPI</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] border border-white/20">Paytm</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

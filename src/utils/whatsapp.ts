import { Product } from '../types';
import { STORE_INFO } from '../data/initialData';

/**
 * Cleans and formats a phone number into valid WhatsApp international format (digits only).
 * Removes any leading '+', spaces, hyphens, parentheses, etc., and ensures 91 country code is present.
 */
export function getCleanWhatsAppNumber(phoneNum?: string): string {
  const raw = phoneNum || STORE_INFO.whatsappNumber || '';
  // Remove all non-digit characters
  let digits = raw.replace(/\D/g, '');
  
  // If user passed a 10-digit Indian number without country code, prepend '91'
  if (digits.length === 10) {
    digits = '91' + digits;
  }
  
  return digits;
}

/**
 * Creates deep link URL for WhatsApp Product Inquiry
 */
export function getProductWhatsAppUrl(
  product: Product,
  selectedSize?: string
): string {
  const sizeText = selectedSize || product.sizes[0] || 'Free Size';
  const text = `Hi Dija Fashion! I'm interested in buying: *${product.title}* - Price: ₹${product.price.toLocaleString('en-IN')} (Size: ${sizeText}). Is this available?`;
  return `https://wa.me/${getCleanWhatsAppNumber()}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates general store inquiry link
 */
export function getGeneralWhatsAppUrl(note?: string): string {
  const text = note || `Hi Dija Fashion! I would like to inquire about your latest collections, prices, and store location in Karungalpalayam, Erode.`;
  return `https://wa.me/${getCleanWhatsAppNumber()}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates Wholesale inquiry link
 */
export function getWholesaleWhatsAppUrl(productTitle?: string): string {
  const text = productTitle 
    ? `Hi Dija Fashion! I am interested in placing a Wholesale/Bulk order for *${productTitle}*. Please share bulk pricing catalog and minimum order details.`
    : `Hi Dija Fashion! I am a reseller/boutique owner interested in your Wholesale collections. Please share your catalog and bulk rates.`;
  return `https://wa.me/${getCleanWhatsAppNumber()}?text=${encodeURIComponent(text)}`;
}

/**
 * Format currency in Indian Rupees
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(price: number, mrp: number): number {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

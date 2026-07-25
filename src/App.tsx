import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { LocalMarketAndDelivery } from './components/LocalMarketAndDelivery';
import { SocialProofAndInsta } from './components/SocialProofAndInsta';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { WishlistModal } from './components/WishlistModal';
import { InquiryTrayModal, InquiryBagItem } from './components/InquiryTrayModal';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';

import { INITIAL_PRODUCTS, STORE_INFO } from './data/initialData';
import { Product, CategoryType, Language } from './types';
import { Sparkles, ShoppingBag, Filter, ArrowUpDown } from 'lucide-react';

export default function App() {
  // --- STATE WITH LOCAL STORAGE PERSISTENCE ---
  
  // Products list (Editable by store owner)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('dija_fashion_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('dija_fashion_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('dija_fashion_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('dija_fashion_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Inquiry Bag state
  const [inquiryBag, setInquiryBag] = useState<InquiryBagItem[]>(() => {
    try {
      const saved = localStorage.getItem('dija_fashion_inquiry_bag');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('dija_fashion_inquiry_bag', JSON.stringify(inquiryBag));
    } catch (e) {
      console.error(e);
    }
  }, [inquiryBag]);

  // Language state (EN vs TA)
  const [language, setLanguage] = useState<Language>('EN');

  // Active Category & Search Query
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isInquiryBagOpen, setIsInquiryBagOpen] = useState<boolean>(false);

  // --- HANDLERS ---

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleAddToInquiryBag = (product: Product, size: string) => {
    setInquiryBag((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, selectedSize: size, quantity: 1 }];
      }
    });
    setIsInquiryBagOpen(true);
  };

  const handleRemoveBagItem = (productId: string, size: string) => {
    setInquiryBag((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const handleUpdateBagQuantity = (productId: string, size: string, delta: number) => {
    setInquiryBag((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as InquiryBagItem[]
    );
  };

  // Store Owner Inventory Actions
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleResetData = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('dija_fashion_products');
  };

  // --- FILTERED & SORTED PRODUCTS ---
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // 1. Category Filter
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          (p.titleTamil && p.titleTamil.toLowerCase().includes(query)) ||
          p.category.toLowerCase().includes(query) ||
          p.fabricCare.toLowerCase().includes(query) ||
          (p.code && p.code.toLowerCase().includes(query))
      );
    }

    // 3. Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  // Scroll to catalog helper
  const scrollToCatalog = () => {
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#1A1A1A] font-sans flex flex-col">
      
      {/* Schema.org Structured JSON-LD for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ClothingStore",
            "name": STORE_INFO.name,
            "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
            "telephone": STORE_INFO.phone,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "25, Madurai Veeran Kovil Street, KAS Nagar, Karungalpalayam",
              "addressLocality": "Erode",
              "addressRegion": "Tamil Nadu",
              "postalCode": "638003",
              "addressCountry": "IN"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "500"
            },
            "priceRange": "₹380 - ₹4299"
          })
        }}
      />

      {/* Sticky Header Navigation */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        language={language}
        toggleLanguage={() => setLanguage((prev) => (prev === 'EN' ? 'TA' : 'EN'))}
        wishlistCount={wishlist.length}
        openWishlist={() => setIsWishlistOpen(true)}
        inquiryCount={inquiryBag.length}
        openInquiryTray={() => setIsInquiryBagOpen(true)}
        openAdminModal={() => setIsAdminOpen(true)}
        activeCategory={activeCategory}
      />

      {/* Main Hero Banner */}
      <HeroSlider
        language={language}
        onShopClick={scrollToCatalog}
      />

      {/* Visual Category Showcase */}
      <CategoryFilter
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        language={language}
      />

      {/* MAIN CONTENT: Dynamic Product Catalog Grid */}
      <main id="product-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
        
        {/* Catalog Control Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EADBB2]/50">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B8860B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeCategory === 'All' ? 'Complete Collection' : activeCategory}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A3A2A]">
              {searchQuery ? `Search Results for "${searchQuery}"` : (language === 'EN' ? 'New Arrivals & Bestsellers' : 'புதிய ஆடைகளின் தொகுப்பு')}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Showing {filteredProducts.length} items available at Dija Fashion Erode
            </p>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{language === 'EN' ? 'Sort By:' : 'வரிசைப்படுத்த:'}</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-xs rounded-full bg-white border border-[#D4AF37]/50 font-semibold text-[#0A3A2A] focus:outline-none focus:ring-1 focus:ring-[#0A3A2A]"
            >
              <option value="featured">Featured / Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Responsive Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-gray-200 p-8">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#0A3A2A]">No Products Found</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              We couldn't find any clothing matching your current filter. Try searching for "Anarkali", "Saree", or "Kurti".
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#0A3A2A] text-[#D4AF37] text-xs font-bold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                language={language}
                isWishlisted={wishlist.some((p) => p.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                onAddToInquiryBag={handleAddToInquiryBag}
              />
            ))}
          </div>
        )}

      </main>

      {/* Erode Pop-Up Stall Tracker & PIN Code Delivery Checker */}
      <LocalMarketAndDelivery language={language} />

      {/* Social Proof (Google 5.0★ Reviews & Instagram Grid) */}
      <SocialProofAndInsta language={language} />

      {/* Footer & Interactive Map */}
      <Footer language={language} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Mobile Bottom Sticky Navigation (<768px) */}
      <MobileBottomNav
        language={language}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenInquiryBag={() => setIsInquiryBagOpen(true)}
        inquiryCount={inquiryBag.length}
      />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        language={language}
        isWishlisted={quickViewProduct ? wishlist.some((p) => p.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToInquiryBag={handleAddToInquiryBag}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onQuickView={(p) => {
          setIsWishlistOpen(false);
          setQuickViewProduct(p);
        }}
        language={language}
      />

      {/* Multi-Item Inquiry Bag Modal */}
      <InquiryTrayModal
        isOpen={isInquiryBagOpen}
        onClose={() => setIsInquiryBagOpen(false)}
        items={inquiryBag}
        onRemoveItem={handleRemoveBagItem}
        onUpdateQuantity={handleUpdateBagQuantity}
        onClearBag={() => setInquiryBag([])}
        language={language}
      />

      {/* Owner Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onResetData={handleResetData}
        language={language}
      />

    </div>
  );
}

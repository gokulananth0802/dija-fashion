import React, { useState } from 'react';
import { Lock, Plus, Trash2, Edit2, X, RefreshCw, Check, AlertCircle, Package, Layers, Tag, ShieldAlert, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Product, CategoryType, ProductTag, SizeOption, Language } from '../types';
import { CATEGORIES } from '../data/initialData';
import { formatINR } from '../utils/whatsapp';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetData: () => void;
  language: Language;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetData,
  language
}) => {
  if (!isOpen) return null;

  // PIN Auth State
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Active Tab: 'inventory' or 'add'
  const [activeTab, setActiveTab] = useState<'inventory' | 'add'>('inventory');

  // Form State for Adding / Editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formTitleTamil, setFormTitleTamil] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryType>('Kurtis & Sets');
  const [formPrice, setFormPrice] = useState<number | ''>(1250);
  const [formMrp, setFormMrp] = useState<number | ''>(1699);
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800');
  const [formSizes, setFormSizes] = useState<SizeOption[]>(['M', 'L', 'XL', 'XXL']);
  const [formFabricCare, setFormFabricCare] = useState('Pure Organza Silk. Dry Clean Only.');
  const [formDescription, setFormDescription] = useState('Elegant new collection kurti set crafted for celebrations.');
  const [formTag, setFormTag] = useState<ProductTag | 'NONE'>('NEW ARRIVAL');
  const [formInStock, setFormInStock] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Quick Preset Images for Non-Technical Owner
  const presetImages = [
    { label: 'Organza Pink Kurti', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800' },
    { label: 'Green Silk Saree', url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800' },
    { label: 'Velvet Maroon Lehenga', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800' },
    { label: 'Indigo Cotton Top', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800' },
    { label: 'Chikankari Pastel Blue', url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800' },
    { label: 'Nightwear Satin Set', url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=800' }
  ];

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const toggleSizeSelection = (size: SizeOption) => {
    if (formSizes.includes(size)) {
      if (formSizes.length > 1) {
        setFormSizes(formSizes.filter((s) => s !== size));
      }
    } else {
      setFormSizes([...formSizes, size]);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formPrice) return;

    const newProd: Product = {
      id: editingId || `df-${Date.now().toString().slice(-5)}`,
      title: formTitle.trim(),
      titleTamil: formTitleTamil.trim() || undefined,
      category: formCategory,
      price: Number(formPrice),
      mrp: Number(formMrp || formPrice),
      image: formImage.trim(),
      sizes: formSizes,
      fabricCare: formFabricCare.trim(),
      description: formDescription.trim(),
      tag: formTag === 'NONE' ? undefined : formTag,
      inStock: formInStock,
      code: editingId ? undefined : `DF-ADM-${Math.floor(100 + Math.random() * 900)}`
    };

    if (editingId) {
      onUpdateProduct(newProd);
      setSuccessMessage('Product updated successfully!');
    } else {
      onAddProduct(newProd);
      setSuccessMessage('New product added to store!');
    }

    // Reset Form
    setTimeout(() => setSuccessMessage(null), 3000);
    resetForm();
    setActiveTab('inventory');
  };

  const handleStartEdit = (p: Product) => {
    setEditingId(p.id);
    setFormTitle(p.title);
    setFormTitleTamil(p.titleTamil || '');
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormMrp(p.mrp);
    setFormImage(p.image);
    setFormSizes(p.sizes);
    setFormFabricCare(p.fabricCare);
    setFormDescription(p.description);
    setFormTag(p.tag || 'NONE');
    setFormInStock(p.inStock);
    setActiveTab('add');
  };

  const resetForm = () => {
    setEditingId(null);
    setFormTitle('');
    setFormTitleTamil('');
    setFormCategory('Kurtis & Sets');
    setFormPrice(1250);
    setFormMrp(1699);
    setFormSizes(['M', 'L', 'XL', 'XXL']);
    setFormFabricCare('Pure Premium Fabric. Wash with care.');
    setFormDescription('Exclusive boutique piece available at Dija Fashion Erode.');
    setFormTag('NEW ARRIVAL');
    setFormInStock(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#D4AF37] max-h-[94vh] flex flex-col">
        
        {/* Top Bar Header */}
        <div className="bg-[#0A3A2A] text-white p-4 flex items-center justify-between border-b border-[#D4AF37]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0A3A2A] flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-white">
                Dija Fashion — Owner Admin Portal
              </h2>
              <p className="text-[11px] text-amber-200/90">
                Manage products, update stock status, and add new arrivals
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen if not authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center bg-[#FCFBF7] my-auto">
            <div className="w-16 h-16 bg-amber-100 border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0A3A2A]">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0A3A2A] mb-2">
              Store Owner Verification
            </h3>
            <p className="text-xs text-gray-600 max-w-sm mx-auto mb-6">
              Enter your 4-digit security PIN to access product inventory management. <br />
              <span className="font-mono font-bold text-[#800000] bg-red-50 px-2 py-0.5 rounded border border-red-200 mt-1 inline-block">Default Owner PIN: 1234</span>
            </p>

            <form onSubmit={handlePinSubmit} className="max-w-xs mx-auto space-y-4">
              <input
                type="password"
                maxLength={4}
                placeholder="• • • •"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                className="w-full text-center text-2xl font-mono tracking-widest px-4 py-3 border-2 border-[#D4AF37] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3A2A] bg-white shadow-inner"
              />

              {pinError && (
                <p className="text-xs font-bold text-red-600 flex items-center justify-center gap-1">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Incorrect PIN! Use default PIN 1234</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0A3A2A] text-[#D4AF37] font-bold text-sm shadow-md hover:bg-[#12533e] transition-colors"
              >
                Unlock Admin Portal
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Body */
          <div className="flex-1 overflow-y-auto flex flex-col bg-[#FCFBF7]">
            
            {/* Success Toast */}
            {successMessage && (
              <div className="bg-emerald-600 text-white px-4 py-2 text-center text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
                <Check className="w-4 h-4" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'inventory'
                      ? 'bg-[#0A3A2A] text-[#D4AF37] shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Inventory List ({products.length})</span>
                </button>

                <button
                  onClick={() => {
                    resetForm();
                    setActiveTab('add');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'add'
                      ? 'bg-[#0A3A2A] text-[#D4AF37] shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>{editingId ? 'Edit Product' : '+ Add New Product'}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  if (confirm('Reset store inventory back to initial default products?')) {
                    onResetData();
                  }
                }}
                className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 text-[11px] font-semibold flex items-center gap-1"
                title="Reset to default mock products"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* Tab 1: Inventory Table */}
            {activeTab === 'inventory' && (
              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-[#0A3A2A]">
                    Live Storefront Inventory
                  </h3>
                  <span className="text-xs text-gray-500">
                    Changes take effect instantly on the website.
                  </span>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#0A3A2A] text-[#D4AF37] font-semibold border-b">
                        <th className="p-3">Product</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Selling Price</th>
                        <th className="p-3">MRP</th>
                        <th className="p-3">Sizes</th>
                        <th className="p-3">Stock Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-amber-50/40 transition-colors">
                          <td className="p-3 flex items-center gap-3">
                            <img src={p.image} alt={p.title} className="w-10 h-10 object-cover rounded-md border" />
                            <div>
                              <p className="font-bold text-gray-900 line-clamp-1">{p.title}</p>
                              {p.tag && (
                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-900">
                                  {p.tag}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-gray-600 font-medium">{p.category}</td>
                          <td className="p-3 font-bold text-[#0A3A2A]">{formatINR(p.price)}</td>
                          <td className="p-3 text-gray-400 line-through">{formatINR(p.mrp)}</td>
                          <td className="p-3">
                            <div className="flex gap-1 flex-wrap">
                              {p.sizes.map((s) => (
                                <span key={s} className="px-1 py-0.5 bg-gray-100 rounded text-[9px] font-mono">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => onUpdateProduct({ ...p, inStock: !p.inStock })}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                                p.inStock
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-red-100 text-red-800 border border-red-300'
                              }`}
                              title="Click to toggle stock status"
                            >
                              {p.inStock ? 'In Stock ✓' : 'Sold Out ✕'}
                            </button>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleStartEdit(p)}
                                className="p-1.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300"
                                title="Edit Item"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${p.title}"?`)) {
                                    onDeleteProduct(p.id);
                                  }
                                }}
                                className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
                                title="Delete Item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Add / Edit Product Form */}
            {activeTab === 'add' && (
              <div className="p-4 sm:p-6 max-w-3xl mx-auto w-full">
                <form onSubmit={handleSaveProduct} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <h3 className="font-serif font-bold text-xl text-[#0A3A2A] border-b pb-2">
                    {editingId ? 'Edit Product Details' : 'Add New Apparel Item'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Product Title (English) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Royal Organza Anarkali Kurti Set"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-[#0A3A2A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Product Title (Tamil Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. ராயல் ஆர்கன்சா அனார்கலி செட்"
                        value={formTitleTamil}
                        onChange={(e) => setFormTitleTamil(e.target.value)}
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-[#0A3A2A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as CategoryType)}
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-[#0A3A2A] bg-white"
                      >
                        {CATEGORIES.filter(c => c.id !== 'All').map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Selling Price (₹) *</label>
                      <input
                        type="number"
                        required
                        min={1}
                        placeholder="1250"
                        value={formPrice}
                        onChange={(e) => setFormPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-[#0A3A2A] font-bold text-[#0A3A2A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">MRP / Strikethrough Price (₹)</label>
                      <input
                        type="number"
                        min={1}
                        placeholder="1699"
                        value={formMrp}
                        onChange={(e) => setFormMrp(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-[#0A3A2A]"
                      />
                    </div>
                  </div>

                  {/* Size Multi-Selector */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Available Sizes (Multi-Select)</label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {(['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Free Size'] as SizeOption[]).map((sz) => {
                        const isSelected = formSizes.includes(sz);
                        return (
                          <button
                            type="button"
                            key={sz}
                            onClick={() => toggleSizeSelection(sz)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-[#0A3A2A] text-[#D4AF37] border border-[#D4AF37]'
                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                            }`}
                          >
                            {sz} {isSelected ? '✓' : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Product Image URL or Presets */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Product Image URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-[#0A3A2A] font-mono"
                    />

                    {/* Quick Presets */}
                    <p className="text-[10px] text-gray-500 mt-1 mb-1">Click a sample photo preset below for fast testing:</p>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {presetImages.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormImage(p.url)}
                          className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded text-[10px] whitespace-nowrap"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fabric & Tag */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Tag Badge</label>
                      <select
                        value={formTag}
                        onChange={(e) => setFormTag(e.target.value as ProductTag | 'NONE')}
                        className="w-full px-3 py-2 text-xs border rounded-lg bg-white"
                      >
                        <option value="NONE">No Tag</option>
                        <option value="NEW ARRIVAL">NEW ARRIVAL</option>
                        <option value="BESTSELLER">BESTSELLER</option>
                        <option value="LIMITED STOCK">LIMITED STOCK</option>
                        <option value="WHOLESALE AVAILABLE">WHOLESALE AVAILABLE</option>
                        <option value="HOT SALE">HOT SALE</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Initial Stock Availability</label>
                      <select
                        value={formInStock ? 'true' : 'false'}
                        onChange={(e) => setFormInStock(e.target.value === 'true')}
                        className="w-full px-3 py-2 text-xs border rounded-lg bg-white font-bold"
                      >
                        <option value="true">In Stock (Available on Site)</option>
                        <option value="false">Out of Stock / Sold Out</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Fabric & Care Details</label>
                    <input
                      type="text"
                      value={formFabricCare}
                      onChange={(e) => setFormFabricCare(e.target.value)}
                      className="w-full px-3 py-2 text-xs border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full px-3 py-2 text-xs border rounded-lg"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t">
                    <button
                      type="button"
                      onClick={() => setActiveTab('inventory')}
                      className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#0A3A2A] text-[#D4AF37] text-xs font-bold rounded-lg shadow-md hover:bg-[#12533e]"
                    >
                      {editingId ? 'Update Product' : 'Save & Publish Product'}
                    </button>
                  </div>

                </form>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

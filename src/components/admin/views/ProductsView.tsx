import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  Image as ImageIcon,
  Tag,
  Eye,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { Perfume } from '../../../types';
import { formatINR } from '../../../utils/currency';
import { FLACON_PRESETS } from '../flaconPresets';
import { handleImageError } from '../../../utils/imageFallback';

interface ProductsViewProps {
  onAddProductRequested?: () => void;
}

export const ProductsView: React.FC<ProductsViewProps> = () => {
  const { perfumes, addPerfume, updatePerfume, deletePerfume, settings } = useAdminData();

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [familyFilter, setFamilyFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'lowstock' | 'outofstock'>('all');
  const [badgeFilter, setBadgeFilter] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState<Perfume | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Fields State
  const [formName, setFormName] = useState('');
  const [formSubTitle, setFormSubTitle] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formPrice, setFormPrice] = useState<number>(7999);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(9999);
  const [formVolume, setFormVolume] = useState('100ml');
  const [formConcentration, setFormConcentration] = useState('Extrait de Parfum (30%)');
  const [formFamily, setFormFamily] = useState<Perfume['family']>('Floral Silk');
  const [formCollectionId, setFormCollectionId] = useState<Perfume['collectionId']>('gold-reserve');
  const [formInStock, setFormInStock] = useState(true);
  const [formStockCount, setFormStockCount] = useState<number>(20);
  const [formBadge, setFormBadge] = useState('');
  const [formIsSale, setFormIsSale] = useState(false);
  const [formIsBestSeller, setFormIsBestSeller] = useState(false);
  const [formIsNewArrival, setFormIsNewArrival] = useState(false);
  const [formIsAttar, setFormIsAttar] = useState(false);
  const [formIsGiftSet, setFormIsGiftSet] = useState(false);
  const [formDiscountPercent, setFormDiscountPercent] = useState<number>(0);
  const [formTopNotes, setFormTopNotes] = useState('');
  const [formHeartNotes, setFormHeartNotes] = useState('');
  const [formBaseNotes, setFormBaseNotes] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStory, setFormStory] = useState('');
  const [formImage, setFormImage] = useState(FLACON_PRESETS[0].image);
  const [customImageUrl, setCustomImageUrl] = useState('');

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingPerfume(null);
    setFormName('');
    setFormSubTitle('');
    setFormTagline('');
    setFormPrice(7999);
    setFormOriginalPrice(9499);
    setFormVolume('100ml');
    setFormConcentration('Extrait de Parfum (30%)');
    setFormFamily('Floral Silk');
    setFormCollectionId('gold-reserve');
    setFormInStock(true);
    setFormStockCount(25);
    setFormBadge('');
    setFormIsSale(false);
    setFormIsBestSeller(false);
    setFormIsNewArrival(true);
    setFormIsAttar(false);
    setFormIsGiftSet(false);
    setFormDiscountPercent(15);
    setFormTopNotes('Saffron, French Bergamot, Pink Peppercorn');
    setFormHeartNotes('Grasse Rose Centifolia, Jasmine Sambac, Orris Root');
    setFormBaseNotes('Ambergris, Mysore Sandalwood, Bourbon Vanilla, Velvet Musk');
    setFormDescription('A rare artisanal extrait de parfum crafted with exceptional olfactory concentration for an enchanting sillage.');
    setFormStory('Distilled in small batches in Grasse and aged in French oak casks before being decanted into hand-cut crystal flacons.');
    setFormImage(FLACON_PRESETS[0].image);
    setCustomImageUrl('');
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (perfume: Perfume) => {
    setEditingPerfume(perfume);
    setFormName(perfume.name);
    setFormSubTitle(perfume.subTitle || '');
    setFormTagline(perfume.tagline || '');
    setFormPrice(perfume.price);
    setFormOriginalPrice(perfume.originalPrice || Math.round(perfume.price * 1.25));
    setFormVolume(perfume.volume || '100ml');
    setFormConcentration(perfume.concentration || 'Extrait de Parfum (30%)');
    setFormFamily(perfume.family);
    setFormCollectionId(perfume.collectionId);
    setFormInStock(perfume.inStock);
    setFormStockCount(perfume.stockCount ?? 15);
    setFormBadge(perfume.badge || '');
    setFormIsSale(!!perfume.isSale);
    setFormIsBestSeller(!!perfume.isBestSeller);
    setFormIsNewArrival(!!perfume.isNewArrival);
    setFormIsAttar(!!perfume.isAttar);
    setFormIsGiftSet(!!perfume.isGiftSet);
    setFormDiscountPercent(perfume.discountPercent || 0);
    setFormTopNotes(perfume.notes.top.join(', '));
    setFormHeartNotes(perfume.notes.heart.join(', '));
    setFormBaseNotes(perfume.notes.base.join(', '));
    setFormDescription(perfume.description);
    setFormStory(perfume.story || '');
    setFormImage(perfume.image);
    setCustomImageUrl(perfume.image.startsWith('http') ? perfume.image : '');
    setIsModalOpen(true);
  };

  // Save Perfume handler
  const handleSavePerfume = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim()) {
      alert('Please enter a perfume name');
      return;
    }

    const resolvedImage = customImageUrl.trim() ? customImageUrl.trim() : formImage;

    const topArr = formTopNotes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const heartArr = formHeartNotes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const baseArr = formBaseNotes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingPerfume) {
      // Update
      updatePerfume(editingPerfume.id, {
        name: formName.trim(),
        subTitle: formSubTitle.trim(),
        tagline: formTagline.trim(),
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        volume: formVolume,
        concentration: formConcentration,
        family: formFamily,
        collectionId: formCollectionId,
        inStock: formInStock,
        stockCount: Number(formStockCount),
        badge: formBadge.trim() || undefined,
        isSale: formIsSale,
        isBestSeller: formIsBestSeller,
        isNewArrival: formIsNewArrival,
        isAttar: formIsAttar,
        isGiftSet: formIsGiftSet,
        discountPercent: Number(formDiscountPercent),
        notes: {
          top: topArr,
          heart: heartArr,
          base: baseArr
        },
        description: formDescription.trim(),
        story: formStory.trim(),
        image: resolvedImage
      });
      showToast(`Updated "${formName.trim()}" successfully.`);
    } else {
      // Create new
      const newId = `zelia-${formName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;
      const newPerfume: Perfume = {
        id: newId,
        name: formName.trim(),
        subTitle: formSubTitle.trim() || 'Extrait de Parfum',
        tagline: formTagline.trim() || 'Hand-crafted luxury extrait de parfum.',
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        rating: 5.0,
        reviewsCount: 1,
        volume: formVolume,
        concentration: formConcentration,
        family: formFamily,
        collectionId: formCollectionId,
        description: formDescription.trim() || 'An opulent artisanal extrait.',
        story: formStory.trim() || 'Harvested and distilled with devotion to high perfumery.',
        sillage: 'Enchanting & Strong',
        longevity: '14 - 18 Hours',
        notes: {
          top: topArr.length ? topArr : ['Citrus', 'Bergamot'],
          heart: heartArr.length ? heartArr : ['Jasmine', 'Rose'],
          base: baseArr.length ? baseArr : ['Amber', 'Sandalwood']
        },
        image: resolvedImage,
        badge: formBadge.trim() || undefined,
        featured: true,
        inStock: formInStock,
        stockCount: Number(formStockCount),
        isSale: formIsSale,
        isBestSeller: formIsBestSeller,
        isNewArrival: formIsNewArrival,
        isAttar: formIsAttar,
        isGiftSet: formIsGiftSet,
        discountPercent: Number(formDiscountPercent),
        sizes: [
          { ml: '50ml', label: 'Travel Flacon', price: Math.round(Number(formPrice) * 0.65) },
          { ml: '100ml', label: 'Grand Flacon', price: Number(formPrice), originalPrice: Number(formOriginalPrice) }
        ]
      };
      addPerfume(newPerfume);
      showToast(`Added new perfume "${formName.trim()}" to catalog.`);
    }

    setIsModalOpen(false);
  };

  // Quick In-Stock Toggle
  const handleToggleStock = (perfume: Perfume) => {
    const nextStatus = !perfume.inStock;
    updatePerfume(perfume.id, {
      inStock: nextStatus,
      stockCount: nextStatus ? (perfume.stockCount && perfume.stockCount > 0 ? perfume.stockCount : 10) : 0
    });
    showToast(
      `Marked "${perfume.name}" as ${nextStatus ? 'In Stock' : 'Out of Stock'}.`
    );
  };

  // Quick Stock Count Increment/Decrement
  const handleAdjustStock = (perfume: Perfume, delta: number) => {
    const current = perfume.stockCount ?? 10;
    const next = Math.max(0, current + delta);
    updatePerfume(perfume.id, {
      stockCount: next,
      inStock: next > 0
    });
  };

  // Delete handler
  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      const target = perfumes.find((p) => p.id === deleteConfirmId);
      deletePerfume(deleteConfirmId);
      setDeleteConfirmId(null);
      if (target) showToast(`Deleted "${target.name}" from catalog.`);
    }
  };

  // Filtering
  const filteredPerfumes = perfumes.filter((p) => {
    // Search
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchName = p.name.toLowerCase().includes(q);
      const matchSubtitle = (p.subTitle || '').toLowerCase().includes(q);
      const matchFamily = p.family.toLowerCase().includes(q);
      const matchNotes = [
        ...p.notes.top,
        ...p.notes.heart,
        ...p.notes.base
      ].some((n) => n.toLowerCase().includes(q));
      if (!matchName && !matchSubtitle && !matchFamily && !matchNotes) {
        return false;
      }
    }

    // Family filter
    if (familyFilter !== 'all' && p.family !== familyFilter) {
      return false;
    }

    // Stock filter
    if (stockFilter === 'instock' && (!p.inStock || (p.stockCount ?? 1) <= 0)) {
      return false;
    }
    if (stockFilter === 'outofstock' && p.inStock && (p.stockCount ?? 1) > 0) {
      return false;
    }
    if (
      stockFilter === 'lowstock' &&
      ((p.stockCount ?? 10) > settings.lowStockThreshold || (p.stockCount ?? 1) <= 0)
    ) {
      return false;
    }

    // Badge filter
    if (badgeFilter === 'sale' && !p.isSale) return false;
    if (badgeFilter === 'bestseller' && !p.isBestSeller) return false;
    if (badgeFilter === 'new' && !p.isNewArrival) return false;
    if (badgeFilter === 'attar' && !p.isAttar) return false;
    if (badgeFilter === 'gift' && !p.isGiftSet) return false;

    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C241E] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#D4AF37]/60 flex items-center gap-3 text-xs tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Action Header */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-luxury text-2xl text-[#2C241E] font-medium">
            Perfume Inventory ({perfumes.length} Flacons)
          </h2>
          <p className="text-xs text-[#7A6A5D] mt-0.5">
            Add new extraits de parfum, adjust prices in INR, modify fragrance notes, and manage stock status.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#1C1714] text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Perfume</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8DFD4] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A6A5D]" />
          <input
            type="text"
            placeholder="Search perfumes by name, notes (e.g. Saffron, Amber), or family..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl pl-9 pr-3.5 py-2 text-[#2C241E] placeholder:text-[#A6978A] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Family */}
          <select
            value={familyFilter}
            onChange={(e) => setFamilyFilter(e.target.value)}
            className="bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            <option value="all">All Fragrance Families</option>
            <option value="Floral Silk">Floral Silk</option>
            <option value="Amber & Woods">Amber & Woods</option>
            <option value="Solar Warmth">Solar Warmth</option>
            <option value="Gourmand Vanilla">Gourmand Vanilla</option>
            <option value="Ruby & Crimson">Ruby & Crimson</option>
            <option value="Sapphire Nocturne">Sapphire Nocturne</option>
            <option value="Emerald Aromatic">Emerald Aromatic</option>
          </select>

          {/* Stock */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            <option value="all">All Stock Statuses</option>
            <option value="instock">In Stock Only</option>
            <option value="lowstock">Low Stock (≤ {settings.lowStockThreshold})</option>
            <option value="outofstock">Out of Stock</option>
          </select>

          {/* Offer Badges */}
          <select
            value={badgeFilter}
            onChange={(e) => setBadgeFilter(e.target.value)}
            className="bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            <option value="all">All Product Badges</option>
            <option value="bestseller">Best Sellers</option>
            <option value="sale">Festive Sale Offers</option>
            <option value="new">New Arrivals</option>
            <option value="attar">Pure Attar Oils</option>
            <option value="gift">Luxury Coffrets</option>
          </select>
        </div>
      </div>

      {/* Perfume List Table */}
      <div className="bg-white rounded-2xl border border-[#E8DFD4] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF7F2] text-[11px] uppercase tracking-wider text-[#7A6A5D] font-medium border-b border-[#E8DFD4]">
                <th className="py-3 px-4 sm:px-6">Flacon & Fragrance</th>
                <th className="py-3 px-4">Family & Notes</th>
                <th className="py-3 px-4 text-right">Price (₹)</th>
                <th className="py-3 px-4 text-center">Stock & Status</th>
                <th className="py-3 px-4">Offers & Badges</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD4]">
              {filteredPerfumes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#7A6A5D]">
                    No perfumes matched your search criteria. Try adjusting filters.
                  </td>
                </tr>
              ) : (
                filteredPerfumes.map((perfume) => {
                  const isLow =
                    perfume.inStock &&
                    (perfume.stockCount ?? 10) <= settings.lowStockThreshold;
                  const isOut =
                    !perfume.inStock || (perfume.stockCount ?? 1) <= 0;

                  return (
                    <tr
                      key={perfume.id}
                      className="hover:bg-[#FAF7F2]/60 transition-colors"
                    >
                      {/* Product Thumbnail & Details */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-14 rounded-xl overflow-hidden border border-[#E8DFD4] bg-[#FAF7F2] shrink-0">
                            <img
                              src={perfume.image}
                              alt={perfume.name}
                              onError={(e) => handleImageError(e, perfume.name)}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-serif-luxury text-base text-[#2C241E] font-medium block">
                              {perfume.name}
                            </span>
                            <span className="text-[11px] text-[#9A7B38] font-medium block">
                              {perfume.subTitle}
                            </span>
                            <span className="text-[10px] text-[#7A6A5D] font-mono">
                              {perfume.volume} · {perfume.concentration}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Olfactory Family & Notes */}
                      <td className="py-4 px-4 max-w-xs">
                        <span className="font-semibold text-[#2C241E] block">
                          {perfume.family}
                        </span>
                        <p className="text-[11px] text-[#7A6A5D] line-clamp-1 mt-0.5">
                          Top: {perfume.notes.top.join(', ')}
                        </p>
                        <p className="text-[10px] text-[#A6978A] line-clamp-1">
                          Heart: {perfume.notes.heart.join(', ')}
                        </p>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 text-right">
                        <span className="font-mono font-semibold text-[#2C241E] block text-sm tabular-nums">
                          {formatINR(perfume.price)}
                        </span>
                        {perfume.originalPrice && perfume.originalPrice > perfume.price && (
                          <span className="font-mono text-[11px] text-[#A6978A] line-through block tabular-nums">
                            {formatINR(perfume.originalPrice)}
                          </span>
                        )}
                      </td>

                      {/* Stock Status & Quick Counter */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-1.5">
                          <button
                            onClick={() => handleToggleStock(perfume)}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase cursor-pointer transition-colors ${
                              isOut
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : isLow
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            {isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock'}
                          </button>

                          <div className="flex items-center gap-1 font-mono text-xs">
                            <button
                              onClick={() => handleAdjustStock(perfume, -1)}
                              disabled={(perfume.stockCount ?? 0) <= 0}
                              className="w-5 h-5 rounded bg-[#FAF7F2] border border-[#E8DFD4] hover:bg-[#EDE4D8] flex items-center justify-center cursor-pointer disabled:opacity-30"
                              title="Decrease stock"
                            >
                              -
                            </button>
                            <span className="w-8 text-center tabular-nums font-semibold">
                              {perfume.stockCount ?? 0}
                            </span>
                            <button
                              onClick={() => handleAdjustStock(perfume, 1)}
                              className="w-5 h-5 rounded bg-[#FAF7F2] border border-[#E8DFD4] hover:bg-[#EDE4D8] flex items-center justify-center cursor-pointer"
                              title="Increase stock"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Offers & Badges */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {perfume.badge && (
                            <span className="px-2 py-0.5 bg-[#FAF6F0] border border-[#D4AF37]/50 text-[#9A7B38] text-[10px] font-medium rounded-md">
                              {perfume.badge}
                            </span>
                          )}
                          {perfume.isSale && (
                            <span className="px-2 py-0.5 bg-rose-50 text-rose-700 text-[10px] font-medium rounded-md border border-rose-200">
                              Sale {perfume.discountPercent ? `${perfume.discountPercent}%` : ''}
                            </span>
                          )}
                          {perfume.isBestSeller && (
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-medium rounded-md border border-amber-200">
                              Bestseller
                            </span>
                          )}
                          {perfume.isNewArrival && (
                            <span className="px-2 py-0.5 bg-sky-50 text-sky-800 text-[10px] font-medium rounded-md border border-sky-200">
                              New
                            </span>
                          )}
                          {perfume.isAttar && (
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-800 text-[10px] font-medium rounded-md border border-purple-200">
                              Attar
                            </span>
                          )}
                          {!perfume.badge && !perfume.isSale && !perfume.isBestSeller && !perfume.isNewArrival && (
                            <span className="text-[#A6978A] text-[11px]">—</span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(perfume)}
                            className="p-1.5 rounded-lg border border-[#E8DFD4] hover:bg-[#FAF6F0] text-[#2C241E] hover:text-[#9A7B38] hover:border-[#D4AF37] transition-colors cursor-pointer"
                            title="Edit Perfume"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(perfume.id)}
                            className="p-1.5 rounded-lg border border-[#E8DFD4] hover:bg-rose-50 text-[#7A6A5D] hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
                            title="Delete Perfume"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Perfume Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1C1714]/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#D4AF37]/50 shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col my-auto animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#E8DFD4] flex items-center justify-between bg-[#FAF7F2] rounded-t-3xl">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#9A7B38]">
                  Atelier Catalog Management
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#2C241E] font-medium">
                  {editingPerfume ? `Edit: ${editingPerfume.name}` : 'Add New Luxury Perfume'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#7A6A5D] hover:text-[#2C241E] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Scrollable Content */}
            <form onSubmit={handleSavePerfume} className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              {/* Image Selection Section */}
              <div className="space-y-3">
                <label className="font-semibold text-[#2C241E] flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#9A7B38]" />
                  <span>Product Flacon Image (Select from Presets or Enter Custom Image URL)</span>
                </label>

                {/* Preset Flacons Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-2 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD4]">
                  {FLACON_PRESETS.map((preset) => {
                    const isSelected =
                      !customImageUrl && formImage === preset.image;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => {
                          setFormImage(preset.image);
                          setCustomImageUrl('');
                        }}
                        className={`p-1.5 rounded-xl border bg-white cursor-pointer transition-all flex flex-col items-center text-center ${
                          isSelected
                            ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 shadow-xs'
                            : 'border-[#E8DFD4] hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <div className="w-14 h-16 rounded-lg overflow-hidden bg-[#FAF7F2] mb-1">
                          <img
                            src={preset.image}
                            alt={preset.name}
                            onError={(e) => handleImageError(e, preset.name)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[10px] font-medium text-[#2C241E] line-clamp-1 leading-tight">
                          {preset.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Image URL Alternative */}
                <div>
                  <label className="text-[11px] text-[#7A6A5D] block mb-1">
                    Or specify a custom Image URL:
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/perfume-flacon.jpg"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    Perfume Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lumina d'Or"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    French Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extrait de Parfum de Grasse"
                    value={formSubTitle}
                    onChange={(e) => setFormSubTitle(e.target.value)}
                    className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#2C241E] block mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. A radiant solar veil of saffron filaments, golden honey and Mysore sandalwood"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFD4]">
                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono font-semibold focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    MRP / Original (₹)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    Inventory Units
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formStockCount}
                    onChange={(e) => setFormStockCount(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer py-2">
                    <input
                      type="checkbox"
                      checked={formInStock}
                      onChange={(e) => setFormInStock(e.target.checked)}
                      className="w-4 h-4 text-[#D4AF37] accent-[#D4AF37] rounded"
                    />
                    <span className="font-semibold text-[#2C241E]">In Stock</span>
                  </label>
                </div>
              </div>

              {/* Classification & Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    Fragrance Family
                  </label>
                  <select
                    value={formFamily}
                    onChange={(e) => setFormFamily(e.target.value as any)}
                    className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Floral Silk">Floral Silk</option>
                    <option value="Amber & Woods">Amber & Woods</option>
                    <option value="Solar Warmth">Solar Warmth</option>
                    <option value="Gourmand Vanilla">Gourmand Vanilla</option>
                    <option value="Ruby & Crimson">Ruby & Crimson</option>
                    <option value="Sapphire Nocturne">Sapphire Nocturne</option>
                    <option value="Emerald Aromatic">Emerald Aromatic</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    Collection
                  </label>
                  <select
                    value={formCollectionId}
                    onChange={(e) => setFormCollectionId(e.target.value as any)}
                    className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="gold-reserve">Gold Reserve</option>
                    <option value="flora-couture">Flora Couture</option>
                    <option value="nocturne-elixirs">Nocturne Elixirs</option>
                    <option value="brumes-solaires">Brumes Solaires</option>
                    <option value="coffrets-voyage">Coffrets Voyage</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    Volume & Concentration
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formVolume}
                      onChange={(e) => setFormVolume(e.target.value)}
                      placeholder="100ml"
                      className="bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      value={formConcentration}
                      onChange={(e) => setFormConcentration(e.target.value)}
                      placeholder="Extrait (30%)"
                      className="bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Fragrance Notes */}
              <div className="space-y-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFD4]">
                <label className="font-semibold text-[#2C241E] block">
                  Olfactory Pyramid Notes (Comma-separated)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[11px] text-[#9A7B38] font-medium block mb-1">
                      Top Notes (First 15-30 mins)
                    </span>
                    <input
                      type="text"
                      value={formTopNotes}
                      onChange={(e) => setFormTopNotes(e.target.value)}
                      placeholder="e.g. Saffron, Bergamot, Neroli"
                      className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#9A7B38] font-medium block mb-1">
                      Heart Notes (2 - 8 hours)
                    </span>
                    <input
                      type="text"
                      value={formHeartNotes}
                      onChange={(e) => setFormHeartNotes(e.target.value)}
                      placeholder="e.g. Grasse Rose, Jasmine, Cedar"
                      className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#9A7B38] font-medium block mb-1">
                      Base Notes (12 - 24 hours)
                    </span>
                    <input
                      type="text"
                      value={formBaseNotes}
                      onChange={(e) => setFormBaseNotes(e.target.value)}
                      placeholder="e.g. Ambergris, Sandalwood, Oud"
                      className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Offers & Badges */}
              <div className="space-y-2">
                <label className="font-semibold text-[#2C241E] block">
                  Offers & Highlights
                </label>
                <div className="flex flex-wrap gap-4 items-center bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DFD4]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsBestSeller}
                      onChange={(e) => setFormIsBestSeller(e.target.checked)}
                      className="accent-[#D4AF37]"
                    />
                    <span>Best Seller</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsSale}
                      onChange={(e) => setFormIsSale(e.target.checked)}
                      className="accent-[#D4AF37]"
                    />
                    <span>Sale / Discount Offer</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsNewArrival}
                      onChange={(e) => setFormIsNewArrival(e.target.checked)}
                      className="accent-[#D4AF37]"
                    />
                    <span>New Arrival</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsAttar}
                      onChange={(e) => setFormIsAttar(e.target.checked)}
                      className="accent-[#D4AF37]"
                    />
                    <span>Pure Attar</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsGiftSet}
                      onChange={(e) => setFormIsGiftSet(e.target.checked)}
                      className="accent-[#D4AF37]"
                    />
                    <span>Gift Set</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[11px] text-[#7A6A5D] block mb-1">
                      Promotional Ribbon / Custom Badge (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 20% OFF or Limited Reserve"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                      className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#7A6A5D] block mb-1">
                      Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={90}
                      value={formDiscountPercent}
                      onChange={(e) => setFormDiscountPercent(Number(e.target.value))}
                      className="w-full bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Description & Story */}
              <div className="space-y-3">
                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    Olfactory Description
                  </label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Describe the fragrance texture, mood, and silage..."
                    className="w-full bg-white border border-[#E8DFD4] rounded-xl p-3 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    Atelier Craft Story
                  </label>
                  <textarea
                    rows={2}
                    value={formStory}
                    onChange={(e) => setFormStory(e.target.value)}
                    placeholder="Origin of botanicals, distillation tradition, aging method..."
                    className="w-full bg-white border border-[#E8DFD4] rounded-xl p-3 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Submit / Cancel Footer */}
              <div className="pt-4 border-t border-[#E8DFD4] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DFD4] text-[#7A6A5D] hover:bg-[#FAF7F2] font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#2C241E] hover:bg-[#9A7B38] text-white font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  {editingPerfume ? 'Save Changes' : 'Create Perfume Flacon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1714]/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-rose-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-700">
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-xl text-[#2C241E] font-medium">
                  Confirm Deletion
                </h4>
                <p className="text-xs text-[#7A6A5D]">
                  This action will permanently remove this perfume from the Atelier catalog.
                </p>
              </div>
            </div>

            <p className="text-xs text-[#4A3F35]">
              Are you sure you want to remove{' '}
              <strong>
                {perfumes.find((p) => p.id === deleteConfirmId)?.name}
              </strong>{' '}
              from the storefront and inventory?
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-[#E8DFD4] text-xs font-medium text-[#7A6A5D] hover:bg-[#FAF7F2] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                Delete Flacon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Plus, Edit3, Trash2, FolderTree, CheckCircle2, X } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { ProductCategory } from '../../../types';
import { handleImageError } from '../../../utils/imageFallback';

export const CategoriesView: React.FC = () => {
  const { categories, addCategory, updateCategory, perfumes } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<ProductCategory | null>(null);
  const [name, setName] = useState('');
  const [frenchName, setFrenchName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Active' | 'Hidden'>('Active');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenCreate = () => {
    setEditingCat(null);
    setName('');
    setFrenchName('');
    setDescription('');
    setStatus('Active');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: ProductCategory) => {
    setEditingCat(cat);
    setName(cat.name);
    setFrenchName(cat.frenchName);
    setDescription(cat.description);
    setStatus(cat.status);
    setIsModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingCat) {
      updateCategory(editingCat.id, {
        name: name.trim(),
        frenchName: frenchName.trim(),
        description: description.trim(),
        status
      });
      showToast(`Updated category "${name.trim()}".`);
    } else {
      const newCat: ProductCategory = {
        id: `cat-${Date.now()}`,
        name: name.trim(),
        frenchName: frenchName.trim(),
        description: description.trim(),
        itemCount: 0,
        status
      };
      addCategory(newCat);
      showToast(`Created category "${name.trim()}".`);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C241E] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#D4AF37]/60 flex items-center gap-3 text-xs tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-luxury text-2xl text-[#2C241E] font-medium">
            Fragrance Families & Collections ({categories.length})
          </h2>
          <p className="text-xs text-[#7A6A5D] mt-0.5">
            Organize the haute perfumerie catalog by olfactory accord, noble botanical heritage, and extraction format.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#1C1714] text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          // Count live perfumes matching
          const count = perfumes.filter(
            (p) =>
              p.family.toLowerCase() === cat.name.toLowerCase() ||
              p.collectionId.toLowerCase().includes(cat.id.replace('cat-', ''))
          ).length;

          return (
            <div
              key={cat.id}
              className="p-5 bg-white rounded-2xl border border-[#E8DFD4] hover:border-[#D4AF37]/60 shadow-xs flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] tracking-wider uppercase text-[#9A7B38] font-semibold block">
                      {cat.frenchName || 'Haute Famille'}
                    </span>
                    <h3 className="font-serif-luxury text-xl text-[#2C241E] font-medium mt-0.5">
                      {cat.name}
                    </h3>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      cat.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                    }`}
                  >
                    {cat.status}
                  </span>
                </div>

                <p className="text-xs text-[#6E5D53] mt-3 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8DFD4] flex items-center justify-between text-xs">
                <span className="font-mono text-[#7A6A5D] font-medium">
                  {count > 0 ? count : cat.itemCount} Flacons linked
                </span>

                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="p-1.5 rounded-lg border border-[#E8DFD4] hover:bg-[#FAF7F2] text-[#2C241E] hover:text-[#9A7B38] hover:border-[#D4AF37] transition-colors cursor-pointer"
                  title="Edit Category"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1714]/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#D4AF37]/50 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD4]">
              <div>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#9A7B38]">
                  Classification
                </span>
                <h3 className="font-serif-luxury text-xl text-[#2C241E] font-medium">
                  {editingCat ? `Edit: ${editingCat.name}` : 'New Fragrance Family'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#7A6A5D] hover:text-[#2C241E] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="font-semibold text-[#2C241E] block mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leather & Precious Woods"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#2C241E] block mb-1">
                  French Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cuir & Bois Précieux"
                  value={frenchName}
                  onChange={(e) => setFrenchName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#2C241E] block mb-1">
                  Olfactory Profile Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the aromatic characteristics and signature essences..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl p-3 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#2C241E] block mb-1">
                  Display Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'Active' | 'Hidden')}
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  <option value="Active">Active (Visible in Storefront)</option>
                  <option value="Hidden">Hidden (Draft / Archive)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#E8DFD4] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E8DFD4] text-[#7A6A5D] hover:bg-[#FAF7F2] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2C241E] hover:bg-[#9A7B38] text-white font-semibold transition-colors cursor-pointer"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

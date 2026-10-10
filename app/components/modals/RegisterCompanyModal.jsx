'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Loader2, Plus, Check } from 'lucide-react';
import { uploadImageToImgBB } from '../../lib/uploadImageToImgBB';
import { createCompanyAction } from '@/app/lib/actions/companyActions';
import toast from 'react-hot-toast';


export default function RegisterCompanyModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  // Category state management
  const [categories, setCategories] = useState([
    'Technology',
    'Design',
    'Finance',
    'Healthcare',
    'Marketing',
    'E-commerce',
  ]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: 'Technology',
    website: '',
    location: '',
    employeeCount: '1-10 employees',
    description: '',
  });

  // Clean up object URL memory leaks on unmount or file change
  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleAddCategory = () => {
    const trimmed = newCategoryInput.trim();
    if (trimmed) {
      if (!categories.includes(trimmed)) {
        setCategories((prev) => [...prev, trimmed]);
      }
      setFormData((prev) => ({ ...prev, category: trimmed }));
      setNewCategoryInput('');
      setIsAddingCategory(false);
    }
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!logoFile) {
    toast.error('Company logo is required.');
    return;
  }

  setLoading(true);
  const toastId = toast.loading('Uploading logo and registering company...');

  try {
    // 1. Upload logo image to ImgBB
    const logoUrl = await uploadImageToImgBB(logoFile);

    if (!logoUrl) {
      throw new Error('Failed to upload image. Please try again.');
    }

    // 2. Prepare payload
    const payload = {
      ...formData,
      logo: logoUrl,
    };

    // 3. Execute Server Action
    const response = await createCompanyAction(payload);

    if (!response.success) {
      throw new Error(response.error);
    }

    toast.success('Company registered successfully!', { id: toastId });

    onSuccess?.(response.data);
    onClose();
  } catch (error) {
    toast.error(error.message || 'Failed to register company', { id: toastId });
  } finally {
    setLoading(false);
  }
};
 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800/80">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Register New Company</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Enter your business details to start hiring on HireLoop.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Company Name (Required) */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Company Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ACME Corp"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Industry / Category (Required) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Industry / Category <span className="text-rose-500">*</span>
                </label>
                {!isAddingCategory && (
                  <button
                    type="button"
                    onClick={() => setIsAddingCategory(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Add Custom
                  </button>
                )}
              </div>

              {isAddingCategory ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    autoFocus
                    required
                    placeholder="Enter category name"
                    value={newCategoryInput}
                    onChange={(e) => setNewCategoryInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCategory();
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-indigo-500/80 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 transition-colors"
                    title="Confirm Category"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingCategory(false);
                      setNewCategoryInput('');
                    }}
                    className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shrink-0 transition-colors"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors capitalize"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Website URL (Optional) */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Website URL
              </label>
              <input
                type="url"
                placeholder="https://company.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Location (Required) */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Location <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="City, Country"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Employee Count */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Employee Count Range
              </label>
              <select
                value={formData.employeeCount}
                onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="1-10 employees">1-10 employees</option>
                <option value="11-50 employees">11-50 employees</option>
                <option value="51-200 employees">51-200 employees</option>
                <option value="500+ employees">500+ employees</option>
              </select>
            </div>

            {/* Company Logo (Required) */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Company Logo <span className="text-rose-500">*</span>
              </label>
              <label className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 cursor-pointer text-xs transition-all">
                <Upload className="w-4 h-4" />
                <span className="truncate">{logoFile ? logoFile.name : 'Select Image (PNG, JPG)'}</span>
                <input type="file" accept="image/*" required onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* Brief Description */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Brief Description</label>
            <textarea
              rows={3}
              placeholder="Tell us about your company's mission and culture..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none transition-colors"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold text-xs hover:bg-slate-800 dark:hover:bg-slate-200 disabled:opacity-50 transition-all"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Register Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
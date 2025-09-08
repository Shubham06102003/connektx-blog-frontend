"use client";

import { useState } from 'react';

export default function CategoryForm({ onSubmit, submitButtonText, initialData }) {
  const [form, setForm] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    imgUrl: initialData?.imgUrl || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSubmit(form);
    } catch (err) {
      setError('Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl shadow-2xl max-w-xl mx-auto border border-blue-50" style={{ fontFamily: 'Inter, Nunito Sans, Lato, sans-serif' }}>
      <div>
        <label className="block text-base font-semibold text-blue-900 mb-2 tracking-tight">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-lg bg-blue-50 placeholder:text-blue-300"
          placeholder="Enter category name"
        />
      </div>
      <div>
        <label className="block text-base font-semibold text-blue-900 mb-2 tracking-tight">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-lg bg-blue-50 placeholder:text-blue-300"
          placeholder="Enter description"
        />
      </div>
      <div>
        <label className="block text-base font-semibold text-blue-900 mb-2 tracking-tight">Image URL</label>
        <input
          name="imgUrl"
          value={form.imgUrl}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-lg bg-blue-50 placeholder:text-blue-300"
          placeholder="Paste image URL (Google Drive or direct)"
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
        >
          {saving ? 'Saving...' : submitButtonText}
        </button>
      </div>
    </form>
  );
}

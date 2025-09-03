'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { api } from '@/lib/api';   // ⬅️ assumes GET /categories/slug/{slug} returns { id, name, slug }
import CategoryImagePreview from './CategoryImagePreview';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

export default function BlogForm({ categories, onSubmit, submitButtonText, initialData }) {
  const [formData, setFormData] = useState({
    title:      initialData?.title      || '',
    categoryId: initialData?.categoryId || '',   // ✅ consistently categoryId
    excerpt:    initialData?.excerpt    || '',
    content:    initialData?.content    || '',
    thumbnail:  initialData?.thumbnail  || '',   // ✅ added thumbnail field
    createdBy: initialData?.createdBy || 'Admin',
    published:  initialData?.published  ?? false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* -------------------------------------------------- */
  /* resolve slug ➜ id whenever user changes <select>   */
  /* -------------------------------------------------- */
  const handleCategoryChange = async (e) => {
    const slug = e.target.value;
    if (!slug) {
      setFormData((p) => ({ ...p, categoryId: '' }));
      return;
    }
    try {
      const { data } = await api.get(`/categories/slug/${slug}`);
      setFormData((p) => ({ ...p, categoryId: data.id })); // ✅ use categoryId
    } catch (err) {
      console.error('Unable to resolve category slug:', err);
    }
  };

  /* normal input / checkbox handler */
  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleContent = (html) => setFormData((p) => ({ ...p, content: html }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Submitting blog post:', formData);
    try {
      await onSubmit({
        title:      formData.title,
        categoryId: formData.categoryId,   // ✅ fixed
        excerpt:    formData.excerpt,
        content:    formData.content,
        thumbnail:  formData.thumbnail,    // ✅ include thumbnail
        createdBy:  formData.createdBy,
        published:  formData.published,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Quill config unchanged ↓ */
  const modules = {
    toolbar: [
      [{ header:[1,2,3,4,5,6,false] }],
      ['bold','italic','underline','strike'],
      [{ color:[] },{ background:[] }],
      [{ align:[] }],
      ['blockquote','code-block'],
      [{ list:'ordered' },{ list:'bullet' }],
      [{ indent:'-1' },{ indent:'+1' }],
      ['link','image'],
      ['clean']
    ]
  };

  const formats = [
    'header','bold','italic','underline','strike','color','background','align',
    'blockquote','code-block','list','indent','link','image'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
        <input
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleInput}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* category – option value is slug */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
        <select
          id="category"
          required
          onChange={handleCategoryChange}
          value={
            // preselect the category slug if editing
            categories.find(c => c.id === formData.categoryId)?.slug || ''
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows="3"
          value={formData.excerpt}
          onChange={handleInput}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Brief description…"
        />
      </div>

      {/* content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
        <div className="border border-gray-300 rounded-md">
          <ReactQuill
            value={formData.content}
            onChange={handleContent}
            modules={modules}
            formats={formats}
            theme="snow"
            style={{ minHeight: 200 }}
          />
        </div>
      </div>

      {/* thumbnail */}
      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image URL</label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="url"
          value={formData.thumbnail}
          onChange={handleInput}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/image.jpg or Google Drive link"
        />
        {formData.thumbnail && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <CategoryImagePreview
              imgUrl={formData.thumbnail}
              name="Thumbnail preview"
              size="w-32 h-20"
              shape="rounded-md"
              className="border border-gray-300"
            />
          </div>
        )}
      </div>

      {/* createdBy */}
      <div>
        <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700 mb-2">Created By *</label>
        <input
          id="createdBy"
          name="createdBy"
          required
          value={formData.createdBy}
          onChange={handleInput}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* published */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          name="published"
          checked={formData.published}
          onChange={handleInput}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="published" className="ml-2 block text-sm text-gray-900">Published</label>
      </div>

      {/* submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700
                     focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving…' : submitButtonText}
        </button>
      </div>
    </form>
  );
}

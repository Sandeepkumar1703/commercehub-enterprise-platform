import React, { useEffect, useState } from 'react';
import { categoryService } from '../../services/category.service';
import { FolderTree, Plus, Trash2, Edit3, Loader2 } from 'lucide-react';

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoryService.getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    try {
      await categoryService.createCategory({ name, description, imageUrl });
      setName('');
      setDescription('');
      setImageUrl('');
      setIsCreating(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      await categoryService.deleteCategory(id);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b pb-4 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <FolderTree className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Category Management</h1>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 space-y-4">
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white">New Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Category
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-5 space-y-3 shadow-sm">
              {cat.imageUrl && (
                <img src={cat.imageUrl} alt={cat.name} className="w-full h-32 object-cover rounded-lg" />
              )}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{cat.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cat.description || 'No description'}</p>
                </div>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

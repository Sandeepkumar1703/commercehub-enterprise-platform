import React, { useEffect, useState } from 'react';
import { mediaService } from '../../services/media.service';
import { Image, Upload, Trash2, Loader2, FileText } from 'lucide-react';

export const AdminMediaPage: React.FC = () => {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await mediaService.getAllMedia();
      setMediaList(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrl) return;
    try {
      const formData = new FormData();
      formData.append('url', fileUrl);
      formData.append('fileName', fileName || 'media_asset.png');
      await mediaService.uploadMedia(formData);
      setFileUrl('');
      setFileName('');
      fetchMedia();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    try {
      await mediaService.deleteMedia(id);
      fetchMedia();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b pb-4 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <Image className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Media Library</h1>
        </div>
      </div>

      <form onSubmit={handleUpload} className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 space-y-4">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Upload Media Asset</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Image URL</label>
            <input
              type="url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="https://..."
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="product_banner.jpg"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
        </div>
        <button type="submit" className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Upload className="w-4 h-4" />
          <span>Upload Media</span>
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaList.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden shadow-sm group">
              <div className="h-40 bg-gray-100 dark:bg-gray-900 overflow-hidden relative">
                <img src={item.url} alt={item.fileName} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="truncate pr-2">
                  <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{item.fileName}</p>
                  <p className="text-xs text-gray-500">{(item.fileSize / 1024).toFixed(1)} KB</p>
                </div>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 p-1">
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

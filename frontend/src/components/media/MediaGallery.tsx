import React, { useEffect, useState } from 'react';
import { mediaApi } from '../../api/mediaApi';
import { MediaFile } from '../../types';
import { Trash2, Copy, Check, ExternalLink, Image as ImageIcon, Search, RefreshCw } from 'lucide-react';

interface MediaGalleryProps {
  refreshTrigger?: number;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ refreshTrigger }) => {
  const [mediaList, setMediaList] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await mediaApi.getMediaList();
      if (res && res.success && Array.isArray(res.data)) {
        setMediaList(res.data);
      } else if (res && Array.isArray(res as any)) {
        setMediaList(res as any);
      } else {
        setMediaList([]);
      }
    } catch {
      setMediaList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    try {
      await mediaApi.deleteMedia(id);
      fetchMedia();
    } catch (err) {
      console.error('Failed to delete media asset:', err);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = mediaList.filter((m) =>
    m.fileName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[var(--vynk-brand)]" /> Digital Asset Library ({filtered.length})
          </h2>
          <p className="text-xs text-slate-400">Manage image assets, product photography, and banners</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[var(--vynk-brand)] text-slate-900 dark:text-white"
            />
          </div>
          <button
            onClick={fetchMedia}
            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-xs text-slate-400">Loading asset gallery...</div>
      ) : filtered.length === 0 ? (
        <div className="p-8 text-center text-xs text-slate-400">No media uploaded.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const url = item.fileUrl || item.url || '';
            const fileName = item.fileName || item.originalFileName || 'Untitled';
            const sizeMb = item.fileSize ? (item.fileSize / (1024 * 1024)).toFixed(2) : (item.sizeMb || 0);
            const mimeType = item.contentType || item.mimeType || 'file';
            const dateStr = item.createdAt || item.uploadedAt;
            return (
              <div
                key={item.id}
                className="group border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="h-40 relative bg-slate-200 dark:bg-slate-900 overflow-hidden flex items-center justify-center">
                  {url ? (
                    <img
                      src={url}
                      alt={fileName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-400" />
                  )}
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur text-white font-mono text-[10px] rounded-md">
                    {sizeMb} MB
                  </span>
                </div>

                <div className="p-3 space-y-2">
                  <p className="font-bold text-xs text-slate-900 dark:text-white truncate" title={fileName}>
                    {fileName}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{dateStr ? new Date(dateStr).toLocaleDateString() : 'N/A'}</span>
                    <span className="uppercase font-mono font-bold text-[var(--vynk-brand)]">{mimeType.split('/')[1] || mimeType}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                    <button
                      onClick={() => handleCopyUrl(url, item.id)}
                      className="flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-[var(--vynk-brand)] cursor-pointer"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === item.id ? 'Copied' : 'Copy URL'}
                    </button>

                    <div className="flex items-center gap-1">
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-500 hover:text-[var(--vynk-brand)] rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

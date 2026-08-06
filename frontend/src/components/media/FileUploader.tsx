import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { mediaApi } from '../../api/mediaApi';
import { MediaFile } from '../../types';

interface FileUploaderProps {
  onUploadSuccess?: (file: MediaFile) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleUpload = async (fileToUpload?: File | string) => {
    setUploading(true);
    setMessage(null);
    try {
      const userSessionStr = localStorage.getItem('user_session');
      const user = userSessionStr ? JSON.parse(userSessionStr) : null;
      const userId = user?.id;

      let res;
      if (fileToUpload instanceof File) {
        res = await mediaApi.uploadMedia(fileToUpload, userId);
      } else {
        const name = typeof fileToUpload === 'string' && fileToUpload ? fileToUpload : (fileName || `asset_${Date.now()}.png`);
        res = await mediaApi.uploadMedia(name, userId);
      }

      const mediaResult = (res as any)?.media || (res as any)?.data || res;
      if (mediaResult) {
        setMessage('File successfully uploaded to CDN storage!');
        setFileName('');
        if (onUploadSuccess) onUploadSuccess(mediaResult);
      }
    } catch (err: any) {
      setMessage(err?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      handleUpload(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <UploadCloud className="w-5 h-5 text-[var(--vynk-brand)]" />
        <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
          Media Asset Uploader
        </h2>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer relative ${
          dragActive
            ? 'border-[var(--vynk-brand)] bg-[var(--vynk-brand)]/10'
            : 'border-slate-200 dark:border-slate-800 hover:border-[var(--vynk-brand)] bg-slate-50/50 dark:bg-slate-800/40'
        }`}
      >
        <input
          type="file"
          accept="image/*,video/*,application/pdf"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="space-y-3 pointer-events-none">
          <div className="w-12 h-12 rounded-2xl bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] flex items-center justify-center mx-auto">
            {uploading ? (
              <RefreshCw className="w-6 h-6 animate-spin" />
            ) : (
              <ImageIcon className="w-6 h-6" />
            )}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Drag & drop media files here, or <span className="text-[var(--vynk-brand)]">browse</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Supports PNG, JPG, WEBP, MP4 up to 50MB per file
            </p>
          </div>
        </div>
      </div>

      {/* Manual Name Upload fallback */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Custom Asset Name (e.g., banner_hero_v2.webp)..."
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[var(--vynk-brand)] text-slate-900 dark:text-white"
        />
        <button
          onClick={() => handleUpload()}
          disabled={uploading || !fileName.trim()}
          className="px-4 py-2 bg-[var(--vynk-brand)] hover:bg-[var(--vynk-brand-hover)] disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-sm"
        >
          {uploading ? 'Uploading...' : 'Simulate Upload'}
        </button>
      </div>

      {message && (
        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4" /> {message}
        </p>
      )}
    </div>
  );
};

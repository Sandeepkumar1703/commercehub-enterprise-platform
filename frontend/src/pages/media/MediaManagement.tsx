import React, { useState } from 'react';
import { FileUploader } from '../../components/media/FileUploader';
import { MediaGallery } from '../../components/media/MediaGallery';
import { Image as ImageIcon } from 'lucide-react';

export const MediaManagement: React.FC = () => {
  const [refreshCount, setRefreshCount] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshCount((prev) => prev + 1);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-[var(--vynk-brand)]" /> CDN & Media Asset Manager
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Upload product images, brand banners, and manage high-resolution cloud assets
        </p>
      </div>

      <FileUploader onUploadSuccess={handleUploadSuccess} />
      <MediaGallery refreshTrigger={refreshCount} />
    </div>
  );
};

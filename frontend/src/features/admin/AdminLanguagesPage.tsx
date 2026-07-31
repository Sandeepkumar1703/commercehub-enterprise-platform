import React, { useEffect, useState } from 'react';
import { languageService } from '../../services/language.service';
import { Globe, Plus, Trash2, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export const AdminLanguagesPage: React.FC = () => {
  const [languages, setLanguages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [nativeName, setNativeName] = useState('');
  const [flag, setFlag] = useState('');

  const fetchLanguages = async () => {
    setLoading(true);
    try {
      const res = await languageService.getLanguages();
      setLanguages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !name) return;
    try {
      await languageService.createLanguage({ code, name, nativeName, flag });
      setCode('');
      setName('');
      setNativeName('');
      setFlag('');
      fetchLanguages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleEnable = async (id: string, isEnabled: boolean) => {
    try {
      if (isEnabled) await languageService.disableLanguage(id);
      else await languageService.enableLanguage(id);
      fetchLanguages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this language?')) return;
    try {
      await languageService.deleteLanguage(id);
      fetchLanguages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b pb-4 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <Globe className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Language Management</h1>
        </div>
      </div>

      <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 space-y-4">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Add Supported Language</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Code (e.g. ja)</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
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
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Native Name</label>
            <input
              type="text"
              value={nativeName}
              onChange={(e) => setNativeName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Flag Emoji</label>
            <input
              type="text"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              placeholder="🇯🇵"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Save Language
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((lang) => (
            <div key={lang.id} className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-5 space-y-3 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{lang.flag || '🌐'}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{lang.name} ({lang.code})</h3>
                    <p className="text-xs text-gray-500">{lang.nativeName}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(lang.id)} className="text-red-600 hover:text-red-800 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between border-t pt-3 dark:border-gray-700 text-xs">
                <button
                  onClick={() => handleToggleEnable(lang.id, lang.enabled)}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-medium ${
                    lang.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {lang.enabled ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  <span>{lang.enabled ? 'Enabled' : 'Disabled'}</span>
                </button>
                {lang.isDefault && <span className="font-bold text-blue-600">Default Language</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Globe, ToggleLeft, ToggleRight, Plus, Trash2, X, Star, Edit, Check } from 'lucide-react';
import { languageApi } from '../../api/languageApi';
import { translationApi } from '../../api/translationApi';
import { Language } from '../../types';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const LanguageManagement: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New Language Modal
  const [showAddLangModal, setShowAddLangModal] = useState(false);
  const [newLang, setNewLang] = useState({ code: '', name: '', nativeName: '', direction: 'ltr' as 'ltr' | 'rtl' });

  // New Translation Pair
  const [showAddTransModal, setShowAddTransModal] = useState(false);
  const [newTransKey, setNewTransKey] = useState('');
  const [newTransValue, setNewTransValue] = useState('');

  // Editing existing translation
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');

  const fetchLanguagesAndTranslations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await languageApi.getAllLanguages();
      const langs = (res as any)?.data || res;
      if (Array.isArray(langs)) {
        setLanguages(langs);
      }

      const tRes = await translationApi.getTranslationMap(selectedLang);
      const map = (tRes as any)?.data || tRes;
      if (map && typeof map === 'object') {
        setTranslations(map as Record<string, string>);
      }
    } catch (err: any) {
      setError(err.message || 'Error loading i18n languages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguagesAndTranslations();
  }, [selectedLang]);

  const handleToggleLang = async (lang: Language) => {
    try {
      const idOrCode = lang.id || lang.code;
      await languageApi.toggleLanguage(idOrCode, !lang.enabled);
      await fetchLanguagesAndTranslations();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle language status');
    }
  };

  const handleSetDefaultLang = async (lang: Language) => {
    try {
      const idOrCode = lang.id || lang.code;
      await languageApi.setDefaultLanguage(idOrCode);
      await fetchLanguagesAndTranslations();
    } catch (err: any) {
      alert(err.message || 'Failed to set default language');
    }
  };

  const handleDeleteLanguage = async (lang: Language) => {
    if (confirm(`Are you sure you want to delete language [${lang.name} (${lang.code})]?`)) {
      try {
        const idOrCode = lang.id || lang.code;
        await languageApi.deleteLanguage(idOrCode);
        await fetchLanguagesAndTranslations();
      } catch (err: any) {
        alert(err.message || 'Failed to delete language');
      }
    }
  };

  const handleCreateLanguage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLang.code || !newLang.name) return;
    try {
      await languageApi.createLanguage({
        code: newLang.code,
        name: newLang.name,
        nativeName: newLang.nativeName,
        rtl: newLang.direction === 'rtl',
        enabled: true,
      });
      setNewLang({ code: '', name: '', nativeName: '', direction: 'ltr' });
      setShowAddLangModal(false);
      await fetchLanguagesAndTranslations();
    } catch (err: any) {
      alert(err.message || 'Failed to create language');
    }
  };

  const handleSaveTranslation = async (key: string) => {
    try {
      const selectedLangObj = languages.find((l) => l.code === selectedLang);
      await translationApi.createKey({
        keyName: key,
        value: editingValue,
        languageId: selectedLangObj?.id,
      });
      setEditingKey(null);
      await fetchLanguagesAndTranslations();
    } catch (err: any) {
      alert(err.message || 'Failed to update translation');
    }
  };

  const handleDeleteTranslation = async (key: string) => {
    if (confirm(`Delete key [${key}] for language [${selectedLang.toUpperCase()}]?`)) {
      try {
        await translationApi.deleteKey(key);
        await fetchLanguagesAndTranslations();
      } catch (err: any) {
        alert(err.message || 'Failed to delete translation key');
      }
    }
  };

  const handleCreateTranslation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTransKey || !newTransValue) return;
    try {
      const selectedLangObj = languages.find((l) => l.code === selectedLang);
      await translationApi.createKey({
        keyName: newTransKey,
        value: newTransValue,
        languageId: selectedLangObj?.id,
      });
      setNewTransKey('');
      setNewTransValue('');
      setShowAddTransModal(false);
      await fetchLanguagesAndTranslations();
    } catch (err: any) {
      alert(err.message || 'Failed to create translation key');
    }
  };

  if (loading) return <Loader text="Querying Multilingual Localization Engine..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchLanguagesAndTranslations} />;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Globe className="w-6 h-6 text-[var(--vynk-brand)]" />
            Multilingual Localization & Translation CRUD
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage supported platform locales, translation keys, and string dictionaries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" onClick={() => setShowAddLangModal(true)}>
            <Plus className="w-4 h-4 mr-1" /> Add New Language
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowAddTransModal(true)}>
            <Plus className="w-4 h-4 mr-1" /> Add Translation Key
          </Button>
        </div>
      </div>

      {/* Languages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {languages.map((lang) => {
          const isRTL = lang.rtl === true || lang.direction === 'rtl';
          return (
            <div
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`card-surface p-4 cursor-pointer transition-all relative group ${
                selectedLang === lang.code ? 'border-[var(--vynk-brand)] bg-[var(--vynk-brand)]/10 ring-1 ring-[var(--vynk-brand)]' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs uppercase text-slate-900 dark:text-slate-100">{lang.name}</span>
                    {lang.defaultLanguage && (
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" title="Default Language" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {lang.nativeName} ({isRTL ? 'RTL' : 'LTR'})
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {!lang.defaultLanguage && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetDefaultLang(lang);
                      }}
                      className="p-1 text-slate-400 hover:text-amber-500 cursor-pointer"
                      title="Set as Default Language"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleLang(lang);
                    }}
                    className={`p-1.5 rounded-lg cursor-pointer ${lang.enabled ? 'text-emerald-600' : 'text-slate-400'}`}
                    title={lang.enabled ? 'Disable Language' : 'Enable Language'}
                  >
                    {lang.enabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>

                  {!lang.defaultLanguage && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteLanguage(lang);
                      }}
                      className="p-1 text-slate-400 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete Language"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Translations Table/List */}
      <div className="card-surface p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Translation Map for Locale [{selectedLang.toUpperCase()}] ({Object.keys(translations).length} entries)
          </h3>
          <Button size="xs" variant="outline" onClick={() => setShowAddTransModal(true)}>
            + Add Key to [{selectedLang.toUpperCase()}]
          </Button>
        </div>

        <div className="space-y-3">
          {Object.entries(translations).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between text-xs py-2 border-b border-slate-100 dark:border-slate-800 gap-4">
              <span className="font-mono text-[var(--vynk-brand)] font-bold shrink-0 w-1/3 truncate" title={key}>{key}</span>

              {editingKey === key ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input value={editingValue} onChange={(e) => setEditingValue(e.target.value)} className="text-xs" />
                  <Button size="sm" onClick={() => handleSaveTranslation(key)}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingKey(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between flex-1 gap-2">
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{value}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        setEditingKey(key);
                        setEditingValue(value);
                      }}
                      className="p-1 text-slate-400 hover:text-[var(--vynk-brand)] cursor-pointer"
                      title="Edit Translation"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTranslation(key)}
                      className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                      title="Delete Key"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Language Modal */}
      {showAddLangModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="card-surface p-6 max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Add New Locale Language</h3>
              <button onClick={() => setShowAddLangModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateLanguage} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Language Code (e.g. ja, de, it)</label>
                <Input value={newLang.code} onChange={(e) => setNewLang({ ...newLang, code: e.target.value.toLowerCase() })} placeholder="e.g. ja" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Display Name</label>
                <Input value={newLang.name} onChange={(e) => setNewLang({ ...newLang, name: e.target.value })} placeholder="e.g. Japanese" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Native Name</label>
                <Input value={newLang.nativeName} onChange={(e) => setNewLang({ ...newLang, nativeName: e.target.value })} placeholder="e.g. 日本語" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Direction</label>
                <select
                  value={newLang.direction}
                  onChange={(e) => setNewLang({ ...newLang, direction: e.target.value as 'ltr' | 'rtl' })}
                  className="w-full mt-1 p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-xs"
                >
                  <option value="ltr">Left to Right (LTR)</option>
                  <option value="rtl">Right to Left (RTL)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddLangModal(false)}>Cancel</Button>
                <Button type="submit" size="sm">Create Language</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Translation Key Modal */}
      {showAddTransModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="card-surface p-6 max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Add Translation Key for [{selectedLang.toUpperCase()}]</h3>
              <button onClick={() => setShowAddTransModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateTranslation} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Translation Key</label>
                <Input value={newTransKey} onChange={(e) => setNewTransKey(e.target.value.toLowerCase().replace(/\s+/g, '_'))} placeholder="e.g. checkout_now" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Translated Value</label>
                <Input value={newTransValue} onChange={(e) => setNewTransValue(e.target.value)} placeholder="e.g. Proceed to Checkout" required />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddTransModal(false)}>Cancel</Button>
                <Button type="submit" size="sm">Add Key & Value</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

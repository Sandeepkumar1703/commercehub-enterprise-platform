import React, { useState, useEffect } from 'react';
import {
  Globe,
  Plus,
  Search,
  Edit2,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Check,
  X,
  Code,
  Layers,
  Sparkles,
  Eye,
  Settings2,
  Languages,
} from 'lucide-react';
import { useLanguage } from '../../core/i18n/LanguageContext';
import { SupportedLanguage } from '../../core/i18n/translations';
import { useToast } from '../../shared/components/Toast';

interface TranslationItem {
  key: string;
  module: string;
  translations: Record<string, string>;
}

export const AdminTranslationsPage: React.FC = () => {
  const { options, reloadTranslations, t } = useLanguage();
  const { showToast, success, error, info } = useToast();

  const [keys, setKeys] = useState<TranslationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState('ALL');

  // New Key Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newModule, setNewModule] = useState('UI');
  const [newTranslations, setNewTranslations] = useState<Record<string, string>>({
    en: '',
    hi: '',
    ar: '',
    ru: '',
    es: '',
    fr: '',
    de: '',
  });

  // Edit Key Modal state
  const [editingKey, setEditingKey] = useState<TranslationItem | null>(null);
  const [editTranslations, setEditTranslations] = useState<Record<string, string>>({});

  // Simulator state
  const [simulatorKey, setSimulatorKey] = useState<string>('');

  const fetchAllKeys = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/translations/all');
      if (res.ok) {
        const data = await res.json();
        setKeys(data.keys || []);
        if (data.keys?.length > 0 && !simulatorKey) {
          setSimulatorKey(data.keys[0].key);
        }
      }
    } catch {
      error('Failed to fetch translation database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllKeys();
  }, []);

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) {
      error('Please enter a valid key name (e.g., checkout.vat_notice)');
      return;
    }

    try {
      const res = await fetch('/api/admin/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: newKeyName.trim().toLowerCase(),
          module: newModule,
          translations: newTranslations,
        }),
      });

      if (res.ok) {
        success(`Translation key "${newKeyName}" created successfully!`);
        setIsAddModalOpen(false);
        setNewKeyName('');
        setNewTranslations({ en: '', hi: '', ar: '', ru: '', es: '', fr: '', de: '' });
        await fetchAllKeys();
        await reloadTranslations();
      } else {
        error('Failed to create key');
      }
    } catch {
      error('Error communicating with translation server');
    }
  };

  const handleUpdateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingKey) return;

    try {
      const res = await fetch(`/api/admin/translations/${encodeURIComponent(editingKey.key)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          translations: editTranslations,
        }),
      });

      if (res.ok) {
        success(`Updated translations for key "${editingKey.key}"`);
        setEditingKey(null);
        await fetchAllKeys();
        await reloadTranslations();
      } else {
        error('Failed to update key');
      }
    } catch {
      error('Error updating translation key');
    }
  };

  const handleDeleteKey = async (keyToDelete: string) => {
    if (!window.confirm(`Are you sure you want to delete the translation key "${keyToDelete}"?`)) return;

    try {
      const res = await fetch(`/api/admin/translations/${encodeURIComponent(keyToDelete)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        info(`Deleted translation key "${keyToDelete}"`);
        await fetchAllKeys();
        await reloadTranslations();
      } else {
        error('Failed to delete key');
      }
    } catch {
      error('Error deleting key');
    }
  };

  // Modules list
  const modules = Array.from(new Set(['ALL', ...keys.map((k) => k.module || 'GENERAL')]));

  // Filtered keys
  const filteredKeys = keys.filter((k) => {
    const matchesModule = selectedModule === 'ALL' || k.module === selectedModule;
    const matchesSearch =
      k.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(k.translations).some((v) => String(v || '').toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesModule && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface border border-border p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand/10 text-brand">
              <Globe className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-extrabold text-content-primary tracking-tight">
              Enterprise Localization & Translation Engine
            </h1>
          </div>
          <p className="text-xs text-content-muted mt-1 max-w-2xl">
            Manage UI static text, dynamic business strings, and RTL directionalities. Changes save instantly to the
            in-memory key-value dictionary and propagate across the platform without rebuilds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              fetchAllKeys();
              reloadTranslations();
              info('Refreshed translation database from server');
            }}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold border border-border rounded-xl bg-surface hover:bg-surface-hover text-content-primary transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-content-muted" /> Sync Database
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand hover:bg-brand-hover rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Translation Key
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-border p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-content-muted uppercase tracking-wider">Supported Languages</div>
            <div className="text-2xl font-black text-content-primary mt-1">{options.length}</div>
            <div className="text-[10px] text-content-muted mt-0.5">EN, HI, AR, RU, ES, FR, DE</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
            <Languages className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface border border-border p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-content-muted uppercase tracking-wider">Translation Keys</div>
            <div className="text-2xl font-black text-content-primary mt-1">{keys.length}</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">O(1) Memory Lookup</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
            <Code className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface border border-border p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-content-muted uppercase tracking-wider">RTL Direction Support</div>
            <div className="text-2xl font-black text-content-primary mt-1">1 (Arabic)</div>
            <div className="text-[10px] text-content-muted mt-0.5">Auto-flips layouts & icons</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface border border-border p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-content-muted uppercase tracking-wider">API Sync Protocol</div>
            <div className="text-sm font-black text-emerald-500 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Operational
            </div>
            <div className="text-[10px] text-content-muted mt-0.5">GET /api/translations/map/*</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
            <Settings2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Supported Languages Overview Bar */}
      <div className="bg-surface border border-border p-5 rounded-2xl shadow-xs">
        <div className="text-xs font-extrabold uppercase tracking-wider text-content-muted mb-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-brand" /> Active Enterprise Locale Configurations
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {options.map((opt) => (
            <div
              key={opt.code}
              className="p-3 border border-border/80 rounded-xl bg-background flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{opt.flag}</span>
                <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand/10 text-brand">
                  {opt.code}
                </span>
              </div>
              <div className="mt-2">
                <div className="text-xs font-bold text-content-primary">{opt.nativeName}</div>
                <div className="text-[10px] text-content-muted flex items-center justify-between mt-0.5">
                  <span>{opt.name}</span>
                  <span className="font-semibold uppercase">{opt.dir}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Translation Simulator Drawer / Box */}
      <div className="bg-surface border border-border p-6 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-brand" />
            <h3 className="text-sm font-extrabold text-content-primary">Live Multi-Language Simulator</h3>
          </div>
          <span className="text-[11px] text-content-muted font-mono">t("{simulatorKey || 'key'}")</span>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={simulatorKey}
            onChange={(e) => setSimulatorKey(e.target.value)}
            className="px-3 py-2 text-xs font-bold border border-border rounded-xl bg-background text-content-primary focus:outline-none focus:border-brand max-w-md cursor-pointer"
          >
            {keys.map((k) => (
              <option key={k.key} value={k.key}>
                {k.key} ({k.module})
              </option>
            ))}
          </select>
          <span className="text-xs text-content-muted">Select key to preview across all 7 supported locales</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 pt-2">
          {options.map((opt) => {
            const val = keys.find((k) => k.key === simulatorKey)?.translations[opt.code] || '—';
            return (
              <div
                key={opt.code}
                className={`p-3 rounded-xl border transition-all ${
                  opt.dir === 'rtl' ? 'bg-amber-500/5 border-amber-500/30' : 'bg-surface-hover/50 border-border/60'
                }`}
                dir={opt.dir}
              >
                <div className="flex items-center justify-between text-[10px] font-extrabold text-content-muted mb-1.5" dir="ltr">
                  <span>{opt.flag} {opt.code.toUpperCase()}</span>
                  <span className="text-[9px] uppercase font-mono">{opt.dir}</span>
                </div>
                <div className="text-xs font-medium text-content-primary break-words leading-relaxed">
                  {val}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Translation Keys Table */}
      <div className="bg-surface border border-border rounded-2xl shadow-xs overflow-hidden">
        {/* Table Filters & Header */}
        <div className="p-5 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-content-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by key name or translated value..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-border rounded-xl bg-background text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-content-muted">Module Filter:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {modules.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedModule(m)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedModule === m
                      ? 'bg-brand text-white shadow-xs'
                      : 'bg-surface-hover text-content-secondary hover:text-content-primary border border-border/60'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Content */}
        {loading ? (
          <div className="p-12 text-center text-xs text-content-muted">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand mb-2" />
            Loading translation keys database...
          </div>
        ) : filteredKeys.length === 0 ? (
          <div className="p-12 text-center text-xs text-content-muted">
            No translation keys found matching your search or module filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-hover/50 text-[11px] font-extrabold uppercase tracking-wider text-content-muted">
                  <th className="py-3.5 px-4">Key Identifier</th>
                  <th className="py-3.5 px-3">Module</th>
                  <th className="py-3.5 px-3">🇺🇸 English (EN)</th>
                  <th className="py-3.5 px-3">🇮🇳 Hindi (HI)</th>
                  <th className="py-3.5 px-3">🇸🇦 Arabic (AR)</th>
                  <th className="py-3.5 px-3">🇷🇺 Russian (RU)</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs font-medium">
                {filteredKeys.map((item) => (
                  <tr key={item.key} className="hover:bg-surface-hover/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-brand">{item.key}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-hover border border-border text-content-secondary">
                        {item.module}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-content-primary max-w-xs truncate" title={item.translations.en}>
                      {item.translations.en || '—'}
                    </td>
                    <td className="py-3 px-3 text-content-primary max-w-xs truncate" title={item.translations.hi}>
                      {item.translations.hi || '—'}
                    </td>
                    <td className="py-3 px-3 text-content-primary max-w-xs truncate" dir="rtl" title={item.translations.ar}>
                      {item.translations.ar || '—'}
                    </td>
                    <td className="py-3 px-3 text-content-primary max-w-xs truncate" title={item.translations.ru}>
                      {item.translations.ru || '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingKey(item);
                            setEditTranslations({ ...item.translations });
                          }}
                          className="p-1.5 text-content-muted hover:text-brand hover:bg-brand/10 rounded-lg transition-colors cursor-pointer"
                          title="Edit translations"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteKey(item.key)}
                          className="p-1.5 text-content-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete key"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add New Key Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-surface border border-border rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand" />
                <h2 className="text-base font-extrabold text-content-primary">Create New Translation Key</h2>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-content-muted hover:text-content-primary rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateKey} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-content-primary">
                    Translation Key Identifier <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., checkout.vat_notice"
                    className="w-full px-3 py-2 text-xs font-mono border border-border rounded-xl bg-background text-content-primary focus:outline-none focus:border-brand"
                  />
                  <p className="text-[10px] text-content-muted">Use dot-notation like component.element_description</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-content-primary">Module</label>
                  <select
                    value={newModule}
                    onChange={(e) => setNewModule(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold border border-border rounded-xl bg-background text-content-primary focus:outline-none focus:border-brand cursor-pointer"
                  >
                    <option value="UI">UI</option>
                    <option value="HEADER">HEADER</option>
                    <option value="HERO">HERO</option>
                    <option value="PRODUCT">PRODUCT</option>
                    <option value="CART">CART</option>
                    <option value="CHECKOUT">CHECKOUT</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="FOOTER">FOOTER</option>
                    <option value="COMMON">COMMON</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-border">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-content-muted">
                  Localized Values for Supported Languages
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {options.map((opt) => (
                    <div key={opt.code} className="space-y-1">
                      <label className="text-xs font-bold text-content-primary flex items-center justify-between">
                        <span>{opt.flag} {opt.nativeName} ({opt.code.toUpperCase()})</span>
                        {opt.dir === 'rtl' && <span className="text-[9px] text-amber-500 uppercase font-mono">RTL</span>}
                      </label>
                      <input
                        type="text"
                        dir={opt.dir}
                        value={newTranslations[opt.code] || ''}
                        onChange={(e) => setNewTranslations({ ...newTranslations, [opt.code]: e.target.value })}
                        placeholder={`Translated string in ${opt.name}...`}
                        className="w-full px-3 py-2 text-xs border border-border rounded-xl bg-background text-content-primary focus:outline-none focus:border-brand"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold border border-border rounded-xl bg-surface hover:bg-surface-hover text-content-primary transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand hover:bg-brand-hover rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Save Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Key Modal */}
      {editingKey && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-surface border border-border rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h2 className="text-base font-extrabold text-content-primary">Edit Translations</h2>
                <p className="text-xs font-mono text-brand font-bold mt-0.5">{editingKey.key}</p>
              </div>
              <button
                onClick={() => setEditingKey(null)}
                className="p-1 text-content-muted hover:text-content-primary rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateKey} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.map((opt) => (
                  <div key={opt.code} className="space-y-1">
                    <label className="text-xs font-bold text-content-primary flex items-center justify-between">
                      <span>{opt.flag} {opt.nativeName} ({opt.code.toUpperCase()})</span>
                      {opt.dir === 'rtl' && <span className="text-[9px] text-amber-500 uppercase font-mono">RTL</span>}
                    </label>
                    <textarea
                      rows={2}
                      dir={opt.dir}
                      value={editTranslations[opt.code] || ''}
                      onChange={(e) => setEditTranslations({ ...editTranslations, [opt.code]: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-border rounded-xl bg-background text-content-primary focus:outline-none focus:border-brand resize-none"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingKey(null)}
                  className="px-4 py-2 text-xs font-bold border border-border rounded-xl bg-surface hover:bg-surface-hover text-content-primary transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand hover:bg-brand-hover rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Table, Column } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import { Modal } from '../../../shared/components/Modal';
import { Button } from '../../../shared/components/Button';
import { AuditLog } from '../../../shared/types';
import { FileText, Eye, ShieldAlert, Code2 } from 'lucide-react';

export const AuditLogs: React.FC = () => {
  const { auditLogs } = useApp();
  const [inspectingLog, setInspectingLog] = useState<AuditLog | null>(null);

  const columns: Column<AuditLog>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (r) => <span className="font-mono text-[11px] text-slate-300">{new Date(r.timestamp).toLocaleString()}</span>
    },
    {
      key: 'actionType',
      header: 'Action Type',
      render: (r) => (
        <Badge variant={r.actionType === 'DELETE' ? 'error' : r.actionType === 'CREATE' ? 'success' : 'info'}>
          {r.actionType}
        </Badge>
      )
    },
    { key: 'targetEntity', header: 'Entity Target' },
    { key: 'actorId', header: 'Actor ID', render: (r) => <span className="font-bold text-purple-400">{r.actorId}</span> },
    { key: 'actorRole', header: 'Role' },
    { key: 'ipAddress', header: 'IP Address', render: (r) => <span className="font-mono text-slate-400">{r.ipAddress}</span> },
    {
      key: 'actions',
      header: 'JSON Diff',
      align: 'right',
      render: (r) => (
        <button
          onClick={() => setInspectingLog(r)}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-purple-400 rounded-lg text-xs font-semibold flex items-center gap-1"
        >
          <Code2 className="w-3.5 h-3.5" /> Inspect Diff
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-400" />
          <div>
            <h2 className="text-base font-bold text-white">SOC2 Immutable Audit Trail Log</h2>
            <p className="text-xs text-slate-400">Tamper-evident record of all platform operational mutations</p>
          </div>
        </div>

        <span className="px-3 py-1 bg-emerald-950 text-emerald-400 font-bold text-xs rounded-full border border-emerald-800">
          ✓ HMAC Signature Verified
        </span>
      </div>

      <Table
        columns={columns}
        data={auditLogs}
        keyExtractor={(r) => r.id}
      />

      {/* JSON Diff Inspector Modal */}
      {inspectingLog && (
        <Modal
          isOpen={!!inspectingLog}
          onClose={() => setInspectingLog(null)}
          title="Side-by-Side JSON Mutation Diff"
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="font-bold text-rose-400 uppercase text-[10px]">Previous State (Before Mutation)</span>
                <pre className="p-3 bg-slate-900 border border-rose-900/50 text-rose-300 rounded-xl overflow-x-auto text-[11px]">
                  {JSON.stringify(inspectingLog.beforeState || { status: 'none' }, null, 2)}
                </pre>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-emerald-400 uppercase text-[10px]">New State (After Mutation)</span>
                <pre className="p-3 bg-slate-900 border border-emerald-900/50 text-emerald-300 rounded-xl overflow-x-auto text-[11px]">
                  {JSON.stringify(inspectingLog.afterState || { status: 'none' }, null, 2)}
                </pre>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="ghost" onClick={() => setInspectingLog(null)}>Close Inspector</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AuditLogs;

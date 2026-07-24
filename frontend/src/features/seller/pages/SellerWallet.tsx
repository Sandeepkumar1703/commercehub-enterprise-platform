import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Table, Column } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import { Modal } from '../../../shared/components/Modal';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { MOCK_PAYOUTS } from '../../../core/auth/mockData';
import { PayoutTransaction } from '../../../shared/types';
import { Wallet, ArrowDownRight, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const SellerWallet: React.FC = () => {
  const { sellers, showToast, addAuditLog } = useApp();
  const seller = sellers[0];

  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState(4280.50);
  const [twoFactorPin, setTwoFactorPin] = useState('');
  const [loading, setLoading] = useState(false);

  const columns: Column<PayoutTransaction>[] = [
    {
      key: 'id',
      header: 'Batch ID',
      render: (r) => <span className="font-extrabold text-indigo-600 dark:text-indigo-400">#{r.id}</span>
    },
    { key: 'date', header: 'Date' },
    { key: 'bankAccount', header: 'Destination Bank' },
    {
      key: 'amount',
      header: 'Gross Amount',
      render: (r) => <span>${r.amount.toFixed(2)}</span>
    },
    {
      key: 'commissionDeduction',
      header: 'Commission Fee (15%)',
      render: (r) => <span className="text-rose-500 font-semibold">-${r.commissionDeduction.toFixed(2)}</span>
    },
    {
      key: 'netPayout',
      header: 'Net Payout',
      render: (r) => <span className="font-black text-emerald-600 dark:text-emerald-400">${r.netPayout.toFixed(2)}</span>
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge variant="success">SETTLED</Badge>
    }
  ];

  const handleWithdraw = () => {
    if (twoFactorPin.length < 4) {
      showToast('2FA PIN Required', 'Enter your 4-digit security PIN to authorize payout.', 'warning');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPayoutModalOpen(false);
      addAuditLog('UPDATE', 'Merchant Payout', seller.id, null, { amount: payoutAmount, bank: 'Chase Business Premier' });
      showToast('Payout Initiated', `Instant transfer of $${payoutAmount.toFixed(2)} sent to Chase Bank.`, 'success');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance Header Cards */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold text-indigo-300 tracking-wider">Available for Payout</span>
          <h2 className="text-4xl font-black">${seller.availableBalance.toFixed(2)}</h2>
          <Button
            size="md"
            className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold"
            onClick={() => setPayoutModalOpen(true)}
            leftIcon={<ArrowDownRight className="w-4 h-4" />}
          >
            Withdraw Funds Now
          </Button>
        </div>

        <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Pending Settlement</span>
          <h3 className="text-2xl font-extrabold text-amber-400">${seller.pendingBalance.toFixed(2)}</h3>
          <p className="text-[11px] text-slate-400">Clears in 2 business days</p>
        </div>

        <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Lifetime Net Payouts</span>
          <h3 className="text-2xl font-extrabold text-slate-100">${seller.grossRevenue.toFixed(2)}</h3>
          <p className="text-[11px] text-slate-400">Connected to Chase Premier (•••• 8829)</p>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Settlement Ledger & Historical Payouts</h3>
        <Table
          columns={columns}
          data={MOCK_PAYOUTS}
          keyExtractor={(r) => r.id}
        />
      </div>

      {/* Instant Payout Modal with 2FA */}
      {payoutModalOpen && (
        <Modal
          isOpen={payoutModalOpen}
          onClose={() => setPayoutModalOpen(false)}
          title={
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Authorize Payout Withdrawal</span>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl space-y-1">
              <p className="font-bold text-slate-900 dark:text-slate-100">Destination Account:</p>
              <p className="text-indigo-600 font-semibold flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> Chase Business Premier (•••• 8829)
              </p>
            </div>

            <Input
              label="Payout Amount ($)"
              type="number"
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(Number(e.target.value))}
            />

            <Input
              label="Security 2FA PIN / Passcode"
              type="password"
              placeholder="Enter 4-digit security PIN"
              value={twoFactorPin}
              onChange={(e) => setTwoFactorPin(e.target.value)}
            />

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setPayoutModalOpen(false)}>Cancel</Button>
              <Button variant="primary" loading={loading} onClick={handleWithdraw}>
                Confirm Withdrawal
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SellerWallet;

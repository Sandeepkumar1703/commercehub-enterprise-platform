import React from 'react';

export interface PasswordStrengthMeterProps {
  password?: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password = '' }) => {
  const hasMinLength = password.length >= 8;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const rules = [
    { label: 'At least 8 characters', met: hasMinLength },
    { label: 'Uppercase & lowercase letters', met: hasUpperLower },
    { label: 'At least one number', met: hasNumber },
    { label: 'Special character (!@#$%^&*)', met: hasSpecial }
  ];

  const score = rules.filter(r => r.met).length;

  const getMeterColor = () => {
    if (score <= 2) return 'bg-rose-500';
    if (score === 3) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getMeterText = () => {
    if (score === 0) return 'Enter a password';
    if (score <= 2) return 'Too weak';
    if (score === 3) return 'Getting stronger';
    return 'Strong password';
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      {/* Segmented bar */}
      <div className="flex items-center gap-1.5 h-1.5 w-full">
        {[1, 2, 3, 4].map(seg => (
          <div
            key={seg}
            className={`flex-1 h-full rounded-full transition-all duration-200 ${
              seg <= score ? getMeterColor() : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400 font-medium">Strength:</span>
        <span className={`font-semibold ${score <= 2 ? 'text-rose-500' : score === 3 ? 'text-amber-500' : 'text-emerald-500'}`}>
          {getMeterText()}
        </span>
      </div>

      {/* Rules list */}
      <div className="grid grid-cols-2 gap-1 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
        {rules.map((rule, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span className={rule.met ? 'text-emerald-500 font-bold' : 'text-slate-300 dark:text-slate-600'}>
              {rule.met ? '✓' : '○'}
            </span>
            <span className={rule.met ? 'text-slate-700 dark:text-slate-300 font-medium' : ''}>
              {rule.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

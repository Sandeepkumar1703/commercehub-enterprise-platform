import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Application Boundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 m-4">
          <div className="text-center max-w-md space-y-4">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Something went wrong</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              An unexpected application error occurred. You can attempt to refresh the view or return to the home page.
            </p>
            {this.state.error && (
              <pre className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono text-rose-600 text-left overflow-x-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition shadow-sm text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Application</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}


import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log('index.tsx: Booting Application...');

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Added constructor to ensure proper initialization and inheritance of props in ErrorBoundary
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-8 text-center">
          <div className="bg-[#0f1115] p-10 rounded-[2.5rem] border border-rose-500/20 glass shadow-2xl max-w-xl">
            <i className="fas fa-exclamation-triangle text-rose-500 text-5xl mb-6"></i>
            <h1 className="text-3xl font-black text-white tracking-tighter mb-4">Node Runtime Crash</h1>
            <p className="text-slate-400 font-medium mb-8 leading-relaxed">
              The application encountered a critical exception during execution. 
              This usually occurs due to missing environment variables or module resolution failures.
            </p>
            <div className="bg-black/50 p-4 rounded-xl text-left text-rose-400 text-xs mono overflow-x-auto mb-8 max-h-40">
              {this.state.error?.message || 'Unknown Error'}
              {this.state.error?.stack && <pre className="mt-2 text-[10px] opacity-50">{this.state.error.stack}</pre>}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-10 py-4 bg-emerald-500 text-slate-900 font-black uppercase text-xs tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
            >
              Restart Session
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('FATAL: Root element not found');
  throw new Error("Could not find root element to mount to");
}

try {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log('index.tsx: Render called successfully.');
} catch (err) {
  console.error('FATAL: Failed to initialize React root:', err);
}

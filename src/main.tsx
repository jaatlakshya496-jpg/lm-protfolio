import { createRoot } from 'react-dom/client';
import { Component, type ReactNode } from 'react';
import App from './App.tsx';
import './index.css';

/**
 * The `js` class enables the scroll-reveal animation (`.js .rv { opacity: 0 }`).
 * It is set by an inline script in index.html (early, to avoid a flash). We keep
 * it here too as a safety net in case the inline script is stripped.
 */
document.documentElement.classList.add('js');

/** Catches render errors and shows a friendly message instead of a blank page. */
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('App error:', error);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '48px 20px', textAlign: 'center', color: '#e8eefc' }}>
          <h1 style={{ fontSize: '24px', margin: '0 0 10px' }}>Something went wrong</h1>
          <p style={{ color: '#8fa3bf', margin: '0 0 18px' }}>
            Page load nahi ho paya. Dobara try karein.
          </p>
          <button
            className="btn primary"
            onClick={() => window.location.reload()}
            style={{ cursor: 'pointer' }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

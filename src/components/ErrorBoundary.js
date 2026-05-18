import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Send to Sentry in production
    if (window.Sentry) {
      window.Sentry.captureException(error, { extra: errorInfo });
    }
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const isModal = this.props.isModal;

    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: isModal ? '40px 32px' : '80px 24px',
        minHeight: isModal ? 'auto' : '100vh',
        background: isModal ? 'white' : '#f0faf4',
        fontFamily: "'DM Sans', system-ui",
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🌾</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#0f1f13', marginBottom: 8, fontFamily: "'Syne', system-ui" }}>
          Something went wrong
        </div>
        <p style={{ fontSize: 14, color: '#7a8f7e', maxWidth: 360, lineHeight: 1.7, marginBottom: 28 }}>
          {isModal
            ? 'This feature ran into an issue. Please close and try again.'
            : "AgriBridge ran into an unexpected error. Your farm data is safe — please refresh the page."}
        </p>

        {process.env.NODE_ENV === 'development' && this.state.error && (
          <details style={{ background: '#fef2f2', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, maxWidth: 480, textAlign: 'left' }}>
            <summary style={{ fontSize: 12, fontWeight: 700, color: '#dc2626', cursor: 'pointer', marginBottom: 8 }}>
              Dev error details
            </summary>
            <pre style={{ fontSize: 11, color: '#b91c1c', overflow: 'auto', maxHeight: 200, margin: 0 }}>
              {this.state.error.toString()}
              {'\n'}
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
        )}

        <div style={{ display: 'flex', gap: 10 }}>
          {isModal ? (
            <button onClick={this.props.onClose || (() => this.setState({ hasError: false }))} style={{ padding: '12px 24px', background: '#166534', color: 'white', border: 'none', borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
              Close
            </button>
          ) : (
            <>
              <button onClick={() => window.location.reload()} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white', border: 'none', borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 20px rgba(34,197,94,0.3)' }}>
                Refresh Page
              </button>
              <button onClick={() => this.setState({ hasError: false, error: null })} style={{ padding: '12px 24px', background: 'white', color: '#166534', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;

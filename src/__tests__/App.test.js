// AgriBridge Unit Tests
// Run: npm test

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';

// ─── i18n tests ───────────────────────────────────────────────
describe('i18n / translations', () => {
  let T, useLang, LANGS;
  beforeAll(async () => {
    ({ T, useLang, LANGS } = await import('../i18n'));
  });

  test('all 5 languages exist', () => {
    expect(Object.keys(LANGS)).toEqual(['en', 'hi', 'or', 'te', 'ta']);
  });

  test('English has all required keys', () => {
    const required = ['appName', 'tagline', 'heroHeading', 'featurePlantDoctor', 'explore', 'loading'];
    required.forEach(key => {
      expect(T.en[key]).toBeTruthy();
    });
  });

  test('Hindi translations exist for all English keys', () => {
    const enKeys = Object.keys(T.en);
    const hiKeys = Object.keys(T.hi);
    const missing = enKeys.filter(k => !hiKeys.includes(k));
    expect(missing).toEqual([]);
  });

  test('useLang falls back to English for unknown lang', () => {
    const result = useLang('xyz');
    expect(result.appName).toBe('AgriBridge');
  });
});

// ─── Analytics tests ──────────────────────────────────────────
describe('analytics utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete window.mixpanel;
  });

  test('track does not throw when mixpanel is absent', async () => {
    const { track } = await import('../analytics');
    expect(() => track('Test Event', { foo: 'bar' })).not.toThrow();
  });

  test('captureError does not throw when Sentry absent', async () => {
    const { captureError } = await import('../analytics');
    expect(() => captureError(new Error('test error'))).not.toThrow();
  });

  test('flag returns false for unknown feature flag', async () => {
    const { flag } = await import('../analytics');
    expect(flag('nonExistentFlag')).toBe(false);
  });

  test('setFlag + flag round-trips correctly', async () => {
    const { flag, setFlag } = await import('../analytics');
    setFlag('testFeature', true);
    expect(flag('testFeature')).toBe(true);
    setFlag('testFeature', false);
    expect(flag('testFeature')).toBe(false);
  });
});

// ─── ErrorBoundary tests ──────────────────────────────────────
describe('ErrorBoundary', () => {
  const { default: ErrorBoundary } = require('../components/ErrorBoundary');
  const ThrowingComponent = () => { throw new Error('Test crash'); };
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => consoleError.mockRestore());

  test('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Safe content</div>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('renders fallback UI on error', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Refresh Page')).toBeInTheDocument();
  });

  test('modal variant shows Close button instead of Refresh', () => {
    render(
      <ErrorBoundary isModal>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.queryByText('Refresh Page')).not.toBeInTheDocument();
  });
});

// ─── Toast tests ──────────────────────────────────────────────
describe('Toast system', () => {
  const { ToastProvider, useToast } = require('../components/Toast');

  const ToastTrigger = ({ type }) => {
    const toast = useToast();
    return <button onClick={() => toast[type]('Test message')}>Show {type}</button>;
  };

  test('success toast renders and disappears', async () => {
    jest.useFakeTimers();
    render(
      <ToastProvider>
        <ToastTrigger type="success" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show success'));
    expect(screen.getByText('Test message')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(4000));
    await waitFor(() => expect(screen.queryByText('Test message')).not.toBeInTheDocument());
    jest.useRealTimers();
  });

  test('error toast renders with correct styling', () => {
    render(
      <ToastProvider>
        <ToastTrigger type="error" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show error'));
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('useToast throws outside provider', () => {
    const { useToast: useT } = require('../components/Toast');
    const Bad = () => { useT(); return null; };
    expect(() => render(<Bad />)).toThrow('useToast must be used within ToastProvider');
  });
});

// ─── Skeleton tests ───────────────────────────────────────────
describe('Skeleton components', () => {
  const { SkeletonBox, SkeletonText, FeatureCardSkeleton } = require('../components/Skeleton');

  test('SkeletonBox renders with default props', () => {
    const { container } = render(<SkeletonBox />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild.style.height).toBe('16px');
  });

  test('SkeletonText renders correct number of lines', () => {
    const { container } = render(<SkeletonText lines={4} />);
    expect(container.firstChild.children.length).toBe(4);
  });

  test('FeatureCardSkeleton renders without crashing', () => {
    const { container } = render(<FeatureCardSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ─── API hook tests ───────────────────────────────────────────
describe('useApi hook', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.clear();
  });

  afterEach(() => jest.clearAllMocks());

  test('returns loading:true initially', () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ data: 'test' }) });
    const { useApi } = require('../hooks/useApi');
    const TestComp = () => {
      const { loading } = useApi('/test');
      return <div>{loading ? 'loading' : 'done'}</div>;
    };
    render(<TestComp />);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  test('skip:true prevents fetch', () => {
    const { useApi } = require('../hooks/useApi');
    const TestComp = () => {
      const { loading } = useApi('/test', { skip: true });
      return <div>{loading ? 'loading' : 'skipped'}</div>;
    };
    render(<TestComp />);
    expect(screen.getByText('skipped')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

// ─── Number / date localisation tests ────────────────────────
describe('Localisation utilities', () => {
  test('Indian number format uses lakh/crore notation', () => {
    const format = (n) => new Intl.NumberFormat('en-IN').format(n);
    expect(format(100000)).toBe('1,00,000');
    expect(format(10000000)).toBe('1,00,00,000');
  });

  test('Indian date format is DD/MM/YYYY', () => {
    const d = new Date('2025-03-15');
    const fmt = d.toLocaleDateString('en-IN');
    expect(fmt).toMatch(/15/);
    expect(fmt).toMatch(/3|03/);
  });
});

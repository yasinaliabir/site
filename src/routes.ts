import { lazy } from 'react';

const loaders = {
  apps: () => import('./pages/AppsPage'),
  appDetail: () => import('./pages/AppDetailPage'),
  works: () => import('./pages/WorksPage'),
  workDetail: () => import('./pages/WorkDetailPage'),
  course: () => import('./pages/CoursePage'),
  social: () => import('./pages/SocialPage'),
  contact: () => import('./pages/ContactPage'),
  payment: () => import('./pages/PaymentPage'),
  reviews: () => import('./pages/ReviewsPage'),
};

export const AppsPage = lazy(loaders.apps);
export const AppDetailPage = lazy(loaders.appDetail);
export const WorksPage = lazy(loaders.works);
export const WorkDetailPage = lazy(loaders.workDetail);
export const CoursePage = lazy(loaders.course);
export const SocialPage = lazy(loaders.social);
export const ContactPage = lazy(loaders.contact);
export const PaymentPage = lazy(loaders.payment);
export const ReviewsPage = lazy(loaders.reviews);

const prefetched = new Set<string>();

function resolveLoaderKey(path: string): keyof typeof loaders | null {
  if (path === '/works') return 'works';
  if (path.startsWith('/works/')) return 'workDetail';
  if (path.startsWith('/course')) return 'course';
  if (path.startsWith('/contact')) return 'contact';
  if (path.startsWith('/payment')) return 'payment';
  if (path === '/apps') return 'apps';
  if (path.startsWith('/apps/')) return 'appDetail';
  if (path.startsWith('/reviews')) return 'reviews';
  if (path.startsWith('/social')) return 'social';
  return null;
}

export function prefetchRoute(path: string) {
  const key = resolveLoaderKey(path);
  if (!key || prefetched.has(key)) return;
  prefetched.add(key);
  void loaders[key]();
}

export function scheduleIdleRoutePrefetch() {
  if (typeof window === 'undefined') return () => {};
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (connection?.saveData || connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') {
    return () => {};
  }

  const run = () => {
    prefetchRoute('/works');
    prefetchRoute('/course');
    prefetchRoute('/contact');
    prefetchRoute('/apps');
  };

  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(run, { timeout: 2200 });
    return () => window.cancelIdleCallback(id);
  }
  const timer = globalThis.setTimeout(run, 1400);
  return () => globalThis.clearTimeout(timer);
}

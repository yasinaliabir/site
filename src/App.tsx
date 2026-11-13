import { BriefcaseBusiness, GraduationCap, House, Mail } from 'lucide-react';
import { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { prefetchProps } from './components/Shared';
import HomePage from './pages/HomePage';
import {
  AppDetailPage, AppsPage, ContactPage, CoursePage, PaymentPage, ReviewsPage, SocialPage, WorkDetailPage, WorksPage,
  scheduleIdleRoutePrefetch,
} from './routes';
import { useContentProtection } from './useContentProtection';

function Dock() {
  const location = useLocation();
  const path = location.pathname;
  const items = [
    { id: 'home', label: 'Home', href: '/', icon: House, active: path === '/' },
    { id: 'works', label: 'Works', href: '/works', icon: BriefcaseBusiness, active: path.startsWith('/works') },
    { id: 'course', label: 'Course', href: '/course', icon: GraduationCap, active: path.startsWith('/course') },
    { id: 'contact', label: 'Contact', href: '/contact', icon: Mail, active: path.startsWith('/contact') || path.startsWith('/payment') },
  ];
  return (
    <nav className="floating-dock" aria-label="Main navigation">
      {items.map(({ id, label, href, icon: Icon, active }) => (
        <Link
          key={id}
          to={href}
          className={`dock-item ${active ? 'is-active' : ''}`}
          aria-current={active ? 'page' : undefined}
          {...prefetchProps(href)}
        >
          <span className="dock-icon"><Icon size={18} strokeWidth={1.9} aria-hidden="true" /></span>
          <span className="dock-label">{label}</span>
        </Link>
      ))}
    </nav>
  );
}

const scrollPositions = new Map<string, number>();

function RouteFallback() {
  return <main className="page inner-page route-fallback" aria-busy="true" />;
}

function PageRouter() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevKeyRef = useRef<string>(location.key);

  useLayoutEffect(() => {
    scrollPositions.set(prevKeyRef.current, window.scrollY);
    prevKeyRef.current = location.key;

    if (navigationType === 'POP') {
      const saved = scrollPositions.get(location.key) ?? 0;
      window.scrollTo({ top: saved, behavior: 'instant' as ScrollBehavior });
      const raf = window.requestAnimationFrame(() => {
        window.scrollTo({ top: saved, behavior: 'instant' as ScrollBehavior });
      });
      return () => window.cancelAnimationFrame(raf);
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    return undefined;
  }, [location.key, location.pathname, navigationType]);

  return (
    <div className="route-stage">
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/apps/:slug" element={<AppDetailPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/works/:slug" element={<WorkDetailPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default function App() {
  useContentProtection();

  useEffect(() => scheduleIdleRoutePrefetch(), []);

  return (
    <div className="site-shell">
      <div className="ambient ambient-top" />
      <div className="ambient ambient-bottom" />
      <PageRouter />
      <Dock />
    </div>
  );
}

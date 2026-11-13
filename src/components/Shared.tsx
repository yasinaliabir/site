import { useEffect, useRef, useState } from 'react';
import type { AnchorHTMLAttributes, ReactNode, RefObject } from 'react';
import { socialCards } from '../data/home';
import { prefetchRoute } from '../routes';

export function ExternalLink({ href, children, className = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={href} target="_blank" rel="noreferrer noopener" className={className} {...props}>{children}</a>;
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  id,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window);
  });

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -16px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      id={id}
      className={`reveal-block ${visible ? 'reveal-visible' : ''} ${className}`}
      style={delay > 0 ? { transitionDelay: `${Math.round(delay * 1000)}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false));

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return matches;
}

export function useInViewAnimation(ref: RefObject<HTMLElement | null>): boolean {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) return;

    let isIntersecting = true;
    const sync = () => setActive(isIntersecting && !document.hidden);

    const observer = new IntersectionObserver(
      (entries) => {
        isIntersecting = Boolean(entries[0]?.isIntersecting);
        sync();
      },
      { rootMargin: '120px 0px' },
    );
    observer.observe(node);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [ref]);

  return active;
}

export function prefetchProps(path: string) {
  return {
    onMouseEnter: () => prefetchRoute(path),
    onFocus: () => prefetchRoute(path),
    onTouchStart: () => prefetchRoute(path),
  };
}

export function SectionHeading({ title, detail }: { title: string; detail?: string }) {
  return <div className="section-heading"><div><h2>{title}</h2>{detail && <p>{detail}</p>}</div></div>;
}

export function PageIntro({ kicker, title, text }: { kicker?: string; title: string; text?: string }) {
  return <Reveal className={`page-intro ${kicker ? 'has-kicker' : 'no-kicker'}`}>{kicker && <span className="eyebrow"><span className="eyebrow-mark" />{kicker}</span>}<h1>{title}</h1>{text && <p>{text}</p>}</Reveal>;
}

export function ComingSoon({ label = 'Coming Soon' }: { label?: string }) {
  return <span className="coming-soon" aria-disabled="true"><span className="soon-dot" />{label}</span>;
}

export function SocialIcon({ social, eager = false }: { social: (typeof socialCards)[number]; eager?: boolean }) {
  const icon = <img src={social.icon} alt="" width={72} height={72} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
  if (!social.url) return <span className="social-icon-control is-unconfigured" role="img" aria-label={`${social.name} profile link not configured`} title={`${social.name} link not configured`}>{icon}</span>;
  return <ExternalLink href={social.url} className="social-icon-control" aria-label={`Open ${social.name} profile`} title={social.name}>{icon}</ExternalLink>;
}

export function SocialIconRow({ className = '', eager = false }: { className?: string; eager?: boolean }) {
  return <nav className={`social-icon-row ${className}`} aria-label="Social profiles">{socialCards.map((social) => <SocialIcon key={social.id} social={social} eager={eager} />)}</nav>;
}

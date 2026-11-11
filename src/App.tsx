import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import {
  ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness,
  BadgeCheck, Check, ChevronLeft, ChevronRight, Copy, GraduationCap, Heart, HelpCircle, House, Info, Laptop, Mail, Monitor, PanelsTopLeft, Play, ShoppingBag, Smartphone, Star, TriangleAlert, X,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { apps, clientPortraits, clientReviews, courseHighlights, courses, gallery, paymentDetails, profile, socialCards, works } from './data';
import { portfolioProjects } from './portfolioProjects';
import { useContentProtection } from './useContentProtection';

const easing = [0.22, 1, 0.36, 1] as const;
function ExternalLink({ href, children, className = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={href} target="_blank" rel="noreferrer noopener" className={className} {...props}>{children}</a>;
}

function Reveal({ children, delay = 0, className = '', id }: { children: ReactNode; delay?: number; className?: string; id?: string }) {
  return <motion.div className={className} id={id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, delay, ease: easing }}>{children}</motion.div>;
}

function Dock() {
  const location = useLocation();
  const path = location.pathname;
  const items = [
    { id: 'home', label: 'Home', href: '/', icon: House, active: path === '/' },
    { id: 'works', label: 'Works', href: '/works', icon: BriefcaseBusiness, active: path.startsWith('/works') },
    { id: 'course', label: 'Course', href: '/course', icon: GraduationCap, active: path.startsWith('/course') },
    { id: 'contact', label: 'Contact', href: '/contact', icon: Mail, active: path.startsWith('/contact') || path.startsWith('/payment') },
  ];
  return <nav className="floating-dock" aria-label="Main navigation">
    {items.map(({ id, label, href, icon: Icon, active }) => <Link key={id} to={href} className={`dock-item ${active ? 'is-active' : ''}`} aria-current={active ? 'page' : undefined}>
      <span className="dock-icon"><Icon size={18} strokeWidth={1.9} aria-hidden="true" /></span><span className="dock-label">{label}</span>
    </Link>)}
  </nav>;
}

function SectionHeading({ title, detail }: { title: string; detail?: string }) {
  return <div className="section-heading"><div><h2>{title}</h2>{detail && <p>{detail}</p>}</div></div>;
}

function ClientRating() {
  return <div className="hero-badges">
    <span className="rated-pill"><span className="rated-label">Rated by</span><span className="client-stack">
      {clientPortraits.map((client, index) => <span className={`client-avatar client-avatar-${index + 1}`} key={client.id} title={client.src ? 'Client portrait' : 'Replace with client photo'} aria-label={client.src ? 'Client portrait' : `Client photo placeholder ${index + 1}`}>
        {client.src ? <img src={client.src} alt="Client portrait" /> : <span>{client.placeholder}</span>}
      </span>)}
    </span></span>
    <Link to="/reviews" target="_blank" rel="noopener noreferrer" className="view-reviews-button">View Reviews<ArrowUpRight size={14} aria-hidden="true" /></Link>
  </div>;
}

function AppListRow({ item, index = 0 }: { item: typeof apps[number]; index?: number }) {
  return <motion.div className="app-list-cell" initial={{ opacity: 0, y: 9 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.42, delay: index * 0.045, ease: easing }}>
    <Link to={`/apps/${item.slug}`} className={`app-list-row app-${item.accent}`} aria-label={`View ${item.name}`}>
      <span className="app-list-icon"><img src={item.icon} alt="" loading="lazy" /></span>
      <span className="app-list-copy"><strong>{item.name}</strong><span>{item.shortPlatform}</span></span>
      <span className="app-list-action">View<ArrowRight size={14} aria-hidden="true" /></span>
    </Link>
  </motion.div>;
}

function AppsPreview() {
  return <Reveal className="home-section apps-preview-section">
    <div className="section-heading section-heading-action">
      <div><h2>My Apps &amp; Extensions</h2></div>
      <Link className="see-all-button" to="/apps">See All<ArrowRight size={15} /></Link>
    </div>
    <div className="apps-list-grid" aria-label="Apps and extensions">{apps.map((item, index) => <AppListRow item={item} key={item.slug} index={index} />)}</div>
  </Reveal>;
}

function SocialIcon({ social }: { social: typeof socialCards[number] }) {
  const icon = <img src={social.icon} alt="" loading="lazy" />;
  if (!social.url) return <span className="social-icon-control is-unconfigured" role="img" aria-label={`${social.name} profile link not configured`} title={`${social.name} link not configured`}>{icon}</span>;
  return <ExternalLink href={social.url} className="social-icon-control" aria-label={`Open ${social.name} profile`} title={social.name}>{icon}</ExternalLink>;
}

function SocialIconRow({ className = '' }: { className?: string }) {
  return <nav className={`social-icon-row ${className}`} aria-label="Social profiles">{socialCards.map((social) => <SocialIcon key={social.id} social={social} />)}</nav>;
}

function GalleryMarquee({ title, type, reverse = false }: { title: string; type: 'portrait' | 'logo'; reverse?: boolean }) {
  const items = gallery.filter((item) => item.type === type);
  const loop = [...items, ...items];
  return <Reveal className={`home-section gallery-section ${type === 'portrait' ? 'creator-section' : 'brand-section'}`}>
    <SectionHeading title={title} />
    <div className="gallery-mask" role="group" aria-label={`${title} image gallery`} tabIndex={0}>
      <div className={`gallery-track ${reverse ? 'gallery-track-reverse' : ''}`} aria-hidden="true">{loop.map((item, index) => <div className={`gallery-item ${type === 'logo' ? 'gallery-logo' : 'gallery-portrait'}`} key={`${item.src}-${index}`}>
        <img src={item.src} alt="" loading={index < items.length ? 'eager' : 'lazy'} />
      </div>)}</div>
    </div>
  </Reveal>;
}

function DesktopHero() {
  return <div className="desktop-hero-grid">
    <Reveal className="desktop-hero-portrait-reveal">
      <article className="desktop-profile-card soft-card">
        <div className="desktop-profile-photo"><picture>
          {profile.mobilePortrait && <source media="(max-width: 900px)" srcSet={profile.mobilePortrait} />}
          <img src={profile.portrait} alt="Yasin Ali Abir" fetchPriority="high" />
        </picture></div>
        <div className="desktop-profile-copy"><h2>{profile.displayName}</h2><p>{profile.displayTitle}</p></div>
      </article>
    </Reveal>
    <Reveal className="desktop-hero-intro-reveal" delay={0.08}>
      <article className="desktop-intro-card soft-card">
        <div className="desktop-intro-copy">
          <ClientRating />
          <h1 className="desktop-intro-heading">
            <span>Hi, I'm {profile.displayName}</span>
            <span>I'm a <em>Creative Director</em></span>
            <span>&amp; Designer</span>
          </h1>
          <p>{profile.bio}</p>
        </div>
        <SocialIconRow className="desktop-hero-social-row" />
        <div className="desktop-proof-row" aria-label="Professional experience">
          {profile.stats.map((stat) => <div className="desktop-proof-stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
        </div>
      </article>
    </Reveal>
  </div>;
}

function HomePage() {
  return <main className="page home-page">
    <DesktopHero />
    <AppsPreview />
    <GalleryMarquee title="Creators Worked With" type="portrait" />
    <GalleryMarquee title="Brands Worked With" type="logo" reverse />
  </main>;
}

function PageIntro({ kicker, title, text }: { kicker?: string; title: string; text?: string }) {
  return <Reveal className={`page-intro ${kicker ? 'has-kicker' : 'no-kicker'}`}>{kicker && <span className="eyebrow"><span className="eyebrow-mark" />{kicker}</span>}<h1>{title}</h1>{text && <p>{text}</p>}</Reveal>;
}

function ComingSoon({ label = 'Coming Soon' }: { label?: string }) {
  return <span className="coming-soon" aria-disabled="true"><span className="soon-dot" />{label}</span>;
}

function DownloadPlatformIcon({ platform }: { platform: string }) {
  if (platform === 'Mac') return <Laptop size={18} aria-hidden="true" />;
  if (platform === 'Windows') return <Monitor size={18} aria-hidden="true" />;
  return <Smartphone size={18} aria-hidden="true" />;
}

function AppsPage() {
  return <main className="page inner-page apps-page">
    <PageIntro title="My Apps & Extensions" text="A small collection of tools built around creative work." />
    <div className="apps-detail-grid">
      {apps.map((item, index) => <Reveal className={`app-detail-card soft-card app-detail-${item.accent}`} key={item.slug} delay={index * 0.045}>
        <Link to={`/apps/${item.slug}`} className="app-detail-preview" aria-label={`Preview ${item.name}`}>
          <span className="preview-orbit preview-orbit-one" /><span className="preview-orbit preview-orbit-two" />
          <img src={item.icon} alt={`${item.name} preview artwork`} loading="lazy" />
          <span className="preview-open"><ArrowUpRight size={17} /></span>
        </Link>
        <div className="app-detail-info">
          <div className="app-detail-head"><div><span className="app-platform-label">{item.platform}</span><h2>{item.name}</h2></div><Link className="round-arrow" to={`/apps/${item.slug}`} aria-label={`Details for ${item.name}`}><ArrowUpRight size={17} /></Link></div>
          <p>{item.description}</p>
          <div className="app-detail-bottom"><span className="platform-dot"><PanelsTopLeft size={14} />{item.shortPlatform}</span>
            {item.downloads.length ? <Link to={`/apps/${item.slug}`} className="download-button"><ArrowDownToLine size={15} />Downloads</Link> : item.downloadUrl ? <ExternalLink href={item.downloadUrl} className="download-button"><ArrowDownToLine size={15} />Download</ExternalLink> : <ComingSoon />}
          </div>
        </div>
      </Reveal>)}
    </div>
    <div className="page-back-link"><Link to="/"><ArrowLeft size={15} />Back home</Link></div>
  </main>;
}

function ExtensionInstallModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="install-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="install-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: easing }}
          onClick={onClose}
        >
          <motion.div
            className="install-modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.26, ease: easing }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="install-modal-close"
              onClick={onClose}
              aria-label="Close instructions"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="install-modal-scroll">
              <header className="install-modal-header">
                <span className="install-modal-badge">
                  <PanelsTopLeft size={13} aria-hidden="true" />
                  <span>Extension Guide</span>
                </span>
                <h1 id="install-modal-title">Install and Manage Extensions</h1>
                <p className="install-modal-intro">
                  You can customize Chrome on your desktop by adding extensions from the Chrome Web Store.
                </p>
              </header>

              <section className="install-modal-section">
                <h2>Install an Extension</h2>

                <div className="install-callout install-callout-warning">
                  <div className="install-callout-icon">
                    <Info size={16} aria-hidden="true" />
                  </div>
                  <p>
                    <strong>Important:</strong> You can't add extensions when you browse in Incognito mode or as a guest.
                  </p>
                </div>

                <ol className="install-steps-list">
                  <li>
                    <span className="install-step-num">1</span>
                    <div className="install-step-body">
                      <span>
                        Open the{' '}
                        <ExternalLink
                          href="https://chrome.google.com/webstore"
                          className="install-inline-link"
                        >
                          Chrome Web Store
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </ExternalLink>
                        .
                      </span>
                    </div>
                  </li>
                  <li>
                    <span className="install-step-num">2</span>
                    <div className="install-step-body">
                      <span>Find and select the extension you want.</span>
                    </div>
                  </li>
                  <li>
                    <span className="install-step-num">3</span>
                    <div className="install-step-body">
                      <span>
                        Select <strong>Add to Chrome</strong>.
                      </span>
                    </div>
                  </li>
                  <li>
                    <span className="install-step-num">4</span>
                    <div className="install-step-body">
                      <span>
                        Some extensions will let you know if they need certain permissions or data. To approve, select <strong>Add extension</strong>.
                      </span>
                      <div className="install-sub-note">
                        <span className="install-sub-bullet" />
                        <span>
                          <strong>Important:</strong> Make sure you only approve extensions that you trust.
                        </span>
                      </div>
                    </div>
                  </li>
                </ol>

                <div className="install-tip-card">
                  <p>
                    To use the extension, select the icon to the right of the address bar.
                  </p>
                </div>

                <div className="install-callout install-callout-org">
                  <p>
                    <strong>If you're using a computer through your work or school,</strong> your organization might block some extensions.
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AppDetailPage() {
  const { slug } = useParams();
  const item = apps.find((app) => app.slug === slug);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  useEffect(() => {
    if (!selectedScreenshot) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setSelectedScreenshot(null);
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [selectedScreenshot]);
  if (!item) return <Navigate to="/apps" replace />;

  const isExtension = item.slug === 'thumbnailkit' || item.slug === 'behancekit';

  return <main className="page inner-page app-single-page">
    <div className={`app-single-card soft-card app-detail-${item.accent}`}>
      <Link className="back-control" to="/apps"><ArrowLeft size={16} />All Apps</Link>
      <div className="app-single-visual"><span className="single-glow" /><img src={item.icon} alt={`${item.name} product artwork`} /></div>
      <Reveal className="app-single-copy"><span className="app-platform-label">{item.platform}</span><h1>{item.name}</h1><p>{item.description}</p>
        <div className="single-meta">{item.downloads.length ? <div className="download-panel"><div className="download-panel-heading"><div><span>GET THE APP</span><strong>Choose your platform</strong></div><span className="download-available"><Check size={12} />Available now</span></div><div className="download-options">{item.downloads.map((download) => <ExternalLink key={download.shortLabel} href={download.url} className="platform-download-card" aria-label={download.label}><span className="platform-download-icon"><DownloadPlatformIcon platform={download.shortLabel} /></span><span className="platform-download-copy"><small>Download for</small><strong>{download.shortLabel}</strong></span><ArrowDownToLine className="platform-download-arrow" size={16} /></ExternalLink>)}<div className="platform-download-card platform-download-soon" aria-label="App Store coming soon"><span className="platform-download-icon"><ShoppingBag size={18} aria-hidden="true" /></span><span className="platform-download-copy"><small>Coming soon on</small><strong>App Store</strong></span><span className="soon-badge">SOON</span></div></div></div> : <div className="single-download-fallback"><span className="platform-dot"><PanelsTopLeft size={14} />{item.shortPlatform}</span><div className="single-download-actions">{item.downloadUrl ? <ExternalLink href={item.downloadUrl} className="download-button"><ArrowDownToLine size={15} />Download</ExternalLink> : <ComingSoon />}{isExtension && <button type="button" className="how-to-install-button" onClick={() => setInstallModalOpen(true)} aria-label={`How to install ${item.name}`}><HelpCircle size={15} aria-hidden="true" /><span>How to Install</span></button>}</div></div>}</div>
      </Reveal>
    </div>
    <section className="app-screenshot-section" aria-labelledby="app-screenshot-title">
      <div className="app-screenshot-heading"><div><span className="app-screenshot-eyebrow">APP INTERFACE</span><h2 id="app-screenshot-title">Interface Preview</h2></div><span className="app-screenshot-count">3 screenshots</span></div>
      <div className="app-screenshot-grid">
        {[0, 1, 2].map((index) => {
          const screenshot = item.screenshots[index];
          return <figure className="app-screenshot-frame" key={`${item.slug}-screenshot-${index}`}>
            {screenshot ? <button className="app-screenshot-open" type="button" onClick={() => setSelectedScreenshot(screenshot)} aria-label={`View ${item.name} interface screenshot ${index + 1} full size`}><img src={screenshot} alt={`${item.name} interface screenshot ${index + 1}`} loading="lazy" /><span>View full image</span></button> : <div className="app-screenshot-placeholder"><span className="app-screenshot-placeholder-icon"><PanelsTopLeft size={18} aria-hidden="true" /></span><strong>Add screenshot 0{index + 1}</strong><span>Ready for your image</span></div>}
          </figure>;
        })}
      </div>
    </section>
    <AnimatePresence>
      {selectedScreenshot && <motion.div className="app-screenshot-lightbox" role="dialog" aria-modal="true" aria-label={`${item.name} interface preview`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedScreenshot(null)}>
        <motion.div className="app-screenshot-lightbox-panel" initial={{ opacity: 0, scale: .96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .97, y: 8 }} transition={{ duration: .24, ease: easing }} onClick={(event) => event.stopPropagation()}>
          <button className="app-screenshot-close" type="button" onClick={() => setSelectedScreenshot(null)} aria-label="Close full image"><X size={19} /></button>
          <div className="app-screenshot-lightbox-image"><img src={selectedScreenshot} alt={`${item.name} full interface preview`} /></div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
    <ExtensionInstallModal open={installModalOpen} onClose={() => setInstallModalOpen(false)} />
  </main>;
}

function SocialPage() {
  return <main className="page inner-page social-page">
    <PageIntro kicker="CONNECT & FOLLOW" title="Connect With Me" />
    <SocialIconRow />
    <div className="page-back-link"><Link to="/"><ArrowLeft size={15} />Back home</Link></div>
  </main>;
}

type WorkCategory = 'Thumbnails' | 'Sports' | 'Social Media';
type PortfolioProject = (typeof portfolioProjects)[number];
const portfolioCategories: WorkCategory[] = ['Thumbnails', 'Sports', 'Social Media'];

const mixedPortfolioProjects: PortfolioProject[] = (() => {
  const groups = portfolioCategories.map((category) => portfolioProjects.filter((project) => project.category === category));
  const largestGroup = Math.max(...groups.map((group) => group.length));
  return Array.from({ length: largestGroup }, (_, index) => groups.flatMap((group) => group[index] ? [group[index]] : [])).flat();
})();

function distributePortfolioProjects(columnCount: number) {
  const columns = Array.from({ length: columnCount }, () => ({ projects: [] as PortfolioProject[], height: 0 }));
  mixedPortfolioProjects.forEach((project) => {
    const shortestColumn = columns.reduce((shortest, column, index) => column.height < columns[shortest].height ? index : shortest, 0);
    columns[shortestColumn].projects.push(project);
    columns[shortestColumn].height += project.aspectRatio === 'portrait' ? 2 : 1;
  });
  return columns.map((column) => column.projects);
}

function PortfolioMasonry({ onSelect }: { onSelect: (project: PortfolioProject) => void }) {
  const layouts = [
    { className: 'works-masonry-desktop', columns: 5 },
    { className: 'works-masonry-tablet', columns: 3 },
    { className: 'works-masonry-mobile', columns: 2 },
  ];
  return <div className="works-masonry-frame">
    {layouts.map((layout) => <div className={`works-masonry ${layout.className}`} key={layout.className}>
      {distributePortfolioProjects(layout.columns).map((projects, columnIndex) => <div className="works-masonry-column" key={`${layout.className}-${columnIndex}`}>
        <div className={`works-masonry-track ${columnIndex % 2 ? 'works-masonry-track-down' : 'works-masonry-track-up'}`} style={{ animationDuration: `${54 + columnIndex * 5}s`, animationDelay: `${-columnIndex * 3}s` }}>
          {[0, 1].map((copy) => <div className="works-masonry-list" key={copy} aria-hidden={copy === 1 || undefined}>
            {projects.map((project) => <button className={`works-masonry-art works-masonry-art-${project.aspectRatio}`} type="button" key={`${project.id}-${copy}`} aria-label={copy === 1 ? undefined : `Preview ${project.title}`} tabIndex={copy === 1 ? -1 : 0} onClick={() => onSelect(project)}>
              <img src={project.imageUrl} alt={copy === 1 ? '' : project.title} loading="lazy" referrerPolicy="no-referrer" draggable={false} />
            </button>)}
          </div>)}
        </div>
      </div>)}
    </div>)}
  </div>;
}

function PortfolioProjectModal({
  project,
  onClose,
  onChange,
}: {
  project: PortfolioProject | null;
  onClose: () => void;
  onChange: (direction: -1 | 1) => void;
}) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onChange(-1);
      if (event.key === 'ArrowRight') onChange(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, onChange]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    const deltaY = event.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        onChange(1);
      } else {
        onChange(-1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return <AnimatePresence>
    {project && <motion.div
      className="works-viewer-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Design Preview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        className="works-viewer-close"
        type="button"
        aria-label="Close preview"
        onClick={(event) => { event.stopPropagation(); onClose(); }}
      >
        <X size={20} />
      </button>

      <button
        className="works-viewer-arrow works-viewer-prev"
        type="button"
        aria-label="Previous design"
        onClick={(event) => { event.stopPropagation(); onChange(-1); }}
      >
        <ChevronLeft size={24} />
      </button>

      <motion.div
        className="works-viewer-content"
        key={project.id}
        initial={{ opacity: 0, scale: .97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: .98, y: -5 }}
        transition={{ duration: .24, ease: easing }}
        onClick={(event) => event.stopPropagation()}
      >
        <figure className="works-viewer-art">
          <img src={project.imageUrl} alt={project.title} referrerPolicy="no-referrer" draggable={false} />
        </figure>
      </motion.div>

      <button
        className="works-viewer-arrow works-viewer-next"
        type="button"
        aria-label="Next design"
        onClick={(event) => { event.stopPropagation(); onChange(1); }}
      >
        <ChevronRight size={24} />
      </button>
    </motion.div>}
  </AnimatePresence>;
}

function WorksPage() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  const changeProject = useCallback((direction: -1 | 1) => {
    setSelectedProject((current) => {
      if (!current) return current;
      const currentIndex = portfolioProjects.findIndex((project) => project.id === current.id);
      return portfolioProjects[(currentIndex + direction + portfolioProjects.length) % portfolioProjects.length];
    });
  }, []);

  return <main className="page inner-page works-page">
    <header className="works-showcase-header">
      <h1>Selected Design Work</h1>
      <p>High-performing visuals built for max audience reach, CTR, and viral conversion.</p>
    </header>
    <PortfolioMasonry onSelect={setSelectedProject} />
    <PortfolioProjectModal project={selectedProject} onClose={closeProject} onChange={changeProject} />
  </main>;
}

function WorkDetailPage() {
  const { slug } = useParams();
  const work = works.find((item) => item.slug === slug);
  if (!work) return <Navigate to="/works" replace />;
  return <main className="page inner-page work-single-page">
    <div className="work-single-top"><Link className="back-control" to="/works"><ArrowLeft size={16} />All Works</Link><span className="app-platform-label">{work.category}</span></div>
    <Reveal className="work-single-card soft-card"><div className="work-single-image"><img src={work.image} alt={work.title} /></div>
      <div className="work-single-copy"><h1>{work.title}</h1><p>Selected work by Yasin Ali Abir.</p><ExternalLink className="download-button" href={work.href}>View project on Behance<ArrowUpRight size={15} /></ExternalLink></div>
    </Reveal>
  </main>;
}

type CourseVideo = { title: string; id: string; category: string };
const courseVideos: CourseVideo[] = courses.flatMap((course) => course.videos.map((video) => ({ ...video, category: course.category })));
const courseHeroVideos = [courseVideos[0], courseVideos[13], courseVideos[19]];
const courseWarningAcceptanceKey = 'course-access-warning-accepted';
let courseWarningAcceptedInMemory = false;

function hasAcceptedCourseWarning() {
  if (courseWarningAcceptedInMemory) return true;
  try {
    if (window.localStorage.getItem(courseWarningAcceptanceKey) === 'true') {
      courseWarningAcceptedInMemory = true;
      return true;
    }
  } catch { /* Try the session fallback for privacy-restricted browsers. */ }
  try {
    if (window.sessionStorage.getItem(courseWarningAcceptanceKey) === 'true') {
      courseWarningAcceptedInMemory = true;
      try { window.localStorage.setItem(courseWarningAcceptanceKey, 'true'); } catch { /* Keep the accepted state for this app session. */ }
      return true;
    }
  } catch { /* Keep the warning available when storage cannot be read. */ }
  return false;
}

function saveCourseWarningAcceptance() {
  courseWarningAcceptedInMemory = true;
  try { window.localStorage.setItem(courseWarningAcceptanceKey, 'true'); } catch { /* Fall back to this browser tab's session. */ }
  try { window.sessionStorage.setItem(courseWarningAcceptanceKey, 'true'); } catch { /* The in-memory state still covers the current app session. */ }
}

function CourseAccessWarning({ open, onAccept }: { open: boolean; onAccept: () => void }) {
  const [agreed, setAgreed] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);
  return <AnimatePresence>
    {open && <motion.div className="course-warning-overlay" role="dialog" aria-modal="true" aria-labelledby="course-warning-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="course-warning-card" initial={{ opacity: 0, y: 15, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: .99 }} transition={{ duration: .28, ease: easing }}>
        <span className="course-warning-icon"><TriangleAlert size={22} strokeWidth={1.8} aria-hidden="true" /></span>
        <span className="course-warning-eyebrow">Course Access Warning</span>
        <h2 id="course-warning-title">Please read before continuing</h2>
        <p>This course has been made publicly accessible for learning purposes only. Downloading, redistributing, screen recording, or re-uploading the course content anywhere else is <strong>strictly prohibited.</strong></p>
        <label className="course-warning-agreement"><input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} /><span className="course-warning-check" aria-hidden="true" /><span>I understand and agree</span></label>
        <button className="course-warning-continue" type="button" disabled={!agreed} onClick={onAccept}>Continue to Course<ArrowRight size={16} aria-hidden="true" /></button>
      </motion.div>
    </motion.div>}
  </AnimatePresence>;
}

function CourseVideoModal({ video, onClose }: { video: CourseVideo | null; onClose: () => void }) {
  useEffect(() => {
    if (!video) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', handleKeyDown); };
  }, [video, onClose]);
  return <AnimatePresence>
    {video && <motion.div className="course-video-overlay" role="dialog" aria-modal="true" aria-label={video.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="course-video-dialog" initial={{ opacity: 0, y: 12, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: .99 }} transition={{ duration: .25, ease: easing }} onClick={(event) => event.stopPropagation()}>
        <div className="course-video-dialog-head"><div><span>{video.category}</span><h2>{video.title}</h2></div><button type="button" aria-label="Close lesson" onClick={onClose}><X size={20} /></button></div>
        <div className="course-video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`} title={video.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
      </motion.div>
    </motion.div>}
  </AnimatePresence>;
}

function CoursePage() {
  const [activeCategory, setActiveCategory] = useState('All Lessons');
  const [selectedVideo, setSelectedVideo] = useState<CourseVideo | null>(null);
  const [warningOpen, setWarningOpen] = useState(() => typeof window !== 'undefined' && !hasAcceptedCourseWarning());
  const visibleVideos = activeCategory === 'All Lessons' ? courseVideos : courseVideos.filter((video) => video.category === activeCategory);
  const acceptWarning = () => {
    saveCourseWarningAcceptance();
    setWarningOpen(false);
  };
  return <main className="page inner-page course-page">
    <section className="course-hero soft-card">
      <div className="course-hero-copy">
        <h1>Become a Professional <span>Graphic Designer</span></h1>
        <p>Learn Photoshop, Manipulation, Social Media Design, AI Tools, Freelancing &amp; More — all in one cinematic course experience.</p>
        <div className="course-hero-actions"><a className="course-start-button" href="#course-lessons">Start Learning<ArrowRight size={16} /></a><ExternalLink className="course-about-link" href="https://yasinaliabir.com">About Me<ArrowUpRight size={15} /></ExternalLink></div>
        <div className="course-trust-stats"><div><strong>27,000+</strong><span>Learners Follow My YouTube</span></div><div><strong>1,284+</strong><span>Students Enrolled in Course</span></div></div>
      </div>
      <div className="course-hero-collage" aria-label="Course lesson previews">
        {courseHeroVideos.map((video, index) => <div className={`course-collage-tile course-collage-tile-${index + 1}`} key={video.id}><img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" /></div>)}
        <div className="course-collage-count"><Play size={13} fill="currentColor" aria-hidden="true" />{courseVideos.length} video lessons</div>
      </div>
    </section>

    <Reveal className="course-focus-section">
      <SectionHeading title="Course Focus" />
      <div className="course-focus-grid">{courseHighlights.map((highlight, index) => <article className="course-focus-card" key={highlight.title}><span className="course-focus-index">0{index + 1}</span><h3>{highlight.title}</h3><p>{highlight.description}</p></article>)}</div>
    </Reveal>

    <section className="course-lessons-section" id="course-lessons">
      <div className="course-lessons-head"><div><span className="course-lessons-kicker">LEARNING LIBRARY</span><h2>Course Lessons</h2><p>Browse the lessons by topic and open a video to start learning.</p></div><span className="course-total-badge">{courseVideos.length} videos</span></div>
      <nav className="course-category-filters" aria-label="Filter lessons by category">
        <button className={activeCategory === 'All Lessons' ? 'active' : ''} type="button" onClick={() => setActiveCategory('All Lessons')}>All Lessons<span>{courseVideos.length}</span></button>
        {courses.map((course) => <button className={activeCategory === course.category ? 'active' : ''} type="button" key={course.category} onClick={() => setActiveCategory(course.category)}>{course.category}<span>{course.videos.length}</span></button>)}
      </nav>
      <div className="course-lesson-grid">
        {visibleVideos.map((video, index) => <motion.button className="course-lesson-card" type="button" key={video.id} onClick={() => setSelectedVideo(video)} aria-label={`Play ${video.title}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .38, delay: (index % 8) * .025, ease: easing }}>
          <span className="course-lesson-thumb"><img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" /><span className="course-lesson-play"><Play size={17} fill="currentColor" aria-hidden="true" /></span></span>
          <span className="course-lesson-copy"><span>{video.category}</span><strong>{video.title}</strong></span>
        </motion.button>)}
      </div>
    </section>
    <div className="page-back-link"><Link to="/"><ArrowLeft size={15} />Back home</Link></div>
    <CourseAccessWarning open={warningOpen} onAccept={acceptWarning} />
    <CourseVideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
  </main>;
}

function ContactPage() {
  return <main className="page inner-page contact-page">
    <PageIntro title="Contact" text="For a project, collaboration, or a simple hello." />
    <Reveal className="contact-card soft-card"><span className="contact-orb"><Mail size={21} /></span><span className="micro-label">EMAIL</span>
      <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={17} /></a>
      <a className="email-cta" href={`mailto:${profile.email}?subject=Project%20inquiry`}>Start a conversation<ArrowRight size={15} /></a>
      <Link className="support-cta" to="/payment"><Heart size={15} aria-hidden="true" />Buy me a Range Rover!<ArrowRight size={15} aria-hidden="true" /></Link>
      <div className="contact-socials">
        {socialCards.filter((social) => social.url).map((social) => <ExternalLink key={social.id} href={social.url} aria-label={social.name} title={social.name}><img src={social.icon} alt="" loading="lazy" /></ExternalLink>)}
        {profile.whatsappUrl && <ExternalLink className="contact-whatsapp" href={profile.whatsappUrl} aria-label="WhatsApp" title="WhatsApp"><img src="/assets/social/whatsapp.png" alt="" loading="lazy" /></ExternalLink>}
      </div>
    </Reveal>
    <div className="page-back-link"><Link to="/"><ArrowLeft size={15} />Back home</Link></div>
  </main>;
}

function CopyValueButton({ value, fieldId, copiedField, onCopy }: { value: string; fieldId: string; copiedField: string | null; onCopy: (fieldId: string, value: string) => void }) {
  const isCopied = copiedField === fieldId;
  return <button className={`copy-value-button ${isCopied ? 'is-copied' : ''}`} type="button" onClick={() => onCopy(fieldId, value)} aria-label={`Copy ${value}`}>
    {isCopied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}<span>{isCopied ? 'Copied' : 'Copy'}</span>
  </button>;
}

function PaymentPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const copyValue = useCallback(async (fieldId: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = value;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    setCopiedField(fieldId);
    window.setTimeout(() => setCopiedField((current) => current === fieldId ? null : current), 1800);
  }, []);

  return <main className="page inner-page payment-page">
    <PageIntro title="Payment Details" text="Choose a payment method and copy the details you need." />
    <div className="payment-layout">
      <Reveal className="payment-card payment-bank-card soft-card">
        <div className="payment-card-heading"><img className="payment-logo" src={paymentDetails.bankLogo} alt="BRAC Bank" /><div><span>Bank transfer</span><h2>BRAC Bank PLC</h2></div></div>
        <div className="payment-detail-list">
          {paymentDetails.bank.map((detail) => <div className="payment-detail-row" key={detail.id}>
            <div className="payment-detail-copy"><span>{detail.label}</span><strong>{detail.value}</strong></div>
            <CopyValueButton value={detail.value} fieldId={detail.id} copiedField={copiedField} onCopy={copyValue} />
          </div>)}
        </div>
      </Reveal>
      <div className="wallet-card-grid">
        {paymentDetails.wallets.map((detail, index) => <Reveal className={`payment-card wallet-card wallet-${detail.id} soft-card`} key={detail.id} delay={index * 0.05}>
          <div className="wallet-card-top"><img className="payment-logo" src={detail.logo} alt={`${detail.label} logo`} /><span>{detail.label}{detail.note ? ` — ${detail.note}` : ''}</span></div>
          <strong>{detail.value}</strong>
          <CopyValueButton value={detail.value} fieldId={detail.id} copiedField={copiedField} onCopy={copyValue} />
        </Reveal>)}
      </div>
    </div>
    <div className="page-back-link"><Link to="/contact"><ArrowLeft size={15} />Back to contact</Link></div>
  </main>;
}

type ClientReview = (typeof clientReviews)[number];

function ClientReviewCard({ review, duplicate = false }: { review: ClientReview; duplicate?: boolean }) {
  return <article className="client-review-card soft-card" aria-hidden={duplicate || undefined}>
    <div className="client-review-head">
      <img className={`client-review-avatar ${review.imageKind === 'brand' ? 'is-brand' : ''}`} src={review.image} alt="" loading="eager" />
      <div className="client-review-author">
        <h2>{review.clientName}</h2>
        <p>{review.role}<span aria-hidden="true"> · </span>{review.company}</p>
      </div>
    </div>
    <div className="client-review-rating" aria-label={`${review.rating} out of 5 stars`}>
      {Array.from({ length: review.rating }, (_, index) => <Star key={index} size={15} fill="currentColor" aria-hidden="true" />)}
      {review.category === 'verified' && <span className="client-review-verified"><BadgeCheck size={13} aria-hidden="true" />Verified client</span>}
    </div>
    <blockquote>“{review.content}”</blockquote>
  </article>;
}

function ReviewMarqueeLayout({ columns, className }: { columns: number; className: string }) {
  const groups = Array.from({ length: columns }, (_, columnIndex) => clientReviews.filter((_, index) => index % columns === columnIndex));
  return <div className={`client-reviews-marquee ${className}`}>
    {groups.map((reviews, columnIndex) => <div className="client-reviews-column" key={`${className}-${columnIndex}`}>
      <div className={`client-reviews-track ${columnIndex % 2 ? 'client-reviews-track-down' : 'client-reviews-track-up'}`} style={{ animationDuration: `${42 + columnIndex * 6}s` }}>
        {[false, true].map((duplicate) => <div className="client-reviews-group" aria-hidden={duplicate || undefined} key={duplicate ? 'duplicate' : 'original'}>
          {reviews.map((review) => <ClientReviewCard review={review} duplicate={duplicate} key={`${review.id}-${duplicate ? 'copy' : 'original'}`} />)}
        </div>)}
      </div>
    </div>)}
  </div>;
}

function ReviewsPage() {
  return <main className="page inner-page reviews-page">
    <PageIntro title="Client Reviews" text={`${clientReviews.length} reviews from clients, creators, and brands.`} />
    {clientReviews.length ? <div className="client-reviews-stage" aria-label="Client reviews">
      <ReviewMarqueeLayout columns={3} className="client-reviews-desktop" />
      <ReviewMarqueeLayout columns={2} className="client-reviews-tablet" />
      <ReviewMarqueeLayout columns={1} className="client-reviews-mobile" />
    </div> : <div className="reviews-empty soft-card"><h2>No reviews available</h2><p>Client reviews will appear here when they are added to the project.</p></div>}
  </main>;
}

function PageRouter() {
  const location = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [location.pathname]);
  return <AnimatePresence mode="wait">
    <motion.div className="route-stage" key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.24, ease: easing }}>
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
    </motion.div>
  </AnimatePresence>;
}

export default function App() {
  useContentProtection();

  return <MotionConfig reducedMotion="user"><div className="site-shell">
    <div className="ambient ambient-top" /><div className="ambient ambient-bottom" />
    <PageRouter />
    <Dock />
  </div></MotionConfig>;
}

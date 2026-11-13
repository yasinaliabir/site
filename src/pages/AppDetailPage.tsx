import {
  ArrowDownToLine, ArrowLeft, ArrowUpRight, Check, HelpCircle, Info, Laptop, Monitor, PanelsTopLeft, ShoppingBag, Smartphone, X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { apps } from '../data/apps';
import { ComingSoon, ExternalLink, Reveal } from '../components/Shared';

function DownloadPlatformIcon({ platform }: { platform: string }) {
  if (platform === 'Mac') return <Laptop size={18} aria-hidden="true" />;
  if (platform === 'Windows') return <Monitor size={18} aria-hidden="true" />;
  return <Smartphone size={18} aria-hidden="true" />;
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

  if (!open) return null;

  return (
    <div
      className="install-modal-overlay modal-overlay-animate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-modal-title"
      onClick={onClose}
    >
      <div
        className="install-modal-card modal-card-animate"
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
      </div>
    </div>
  );
}

export default function AppDetailPage() {
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

  return (
    <main className="page inner-page app-single-page">
      <div className={`app-single-card soft-card app-detail-${item.accent}`}>
        <Link className="back-control" to="/apps"><ArrowLeft size={16} />All Apps</Link>
        <div className="app-single-visual">
          <span className="single-glow" />
          <img src={item.icon} alt={`${item.name} product artwork`} width={210} height={210} fetchPriority="high" decoding="sync" />
        </div>
        <Reveal className="app-single-copy">
          <span className="app-platform-label">{item.platform}</span>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <div className="single-meta">
            {item.downloads.length ? (
              <div className="download-panel">
                <div className="download-panel-heading">
                  <div>
                    <span>GET THE APP</span>
                    <strong>Choose your platform</strong>
                  </div>
                  <span className="download-available"><Check size={12} />Available now</span>
                </div>
                <div className="download-options">
                  {item.downloads.map((download) =>
                    download.comingSoon ? (
                      <div key={download.shortLabel} className="platform-download-card platform-download-soon" aria-label={`${download.shortLabel} coming soon`} aria-disabled="true">
                        <span className="platform-download-icon"><DownloadPlatformIcon platform={download.shortLabel} /></span>
                        <span className="platform-download-copy"><small>Coming soon for</small><strong>{download.shortLabel}</strong></span>
                        <span className="soon-badge">SOON</span>
                      </div>
                    ) : (
                      <ExternalLink key={download.shortLabel} href={download.url!} className="platform-download-card" aria-label={download.label}>
                        <span className="platform-download-icon"><DownloadPlatformIcon platform={download.shortLabel} /></span>
                        <span className="platform-download-copy"><small>Download for</small><strong>{download.shortLabel}</strong></span>
                        <ArrowDownToLine className="platform-download-arrow" size={16} />
                      </ExternalLink>
                    ),
                  )}
                  {item.slug === 'project-manager' && (
                    <div className="platform-download-card platform-download-soon" aria-label="App Store coming soon">
                      <span className="platform-download-icon"><ShoppingBag size={18} aria-hidden="true" /></span>
                      <span className="platform-download-copy"><small>Coming soon on</small><strong>App Store</strong></span>
                      <span className="soon-badge">SOON</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="single-download-fallback">
                <span className="platform-dot"><PanelsTopLeft size={14} />{item.shortPlatform}</span>
                <div className="single-download-actions">
                  {item.downloadUrl ? (
                    <ExternalLink href={item.downloadUrl} className="download-button">
                      <ArrowDownToLine size={15} />Download
                    </ExternalLink>
                  ) : (
                    <ComingSoon />
                  )}
                  {isExtension && (
                    <button
                      type="button"
                      className="how-to-install-button"
                      onClick={() => setInstallModalOpen(true)}
                      aria-label={`How to install ${item.name}`}
                    >
                      <HelpCircle size={15} aria-hidden="true" />
                      <span>How to Install</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      <section className="app-screenshot-section" aria-labelledby="app-screenshot-title">
        <div className="app-screenshot-heading">
          <div>
            <span className="app-screenshot-eyebrow">APP INTERFACE</span>
            <h2 id="app-screenshot-title">Interface Preview</h2>
          </div>
          <span className="app-screenshot-count">3 screenshots</span>
        </div>
        <div className="app-screenshot-grid">
          {[0, 1, 2].map((index) => {
            const screenshot = item.screenshots[index];
            return (
              <figure className="app-screenshot-frame" key={`${item.slug}-screenshot-${index}`}>
                {screenshot ? (
                  <button
                    className="app-screenshot-open"
                    type="button"
                    onClick={() => setSelectedScreenshot(screenshot.full)}
                    aria-label={`View ${item.name} interface screenshot ${index + 1} full size`}
                  >
                    <img
                      src={screenshot.thumb}
                      alt={`${item.name} interface screenshot ${index + 1}`}
                      width={760}
                      height={413}
                      loading="lazy"
                      decoding="async"
                    />
                    <span>View full image</span>
                  </button>
                ) : (
                  <div className="app-screenshot-placeholder">
                    <span className="app-screenshot-placeholder-icon"><PanelsTopLeft size={18} aria-hidden="true" /></span>
                    <strong>Add screenshot 0{index + 1}</strong>
                    <span>Ready for your image</span>
                  </div>
                )}
              </figure>
            );
          })}
        </div>
      </section>

      {selectedScreenshot && (
        <div
          className="app-screenshot-lightbox modal-overlay-animate"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.name} interface preview`}
          onClick={() => setSelectedScreenshot(null)}
        >
          <div className="app-screenshot-lightbox-panel modal-card-animate" onClick={(event) => event.stopPropagation()}>
            <button className="app-screenshot-close" type="button" onClick={() => setSelectedScreenshot(null)} aria-label="Close full image">
              <X size={19} />
            </button>
            <div className="app-screenshot-lightbox-image">
              <img src={selectedScreenshot} alt={`${item.name} full interface preview`} decoding="async" />
            </div>
          </div>
        </div>
      )}

      <ExtensionInstallModal open={installModalOpen} onClose={() => setInstallModalOpen(false)} />
    </main>
  );
}

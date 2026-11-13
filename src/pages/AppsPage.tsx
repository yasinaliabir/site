import { ArrowDownToLine, ArrowLeft, ArrowUpRight, PanelsTopLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apps } from '../data/apps';
import { ComingSoon, ExternalLink, PageIntro, Reveal, prefetchProps } from '../components/Shared';

export default function AppsPage() {
  return (
    <main className="page inner-page apps-page">
      <PageIntro title="My Apps & Extensions" text="A small collection of tools built around creative work." />
      <div className="apps-detail-grid">
        {apps.map((item, index) => {
          const path = `/apps/${item.slug}`;
          return (
            <Reveal className={`app-detail-card soft-card app-detail-${item.accent}`} key={item.slug} delay={index * 0.045}>
              <Link to={path} className="app-detail-preview" aria-label={`Preview ${item.name}`} {...prefetchProps(path)}>
                <span className="preview-orbit preview-orbit-one" />
                <span className="preview-orbit preview-orbit-two" />
                <img src={item.icon} alt={`${item.name} preview artwork`} width={116} height={116} loading="lazy" decoding="async" />
                <span className="preview-open"><ArrowUpRight size={17} /></span>
              </Link>
              <div className="app-detail-info">
                <div className="app-detail-head">
                  <div>
                    <span className="app-platform-label">{item.platform}</span>
                    <h2>{item.name}</h2>
                  </div>
                  <Link className="round-arrow" to={path} aria-label={`Details for ${item.name}`} {...prefetchProps(path)}>
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
                <p>{item.description}</p>
                <div className="app-detail-bottom">
                  <span className="platform-dot"><PanelsTopLeft size={14} />{item.shortPlatform}</span>
                  {item.downloads.length ? (
                    <Link to={path} className="download-button" {...prefetchProps(path)}>
                      <ArrowDownToLine size={15} />Downloads
                    </Link>
                  ) : item.downloadUrl ? (
                    <ExternalLink href={item.downloadUrl} className="download-button">
                      <ArrowDownToLine size={15} />Download
                    </ExternalLink>
                  ) : (
                    <ComingSoon />
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <div className="page-back-link"><Link to="/"><ArrowLeft size={15} />Back home</Link></div>
    </main>
  );
}

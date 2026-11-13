import { useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { appSummaries, clientPortraits, gallery, profile } from '../data/home';
import { Reveal, SectionHeading, SocialIconRow, prefetchProps, useInViewAnimation } from '../components/Shared';

function ClientRating() {
  return (
    <div className="hero-badges">
      <span className="rated-pill">
        <span className="rated-label">Rated by</span>
        <span className="client-stack">
          {clientPortraits.map((client, index) => (
            <span
              className={`client-avatar client-avatar-${index + 1}`}
              key={client.id}
              title={client.src ? 'Client portrait' : 'Replace with client photo'}
              aria-label={client.src ? 'Client portrait' : `Client photo placeholder ${index + 1}`}
            >
              {client.src ? (
                <img src={client.src} alt="Client portrait" width={28} height={28} loading="eager" decoding="async" />
              ) : (
                <span>{client.placeholder}</span>
              )}
            </span>
          ))}
        </span>
      </span>
      <Link
        to="/reviews"
        target="_blank"
        rel="noopener noreferrer"
        className="view-reviews-button"
        {...prefetchProps('/reviews')}
      >
        View Reviews<ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}

function DesktopHero() {
  return (
    <div className="desktop-hero-grid">
      <div className="desktop-hero-portrait-reveal">
        <article className="desktop-profile-card soft-card">
          <div className="desktop-profile-photo">
            <picture>
              {profile.mobilePortrait && (
                <source
                  media="(max-width: 900px)"
                  srcSet={profile.mobilePortraitSrcSet}
                  sizes="(max-width: 600px) calc(100vw - 46px), 650px"
                />
              )}
              <img
                src={profile.portrait}
                srcSet={profile.portraitSrcSet}
                sizes="(max-width: 1100px) 320px, 430px"
                alt="Yasin Ali Abir"
                width={1000}
                height={1000}
                fetchPriority="high"
                decoding="sync"
              />
            </picture>
          </div>
          <div className="desktop-profile-copy">
            <h2>{profile.displayName}</h2>
            <p>{profile.displayTitle}</p>
          </div>
        </article>
      </div>
      <div className="desktop-hero-intro-reveal">
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
          <SocialIconRow className="desktop-hero-social-row" eager />
          <div className="desktop-proof-row" aria-label="Professional experience">
            {profile.stats.map((stat) => (
              <div className="desktop-proof-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

function AppListRow({ item, index = 0 }: { item: (typeof appSummaries)[number]; index?: number }) {
  const path = `/apps/${item.slug}`;
  return (
    <Reveal className="app-list-cell" delay={index * 0.04}>
      <Link to={path} className={`app-list-row app-${item.accent}`} aria-label={`View ${item.name}`} {...prefetchProps(path)}>
        <span className="app-list-icon">
          <img src={item.icon} alt="" width={64} height={64} loading="lazy" decoding="async" />
        </span>
        <span className="app-list-copy">
          <strong>{item.name}</strong>
          <span>{item.shortPlatform}</span>
        </span>
        <span className="app-list-action">
          View<ArrowRight size={14} aria-hidden="true" />
        </span>
      </Link>
    </Reveal>
  );
}

function AppsPreview() {
  return (
    <Reveal className="home-section apps-preview-section">
      <div className="section-heading section-heading-action">
        <div><h2>My Apps &amp; Extensions</h2></div>
        <Link className="see-all-button" to="/apps" {...prefetchProps('/apps')}>
          See All<ArrowRight size={15} />
        </Link>
      </div>
      <div className="apps-list-grid" aria-label="Apps and extensions">
        {appSummaries.map((item, index) => <AppListRow item={item} key={item.slug} index={index} />)}
      </div>
    </Reveal>
  );
}

function GalleryMarquee({ title, type, reverse = false }: { title: string; type: 'portrait' | 'logo'; reverse?: boolean }) {
  const items = gallery.filter((item) => item.type === type);
  const loop = [...items, ...items];
  const maskRef = useRef<HTMLDivElement>(null);
  const isAnimating = useInViewAnimation(maskRef);

  return (
    <Reveal className={`home-section gallery-section ${type === 'portrait' ? 'creator-section' : 'brand-section'}`}>
      <SectionHeading title={title} />
      <div
        ref={maskRef}
        className={`gallery-mask ${isAnimating ? '' : 'is-marquee-paused'}`}
        role="group"
        aria-label={`${title} image gallery`}
        tabIndex={0}
      >
        <div className={`gallery-track ${reverse ? 'gallery-track-reverse' : ''}`} aria-hidden="true">
          {loop.map((item, index) => (
            <div className={`gallery-item ${type === 'logo' ? 'gallery-logo' : 'gallery-portrait'}`} key={`${item.src}-${index}`}>
              <img src={item.src} alt="" width={136} height={136} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function HomePage() {
  return (
    <main className="page home-page">
      <DesktopHero />
      <AppsPreview />
      <GalleryMarquee title="Creators Worked With" type="portrait" />
      <GalleryMarquee title="Brands Worked With" type="logo" reverse />
    </main>
  );
}

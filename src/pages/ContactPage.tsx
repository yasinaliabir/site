import { ArrowLeft, ArrowRight, ArrowUpRight, Heart, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile, socialCards } from '../data/home';
import { ExternalLink, PageIntro, Reveal, prefetchProps } from '../components/Shared';

export default function ContactPage() {
  return (
    <main className="page inner-page contact-page">
      <PageIntro title="Contact" text="For a project, collaboration, or a simple hello." />
      <Reveal className="contact-card soft-card">
        <span className="contact-orb"><Mail size={21} /></span>
        <span className="micro-label">EMAIL</span>
        <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={17} /></a>
        <a className="email-cta" href={`mailto:${profile.email}?subject=Project%20inquiry`}>Start a conversation<ArrowRight size={15} /></a>
        <Link className="support-cta" to="/payment" {...prefetchProps('/payment')}>
          <Heart size={15} aria-hidden="true" />Buy me a Range Rover!<ArrowRight size={15} aria-hidden="true" />
        </Link>
        <div className="contact-socials">
          {socialCards.filter((social) => social.url).map((social) => (
            <ExternalLink key={social.id} href={social.url} aria-label={social.name} title={social.name}>
              <img src={social.icon} alt="" width={34} height={34} loading="lazy" decoding="async" />
            </ExternalLink>
          ))}
          {profile.whatsappUrl && (
            <ExternalLink className="contact-whatsapp" href={profile.whatsappUrl} aria-label="WhatsApp" title="WhatsApp">
              <img src="/assets/social/whatsapp.webp" alt="" width={34} height={34} loading="lazy" decoding="async" />
            </ExternalLink>
          )}
        </div>
      </Reveal>
      <div className="page-back-link"><Link to="/"><ArrowLeft size={15} />Back home</Link></div>
    </main>
  );
}

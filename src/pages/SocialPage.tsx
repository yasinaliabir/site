import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageIntro, SocialIconRow } from '../components/Shared';

export default function SocialPage() {
  return (
    <main className="page inner-page social-page">
      <PageIntro kicker="CONNECT & FOLLOW" title="Connect With Me" />
      <SocialIconRow />
      <div className="page-back-link"><Link to="/"><ArrowLeft size={15} />Back home</Link></div>
    </main>
  );
}

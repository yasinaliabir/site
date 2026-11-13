import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { works } from '../data/works';
import { ExternalLink, Reveal } from '../components/Shared';

export default function WorkDetailPage() {
  const { slug } = useParams();
  const work = works.find((item) => item.slug === slug);
  if (!work) return <Navigate to="/works" replace />;

  return (
    <main className="page inner-page work-single-page">
      <div className="work-single-top">
        <Link className="back-control" to="/works"><ArrowLeft size={16} />All Works</Link>
        <span className="app-platform-label">{work.category}</span>
      </div>
      <Reveal className="work-single-card soft-card">
        <div className="work-single-image">
          <img src={work.image} alt={work.title} decoding="async" />
        </div>
        <div className="work-single-copy">
          <h1>{work.title}</h1>
          <p>Selected work by Yasin Ali Abir.</p>
          <ExternalLink className="download-button" href={work.href}>
            View project on Behance<ArrowUpRight size={15} />
          </ExternalLink>
        </div>
      </Reveal>
    </main>
  );
}

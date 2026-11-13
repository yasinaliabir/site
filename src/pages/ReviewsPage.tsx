import { BadgeCheck, Star } from 'lucide-react';
import { useRef } from 'react';
import { clientReviews } from '../data/reviews';
import { PageIntro, useInViewAnimation, useMediaQuery } from '../components/Shared';

type ClientReview = (typeof clientReviews)[number];

function ClientReviewCard({ review, duplicate = false }: { review: ClientReview; duplicate?: boolean }) {
  return (
    <article className="client-review-card soft-card" aria-hidden={duplicate || undefined}>
      <div className="client-review-head">
        <img
          className={`client-review-avatar ${review.imageKind === 'brand' ? 'is-brand' : ''}`}
          src={review.image}
          alt=""
          width={52}
          height={52}
          loading={duplicate ? 'lazy' : 'eager'}
          decoding="async"
        />
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
    </article>
  );
}

function ReviewMarqueeLayout({ columns, className }: { columns: number; className: string }) {
  const groups = Array.from({ length: columns }, (_, columnIndex) => clientReviews.filter((_, index) => index % columns === columnIndex));
  return (
    <div className={`client-reviews-marquee ${className}`}>
      {groups.map((reviews, columnIndex) => (
        <div className="client-reviews-column" key={`${className}-${columnIndex}`}>
          <div className={`client-reviews-track ${columnIndex % 2 ? 'client-reviews-track-down' : 'client-reviews-track-up'}`} style={{ animationDuration: `${42 + columnIndex * 6}s` }}>
            {[false, true].map((duplicate) => (
              <div className="client-reviews-group" aria-hidden={duplicate || undefined} key={duplicate ? 'duplicate' : 'original'}>
                {reviews.map((review) => (
                  <ClientReviewCard review={review} duplicate={duplicate} key={`${review.id}-${duplicate ? 'copy' : 'original'}`} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');
  const stageRef = useRef<HTMLDivElement>(null);
  const isAnimating = useInViewAnimation(stageRef);

  const activeLayout = isMobile
    ? { columns: 1, className: 'client-reviews-mobile' }
    : isTablet
      ? { columns: 2, className: 'client-reviews-tablet' }
      : { columns: 3, className: 'client-reviews-desktop' };

  return (
    <main className="page inner-page reviews-page">
      <PageIntro title="Client Reviews" text={`${clientReviews.length} reviews from clients, creators, and brands.`} />
      {clientReviews.length ? (
        <div ref={stageRef} className={`client-reviews-stage ${isAnimating ? '' : 'is-marquee-paused'}`} aria-label="Client reviews">
          <ReviewMarqueeLayout columns={activeLayout.columns} className={activeLayout.className} />
        </div>
      ) : (
        <div className="reviews-empty soft-card">
          <h2>No reviews available</h2>
          <p>Client reviews will appear here when they are added to the project.</p>
        </div>
      )}
    </main>
  );
}

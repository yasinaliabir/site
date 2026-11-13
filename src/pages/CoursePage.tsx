import { ArrowLeft, ArrowRight, ArrowUpRight, Play, TriangleAlert, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseHighlights, courses } from '../data/courses';
import { ExternalLink, Reveal, SectionHeading } from '../components/Shared';

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

  if (!open) return null;

  return (
    <div className="course-warning-overlay modal-overlay-animate" role="dialog" aria-modal="true" aria-labelledby="course-warning-title">
      <div className="course-warning-card modal-card-animate">
        <span className="course-warning-icon"><TriangleAlert size={22} strokeWidth={1.8} aria-hidden="true" /></span>
        <span className="course-warning-eyebrow">Course Access Warning</span>
        <h2 id="course-warning-title">Please read before continuing</h2>
        <p>
          This course has been made publicly accessible for learning purposes only. Downloading, redistributing, screen recording, or re-uploading the course content anywhere else is <strong>strictly prohibited.</strong>
        </p>
        <label className="course-warning-agreement">
          <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} />
          <span className="course-warning-check" aria-hidden="true" />
          <span>I understand and agree</span>
        </label>
        <button className="course-warning-continue" type="button" disabled={!agreed} onClick={onAccept}>
          Continue to Course<ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
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

  if (!video) return null;

  return (
    <div className="course-video-overlay modal-overlay-animate" role="dialog" aria-modal="true" aria-label={video.title} onClick={onClose}>
      <div className="course-video-dialog modal-card-animate" onClick={(event) => event.stopPropagation()}>
        <div className="course-video-dialog-head">
          <div>
            <span>{video.category}</span>
            <h2>{video.title}</h2>
          </div>
          <button type="button" aria-label="Close lesson" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="course-video-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function CoursePage() {
  const [activeCategory, setActiveCategory] = useState('All Lessons');
  const [selectedVideo, setSelectedVideo] = useState<CourseVideo | null>(null);
  const [warningOpen, setWarningOpen] = useState(() => typeof window !== 'undefined' && !hasAcceptedCourseWarning());
  const visibleVideos = activeCategory === 'All Lessons' ? courseVideos : courseVideos.filter((video) => video.category === activeCategory);

  const acceptWarning = () => {
    saveCourseWarningAcceptance();
    setWarningOpen(false);
  };

  return (
    <main className="page inner-page course-page">
      <section className="course-hero soft-card">
        <div className="course-hero-copy">
          <h1>Become a Professional <span>Graphic Designer</span></h1>
          <p>Learn Photoshop, Manipulation, Social Media Design, AI Tools, Freelancing &amp; More — all in one cinematic course experience.</p>
          <div className="course-hero-actions">
            <a className="course-start-button" href="#course-lessons">Start Learning<ArrowRight size={16} /></a>
            <ExternalLink className="course-about-link" href="https://yasinaliabir.com">About Me<ArrowUpRight size={15} /></ExternalLink>
          </div>
          <div className="course-trust-stats">
            <div><strong>27,000+</strong><span>Learners Follow My YouTube</span></div>
            <div><strong>1,284+</strong><span>Students Enrolled in Course</span></div>
          </div>
        </div>
        <div className="course-hero-collage" aria-label="Course lesson previews">
          {courseHeroVideos.map((video, index) => (
            <div className={`course-collage-tile course-collage-tile-${index + 1}`} key={video.id}>
              <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt="" width={480} height={360} loading="eager" decoding="async" />
            </div>
          ))}
          <div className="course-collage-count"><Play size={13} fill="currentColor" aria-hidden="true" />{courseVideos.length} video lessons</div>
        </div>
      </section>

      <Reveal className="course-focus-section">
        <SectionHeading title="Course Focus" />
        <div className="course-focus-grid">
          {courseHighlights.map((highlight, index) => (
            <article className="course-focus-card" key={highlight.title}>
              <span className="course-focus-index">0{index + 1}</span>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <section className="course-lessons-section" id="course-lessons">
        <div className="course-lessons-head">
          <div>
            <span className="course-lessons-kicker">LEARNING LIBRARY</span>
            <h2>Course Lessons</h2>
            <p>Browse the lessons by topic and open a video to start learning.</p>
          </div>
          <span className="course-total-badge">{courseVideos.length} videos</span>
        </div>
        <nav className="course-category-filters" aria-label="Filter lessons by category">
          <button className={activeCategory === 'All Lessons' ? 'active' : ''} type="button" onClick={() => setActiveCategory('All Lessons')}>
            All Lessons<span>{courseVideos.length}</span>
          </button>
          {courses.map((course) => (
            <button className={activeCategory === course.category ? 'active' : ''} type="button" key={course.category} onClick={() => setActiveCategory(course.category)}>
              {course.category}<span>{course.videos.length}</span>
            </button>
          ))}
        </nav>
        <div className="course-lesson-grid">
          {visibleVideos.map((video) => (
            <button
              className="course-lesson-card"
              type="button"
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              aria-label={`Play ${video.title}`}
            >
              <span className="course-lesson-thumb">
                <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt="" width={480} height={360} loading="lazy" decoding="async" />
                <span className="course-lesson-play"><Play size={17} fill="currentColor" aria-hidden="true" /></span>
              </span>
              <span className="course-lesson-copy">
                <span>{video.category}</span>
                <strong>{video.title}</strong>
              </span>
            </button>
          ))}
        </div>
      </section>
      <div className="page-back-link"><Link to="/"><ArrowLeft size={15} />Back home</Link></div>
      <CourseAccessWarning open={warningOpen} onAccept={acceptWarning} />
      <CourseVideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </main>
  );
}

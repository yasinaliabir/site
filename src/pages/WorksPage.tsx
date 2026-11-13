import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type React from 'react';
import { portfolioProjects } from '../portfolioProjects';
import { useInViewAnimation, useMediaQuery } from '../components/Shared';

type WorkCategory = 'Thumbnails' | 'Sports' | 'Social Media';
type PortfolioProject = (typeof portfolioProjects)[number];
const portfolioCategories: WorkCategory[] = ['Thumbnails', 'Sports', 'Social Media'];

const mixedPortfolioProjects: PortfolioProject[] = (() => {
  const groups = portfolioCategories.map((category) => portfolioProjects.filter((project) => project.category === category));
  const largestGroup = Math.max(...groups.map((group) => group.length));
  return Array.from({ length: largestGroup }, (_, index) => groups.flatMap((group) => (group[index] ? [group[index]] : []))).flat();
})();

function distributePortfolioProjects(columnCount: number) {
  const columns = Array.from({ length: columnCount }, () => ({ projects: [] as PortfolioProject[], height: 0 }));
  mixedPortfolioProjects.forEach((project) => {
    const shortestColumn = columns.reduce((shortest, column, index) => (column.height < columns[shortest].height ? index : shortest), 0);
    columns[shortestColumn].projects.push(project);
    columns[shortestColumn].height += project.aspectRatio === 'portrait' ? 2 : 1;
  });
  return columns.map((column) => column.projects);
}

function withUnsplashWidth(url: string, width: number) {
  return url.replace(/([?&])w=\d+/, `$1w=${width}`);
}

function getUnsplashSrcSet(url: string) {
  return `${withUnsplashWidth(url, 380)} 380w, ${withUnsplashWidth(url, 640)} 640w`;
}

function PortfolioMasonry({ onSelect }: { onSelect: (project: PortfolioProject) => void }) {
  const isMobile = useMediaQuery('(max-width: 680px)');
  const isTablet = useMediaQuery('(max-width: 1060px)');
  const frameRef = useRef<HTMLDivElement>(null);
  const isAnimating = useInViewAnimation(frameRef);

  const activeLayout = useMemo(() => {
    if (isMobile) return { className: 'works-masonry-mobile', columns: 2, sizes: '48vw' };
    if (isTablet) return { className: 'works-masonry-tablet', columns: 3, sizes: '32vw' };
    return { className: 'works-masonry-desktop', columns: 5, sizes: '19vw' };
  }, [isMobile, isTablet]);

  const distributedColumns = useMemo(() => distributePortfolioProjects(activeLayout.columns), [activeLayout.columns]);

  return (
    <div ref={frameRef} className={`works-masonry-frame ${isAnimating ? '' : 'is-marquee-paused'}`}>
      <div className={`works-masonry ${activeLayout.className}`}>
        {distributedColumns.map((projects, columnIndex) => (
          <div className="works-masonry-column" key={`${activeLayout.className}-${columnIndex}`}>
            <div
              className={`works-masonry-track ${columnIndex % 2 ? 'works-masonry-track-down' : 'works-masonry-track-up'}`}
              style={{ animationDuration: `${54 + columnIndex * 5}s`, animationDelay: `${-columnIndex * 3}s` }}
            >
              {[0, 1].map((copy) => (
                <div className="works-masonry-list" key={copy} aria-hidden={copy === 1 || undefined}>
                  {projects.map((project, itemIndex) => {
                    const isDownward = columnIndex % 2 === 1;
                    const isInitiallyVisible = isDownward
                      ? itemIndex >= projects.length - 3
                      : copy === 0 && itemIndex < 3;
                    return (
                      <button
                        className={`works-masonry-art works-masonry-art-${project.aspectRatio}`}
                        type="button"
                        key={`${project.id}-${copy}`}
                        aria-label={copy === 1 ? undefined : `Preview ${project.title}`}
                        tabIndex={copy === 1 ? -1 : 0}
                        onClick={() => onSelect(project)}
                      >
                        <img
                          src={withUnsplashWidth(project.imageUrl, 520)}
                          srcSet={getUnsplashSrcSet(project.imageUrl)}
                          sizes={activeLayout.sizes}
                          alt={copy === 1 ? '' : project.title}
                          width={project.aspectRatio === 'portrait' ? 400 : 480}
                          height={project.aspectRatio === 'portrait' ? 500 : 300}
                          loading={isInitiallyVisible ? 'eager' : 'lazy'}
                          decoding="async"
                          referrerPolicy="no-referrer"
                          draggable={false}
                        />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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

  useEffect(() => {
    if (!project) return;
    const idx = portfolioProjects.findIndex((item) => item.id === project.id);
    if (idx === -1) return;
    const next = portfolioProjects[(idx + 1) % portfolioProjects.length];
    const prev = portfolioProjects[(idx - 1 + portfolioProjects.length) % portfolioProjects.length];
    [next, prev].forEach((neighbor) => {
      const preloadImg = new Image();
      preloadImg.referrerPolicy = 'no-referrer';
      preloadImg.src = withUnsplashWidth(neighbor.imageUrl, 1200);
    });
  }, [project]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    const deltaY = event.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      onChange(deltaX < 0 ? 1 : -1);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!project) return null;

  return (
    <div
      className="works-viewer-overlay modal-overlay-animate"
      role="dialog"
      aria-modal="true"
      aria-label="Design Preview"
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

      <div
        className="works-viewer-content modal-card-animate"
        key={project.id}
        onClick={(event) => event.stopPropagation()}
      >
        <figure className="works-viewer-art">
          <img
            src={withUnsplashWidth(project.imageUrl, 1200)}
            alt={project.title}
            decoding="async"
            referrerPolicy="no-referrer"
            draggable={false}
          />
        </figure>
      </div>

      <button
        className="works-viewer-arrow works-viewer-next"
        type="button"
        aria-label="Next design"
        onClick={(event) => { event.stopPropagation(); onChange(1); }}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export default function WorksPage() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  const changeProject = useCallback((direction: -1 | 1) => {
    setSelectedProject((current) => {
      if (!current) return current;
      const currentIndex = portfolioProjects.findIndex((project) => project.id === current.id);
      return portfolioProjects[(currentIndex + direction + portfolioProjects.length) % portfolioProjects.length];
    });
  }, []);

  return (
    <main className="page inner-page works-page">
      <header className="works-showcase-header">
        <h1>Selected Design Work</h1>
        <p>High-performing visuals built for max audience reach, CTR, and viral conversion.</p>
      </header>
      <PortfolioMasonry onSelect={setSelectedProject} />
      <PortfolioProjectModal project={selectedProject} onClose={closeProject} onChange={changeProject} />
    </main>
  );
}

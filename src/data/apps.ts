export type AppScreenshot = {
  thumb: string;
  full: string;
};

export const apps = [
  {
    slug: 'project-manager',
    name: 'Project Manager',
    platform: 'Mac, Windows & Android',
    shortPlatform: 'Mac · Windows · Android',
    description: 'A focused workspace for planning creative projects, tracking progress, and keeping deliverables organized.',
    icon: '/assets/apps/project-manager.webp',
    accent: 'rose',
    downloadUrl: null as string | null,
    downloads: [
      { label: 'Download for Mac', shortLabel: 'Mac', url: 'https://drive.usercontent.google.com/download?id=1muf1IlylUFNnfD08vHwU8rLDFrD4xvff&export=download&authuser=0&confirm=t&uuid=df710f3c-e85f-40a3-aecf-26c078fac20a&at=AMrWOn0C-SNQNn5BVs9xA-wQBmkZ%3A1794574308949' },
      { label: 'Download for Windows', shortLabel: 'Windows', url: 'https://drive.usercontent.google.com/download?id=1wsgiWDC8WdaXUS0i5gCZBf33Z8JAekD4&export=download&authuser=0&confirm=t&uuid=9623638f-8abe-4074-ad38-0acff5a589a4&at=AMrWOn2PPkK7pqPvvow5Z64PRT3y:1794246285303' },
      { label: 'Download Android APK', shortLabel: 'Android APK', url: 'https://drive.usercontent.google.com/download?id=1-FSwGwbFk2R3_jMFGfsvuszcDeyjRWyk&export=download&authuser=0&confirm=t&uuid=327889f0-696d-4ad0-9b93-1ef44cbea219&at=AMrWOn22yZMgxFoTrcwR40_bHRVp:1794246271856' },
    ] as { label: string; shortLabel: string; url?: string; comingSoon?: boolean }[],
    screenshots: [
      { thumb: '/assets/apps/project-manager/interface-report-thumb.webp', full: '/assets/apps/project-manager/interface-report.webp' },
      { thumb: '/assets/apps/project-manager/interface-dashboard-thumb.webp', full: '/assets/apps/project-manager/interface-dashboard.webp' },
      { thumb: '/assets/apps/project-manager/interface-settings-thumb.webp', full: '/assets/apps/project-manager/interface-settings.webp' },
    ] as AppScreenshot[],
  },
  {
    slug: 'youtube-pro',
    name: 'YouTube Pro',
    platform: 'Mac, Windows & Android',
    shortPlatform: 'Mac · Windows · Android',
    description: 'A desktop tool for shaping a more organized YouTube content and publishing workflow.',
    icon: '/assets/apps/youtube-pro.webp',
    accent: 'red',
    downloadUrl: null as string | null,
    downloads: [
      {
        label: 'Download for Mac',
        shortLabel: 'Mac',
        url: 'https://drive.usercontent.google.com/download?id=1blqOMGR-K7hXH_k7-8wpAX1lGE6Iup_3&export=download&authuser=0&confirm=t&uuid=ab6c7d49-d2e6-4307-9c94-162d43f76517&at=AMrWOn1MRy_2On2sEIgXnOZSX8M_:1794394015738',
      },
      {
        label: 'Download for Windows',
        shortLabel: 'Windows',
        url: 'https://drive.usercontent.google.com/download?id=1WucFdb6i0Ipy8aDxrBTDm7RBiDAW1GVZ&export=download&authuser=0&confirm=t&uuid=fc3b2a9e-f7e4-4219-8bbb-a59aff332933&at=AMrWOn2jRcedW6GE3Ysp2uQ0sv-x:1794394035082',
      },
      {
        label: 'Android coming soon',
        shortLabel: 'Android',
        comingSoon: true,
      },
      {
        label: 'iOS coming soon',
        shortLabel: 'iOS',
        comingSoon: true,
      },
    ] as { label: string; shortLabel: string; url?: string; comingSoon?: boolean }[],
    screenshots: [
      { thumb: '/assets/apps/youtube-pro/interface-1-thumb.webp', full: '/assets/apps/youtube-pro/interface-1.webp' },
      { thumb: '/assets/apps/youtube-pro/interface-2-thumb.webp', full: '/assets/apps/youtube-pro/interface-2.webp' },
      { thumb: '/assets/apps/youtube-pro/interface-3-thumb.webp', full: '/assets/apps/youtube-pro/interface-3.webp' },
    ] as AppScreenshot[],
  },
  {
    slug: 'thumbnailkit',
    name: 'ThumbnailKit',
    platform: 'Chrome Extension',
    shortPlatform: 'Chrome extension',
    description: 'A browser extension for previewing and comparing YouTube thumbnail options in context.',
    icon: '/assets/apps/thumbnailkit.webp',
    accent: 'violet',
    downloadUrl: 'https://drive.usercontent.google.com/download?id=1AOyyidaLSE4x5N6Q7Fojok_00V4bZ86O&export=download&authuser=0&confirm=t&uuid=53db9dea-7fff-4da9-853d-b416c96de0c2&at=AMrWOn2AyS4bNgIVxVDVFSq3MMGA:1794580984513',
    downloads: [] as { label: string; shortLabel: string; url?: string; comingSoon?: boolean }[],
    screenshots: [
      { thumb: '/assets/apps/thumbnailkit/interface-1-thumb.webp', full: '/assets/apps/thumbnailkit/interface-1.webp' },
      { thumb: '/assets/apps/thumbnailkit/interface-2-thumb.webp', full: '/assets/apps/thumbnailkit/interface-2.webp' },
      { thumb: '/assets/apps/thumbnailkit/interface-3-thumb.webp', full: '/assets/apps/thumbnailkit/interface-3.webp' },
    ] as AppScreenshot[],
  },
  {
    slug: 'behancekit',
    name: 'BehanceKit',
    platform: 'Chrome Extension',
    shortPlatform: 'Chrome extension',
    description: 'A browser extension for collecting and organizing creative references from Behance.',
    icon: '/assets/apps/behancekit.webp',
    accent: 'blue',
    downloadUrl: 'https://drive.usercontent.google.com/download?id=1xDPQCMWxwdozF5ZPkbGajRNFJnSAqRTu&export=download&authuser=0&confirm=t&uuid=2dff4394-9985-4753-bf00-20c4765bad73&at=AMrWOn2Zkesmh2SZ4Ni1xnY48U4Q:1794580969888',
    downloads: [] as { label: string; shortLabel: string; url?: string; comingSoon?: boolean }[],
    screenshots: [
      { thumb: '/assets/apps/behancekit/interface-1-thumb.webp', full: '/assets/apps/behancekit/interface-1.webp' },
      { thumb: '/assets/apps/behancekit/interface-2-thumb.webp', full: '/assets/apps/behancekit/interface-2.webp' },
      { thumb: '/assets/apps/behancekit/interface-3-thumb.webp', full: '/assets/apps/behancekit/interface-3.webp' },
    ] as AppScreenshot[],
  },
];

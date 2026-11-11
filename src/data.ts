export const profile = {
  name: 'YASIN ALI ABIR',
  displayName: 'Yasin Ali Abir',
  title: 'CREATIVE DIRECTOR & DESIGNER',
  displayTitle: 'Creative Director & Designer',
  portrait: '/assets/yasin-portrait-desktop.png',
  mobilePortrait: '/assets/yasin-portrait-mobile.png',
  bio: 'With nearly 7 years in the creative industry, I help brands, businesses, and creators grow through powerful visual content. My work spans creative direction, brand design, content creation, photography, videography, editing, and cinematic storytelling.',
  stats: [
    { value: '12.7K+', label: 'Projects delivered' },
    { value: '7+', label: 'Years of experience' },
    { value: '60+', label: 'Creators & brands supported' },
  ],
  email: 'yasinaliabir@gmail.com',
  whatsappUrl: 'https://wa.me/message/B62I2XEAFVNPN1',
  socials: [
    { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/yasinaliabir.profile/' },
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/yasinaliabir' },
    { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@YasinAliAbir' },
    { id: 'page', label: 'Facebook Page', url: 'https://www.facebook.com/YasinAliAbirProductions' },
  ],
  otherSocials: [
    { id: 'behance', label: 'Behance', url: 'https://www.behance.net/yasinaliabir' },
  ],
};

export const socialCards = [
  { id: 'facebook', name: 'Facebook', url: profile.socials[0].url, icon: '/assets/social/facebook.png' },
  { id: 'page', name: 'Facebook Page', url: profile.socials[3].url, icon: '/assets/social/messenger.png' },
  { id: 'instagram', name: 'Instagram', url: profile.socials[1].url, icon: '/assets/social/instagram.png' },
  { id: 'youtube', name: 'YouTube', url: profile.socials[2].url, icon: '/assets/social/youtube.png' },
  { id: 'behance', name: 'Behance', url: profile.otherSocials.find((social) => social.id === 'behance')?.url ?? '', icon: '/assets/social/behance.png' },
];

export const paymentDetails = {
  bankLogo: '/assets/payment/brac-bank.webp',
  bank: [
    { id: 'account-number', label: 'Account Number', value: '1072393610001' },
    { id: 'account-name', label: 'Account Name', value: 'YASIN ALI ABIR' },
    { id: 'bank-name', label: 'Bank Name', value: 'BRAC Bank PLC' },
    { id: 'branch-name', label: 'Branch Name', value: 'BASHABO BRANCH' },
    { id: 'routing-number', label: 'Routing Number', value: '060262875' },
    { id: 'swift-code', label: 'SWIFT Code', value: 'BRAKBDDH' },
  ],
  wallets: [
    { id: 'bkash', label: 'bKash', value: '01948797435', note: 'Send Money Only', logo: '/assets/payment/bkash.webp' },
    { id: 'paypal', label: 'PayPal', value: 'nazibullah43@gmail.com', logo: '/assets/payment/paypal.webp' },
  ],
};

export const clientPortraits = [
  { id: 'client-01', src: '/assets/gallery/gallery-01.png', placeholder: '' },
  { id: 'client-02', src: '/assets/gallery/gallery-02.webp', placeholder: '' },
  { id: 'client-03', src: '/assets/gallery/gallery-03.jpg', placeholder: '' },
];

export const clientReviews: Array<{
  id: string;
  clientName: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
  category: 'verified' | 'creator' | 'brand';
  imageKind: 'creator' | 'brand';
}> = [
  {
    id: 'test-rafsan', clientName: 'Rafsan TheChotoBhai', role: 'YouTube Creator', company: 'Rafsan TheChotoBhai (2.5M+ Subs)',
    content: 'Yasin is a talented professional and I need eye-catching thumbnails, like strong, visually appealing ones. Yasin excels in that criteria. I would heavily recommend him to other creators.',
    image: '/assets/reviews/creator-5.jpg', rating: 5, category: 'verified', imageKind: 'creator',
  },
  {
    id: 'test-atc', clientName: 'ATC Android To To Company', role: 'Tech & Production Channel', company: 'ATC Android To To Company',
    content: 'Yasin is particularly one of our punctual and professional team members of Android Toto Company. He has been working with us for more than 2 years and we are contented. He always does quality work for us. Yasin makes the best thumbnails for our channel. He also overwhelmed us with our photo designs.',
    image: 'https://yt3.googleusercontent.com/ytc/AIdro_nextcfEo7l5bBFhHGruWTQm33-YiguIfFquZU0FJEdAqc=s160-c-k-c0x00ffffff-no-rj', rating: 5, category: 'verified', imageKind: 'creator',
  },
  {
    id: 'test-tushar', clientName: 'Tushar Bhaiii', role: 'YouTube Creator', company: 'Content & Gaming Channel',
    content: 'This guy has been working for my channel for nearly 2 years and his talent is worth mentioning. Since he started making my thumbnails, my click-through rate has risen significantly. I’m a happy patron.',
    image: '/assets/reviews/creator-9.jpg', rating: 5, category: 'verified', imageKind: 'creator',
  },
  {
    id: 'test-khudalagse', clientName: 'Khudalagse', role: 'YouTube Creator', company: 'Food & Culinary Show (1.5M+ Followers)',
    content: 'Loved working with Yasin. He understands the brief and never fails to deliver. My go-to thumbnail artist!',
    image: '/assets/reviews/creator-10.jpg', rating: 5, category: 'verified', imageKind: 'creator',
  },
  {
    id: 'test-neyon', clientName: 'Neyon & On', role: 'Digital Creator', company: 'Gaming & Entertainment (1.2M+ Subs)',
    content: 'Yasin consistently showcases exceptional talent and consistently meets deadlines with precision. His creative flair extends to enhancing the clickability of thumbnails, demonstrating a proactive approach to optimizing visual content. Engaging in collaboration with Yasin is a guarantee of reliability and quality, making him a top choice. I wholeheartedly recommend him with a perfect 10/10 rating.',
    image: '/assets/reviews/creator-7.jpg', rating: 5, category: 'verified', imageKind: 'creator',
  },
  {
    id: 'test-nick', clientName: 'Nick DiGiovanni', role: 'YouTube Creator', company: '18M+ Subscribers',
    content: 'Yasin just gets thumbnails. I usually give him a rough idea and somehow he turns it into something that actually makes me want to click. Super easy to work with.',
    image: '/assets/reviews/creator-1.png', rating: 5, category: 'creator', imageKind: 'creator',
  },
  {
    id: 'test-salman', clientName: 'Salman Muqtadir', role: 'Content Creator', company: '1.8M+ Followers',
    content: 'I’ve worked with Yasin on quite a few designs, and the consistency is what I like most. He understands the brief, delivers on time, and rarely needs much explanation. Makes life easier.',
    image: '/assets/reviews/creator-2.webp', rating: 5, category: 'creator', imageKind: 'creator',
  },
  {
    id: 'test-ayman', clientName: 'Ayman Sadiq', role: 'Personal Brand & Educator', company: '10 Minute School',
    content: 'Honestly, I didn’t expect the thumbnails to make this much difference. The designs feel much more professional now, and the channel finally has a proper visual identity. Great work from Yasin.',
    image: '/assets/reviews/creator-3.jpg', rating: 5, category: 'creator', imageKind: 'creator',
  },
  {
    id: 'test-munzereen', clientName: 'Munzereen Shahid', role: 'Personal Brand', company: '3.2M+ Subscribers',
    content: 'Yasin is one of those designers you don’t have to explain everything to. Send him the idea, give him some freedom, and he usually comes back with something better than what I had in mind.',
    image: '/assets/reviews/creator-4.jpg', rating: 5, category: 'creator', imageKind: 'creator',
  },
  {
    id: 'test-nadir', clientName: 'Nadir On The Go', role: 'YouTube Creator', company: '1.8M+ Subscribers',
    content: 'Very creative and very reliable. What I appreciate most is that Yasin doesn’t just make things look good, he actually thinks about whether people will want to click on it. That’s a big difference.',
    image: '/assets/reviews/creator-6.jpg', rating: 5, category: 'creator', imageKind: 'creator',
  },
  {
    id: 'test-bkash', clientName: 'bKash', role: 'Fintech Enterprise', company: 'Mobile Financial Services',
    content: 'We’ve worked with Yasin for a long time and he has always been professional with the work. Good communication, fast delivery and most importantly, the quality stays consistent. Definitely someone we can rely on.',
    image: '/assets/reviews/brand-1.jpg', rating: 5, category: 'brand', imageKind: 'brand',
  },
  {
    id: 'test-pizzaburg', clientName: 'Pizzaburg', role: 'Food Chain Brand', company: 'Restaurant & Dining',
    content: 'I sent Yasin a thumbnail with basically no proper direction 😂 and somehow he figured it out. The final design looked clean, clickable and exactly what the video needed. That’s a skill.',
    image: '/assets/reviews/brand-2.jpg', rating: 5, category: 'brand', imageKind: 'brand',
  },
  {
    id: 'test-hitpaw', clientName: 'HitPaw', role: 'AI Software Brand', company: 'Global Multimedia Tools',
    content: 'Yasin has a really good eye for visual hierarchy and storytelling. Even when the brief is complicated, he manages to keep the design simple and easy to understand. Really enjoyed working with him.',
    image: '/assets/reviews/brand-3.png', rating: 5, category: 'brand', imageKind: 'brand',
  },
];

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
      { label: 'Download for Mac', shortLabel: 'Mac', url: 'https://drive.usercontent.google.com/download?id=1NNaP3kiP8_o8Az92hXx25QKHlP3rR-Fd&export=download&authuser=0&confirm=t&uuid=bef5b52d-db6d-49a8-8474-46d61585eee9&at=AMrWOn1GxJeyisYENn5xqa6qv0UM:1794246288829' },
      { label: 'Download for Windows', shortLabel: 'Windows', url: 'https://drive.usercontent.google.com/download?id=1wsgiWDC8WdaXUS0i5gCZBf33Z8JAekD4&export=download&authuser=0&confirm=t&uuid=9623638f-8abe-4074-ad38-0acff5a589a4&at=AMrWOn2PPkK7pqPvvow5Z64PRT3y:1794246285303' },
      { label: 'Download Android APK', shortLabel: 'Android APK', url: 'https://drive.usercontent.google.com/download?id=1-FSwGwbFk2R3_jMFGfsvuszcDeyjRWyk&export=download&authuser=0&confirm=t&uuid=327889f0-696d-4ad0-9b93-1ef44cbea219&at=AMrWOn22yZMgxFoTrcwR40_bHRVp:1794246271856' },
    ] as { label: string; shortLabel: string; url?: string; comingSoon?: boolean }[],
    screenshots: [
      '/assets/apps/project-manager/interface-report.png',
      '/assets/apps/project-manager/interface-dashboard.png',
      '/assets/apps/project-manager/interface-settings.png',
    ] as string[],
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
      '/assets/apps/youtube-pro/interface-1.png',
      '/assets/apps/youtube-pro/interface-2.png',
      '/assets/apps/youtube-pro/interface-3.png',
    ] as string[],
  },
  {
    slug: 'thumbnailkit',
    name: 'ThumbnailKit',
    platform: 'Chrome Extension',
    shortPlatform: 'Chrome extension',
    description: 'A browser extension for previewing and comparing YouTube thumbnail options in context.',
    icon: '/assets/apps/thumbnailkit.webp',
    accent: 'violet',
    downloadUrl: 'https://takeout-download-drive.usercontent.google.com/download/ThumbKit-20261111T104537Z-1-001.zip?j=4126fc3a-4a4a-4154-be33-c81ae071b624&i=0&user=324285920959&authuser=0',
    downloads: [] as { label: string; shortLabel: string; url?: string; comingSoon?: boolean }[],
    screenshots: [
      '/assets/apps/thumbnailkit/interface-1.png',
      '/assets/apps/thumbnailkit/interface-2.png',
      '/assets/apps/thumbnailkit/interface-3.png',
    ] as string[],
  },
  {
    slug: 'behancekit',
    name: 'BehanceKit',
    platform: 'Chrome Extension',
    shortPlatform: 'Chrome extension',
    description: 'A browser extension for collecting and organizing creative references from Behance.',
    icon: '/assets/apps/behancekit.webp',
    accent: 'blue',
    downloadUrl: 'https://drive.usercontent.google.com/download?id=1blqOMGR-K7hXH_k7-8wpAX1lGE6Iup_3&export=download&authuser=0&confirm=t&uuid=ab6c7d49-d2e6-4307-9c94-162d43f76517&at=AMrWOn1MRy_2On2sEIgXnOZSX8M_:1794394015738',
    downloads: [] as { label: string; shortLabel: string; url?: string; comingSoon?: boolean }[],
    screenshots: [
      '/assets/apps/behancekit/interface-1.png',
      '/assets/apps/behancekit/interface-2.png',
      '/assets/apps/behancekit/interface-3.png',
    ] as string[],
  },
];

export const courses = [
  {
    category: 'Introduction To Design',
    videos: [
      { title: 'What is Graphic Design?', id: 'khJk9mHlI7Y' },
      { title: 'How To Become a Designer?', id: 'nFKkpzxBmIg' },
      { title: 'Advance Design Guideline', id: 'r4mk8eeRO5M' },
    ],
  },
  {
    category: 'Photoshop Basics',
    videos: [
      { title: 'Photoshop Interface Overview', id: 'G7bFlKaAWnQ' },
      { title: 'Photoshop Tools Introduction', id: '5trin1vZo6Q' },
      { title: 'Understanding Layers & Masks', id: 'lKpc4ydBjz4' },
    ],
  },
  {
    category: 'Design Elements Collect',
    videos: [
      { title: 'Finding Pictures from Sites', id: '8BwaU7fdmG4' },
      { title: 'Finding Resources from Sites', id: 'yPCju4V4-7w' },
      { title: 'Finding Design Ideas & Executing', id: 'BST_FXeC3kw' },
    ],
  },
  {
    category: 'AI Tools in Design',
    videos: [
      { title: 'AI Tools For Design', id: '4VhXr_Ez-Ko' },
      { title: 'Use Of AI Tools', id: 'smHdOh6oSCM' },
    ],
  },
  {
    category: 'Designing Steps',
    videos: [
      { title: 'Subject Cut & Background Remove', id: 'Jk4VVH9Gr_4' },
      { title: 'Professional Face Retouching', id: 'LWBYIDyoBL0' },
      { title: 'Realistic Highlights & Shadow', id: '2h7bTE0LlDA' },
      { title: 'Adding Colorful Glow Highlights', id: 'orTHX2jPvj4' },
      { title: 'Picture Color Balance', id: '_JwBOSmuZn8' },
      { title: 'Mastering Manipulation Like a Pro', id: 'hH6iprRDunk' },
    ],
  },
  {
    category: 'Social Media Design',
    videos: [
      { title: 'Media Ads Design', id: 'HeaHaPOY6ho' },
      { title: 'Sports Poster Design', id: 'Bi9lZOdqg_w' },
      { title: 'Thumbnail Design', id: 'pT-S8s9GUAQ' },
      { title: 'Drama Poster Design', id: 'uE9keXGMfxY' },
      { title: 'Movie Poster Design', id: '4orlOPUM3E0' },
    ],
  },
];

export const courseHighlights = [
  { title: 'Photoshop Mastery', description: 'Master Adobe Photoshop from interface basics to advanced manipulation techniques.' },
  { title: 'AI-Powered Design', description: 'Learn cutting-edge AI tools that supercharge your creative design workflow.' },
  { title: 'Social Media Design', description: 'Create stunning ads, posters, thumbnails, and movie poster designs.' },
  { title: 'Design Fundamentals', description: 'Build a rock-solid foundation in graphic design theory and practice.' },
  { title: 'Pro Techniques', description: 'Advanced retouching, color grading, manipulation, and lighting effects.' },
];

export const works = [
  {
    slug: 'tech-thumbnail-atc',
    title: 'Tech Thumbnail Design — ATC',
    category: 'Thumbnail design',
    image: '/assets/works/tech-thumbnail-atc.png',
    href: 'https://www.behance.net/gallery/255814515/Tech-Thumbnail-Design-ATC',
  },
  {
    slug: 'graphic-design-portfolio',
    title: 'Graphic Design Portfolio',
    category: 'Graphic design',
    image: '/assets/works/graphic-design-portfolio.jpg',
    href: 'https://www.behance.net/gallery/209047187/Graphic-Design-Portfolio-YASIN-ALI-ABIR',
  },
  {
    slug: 'fifa-world-cup-thumbnail',
    title: 'FIFA World Cup — Live Match',
    category: 'Thumbnail design',
    image: '/assets/works/fifa-world-cup-thumbnail.jpg',
    href: 'https://www.behance.net/gallery/251223097/Thumbnail-Design-FIFA-WORLD-CUP-LIVE-MATCH',
  },
];

// Images are supplied by the existing portfolio package. Names are intentionally omitted in the UI.
export const gallery = [
  { src: '/assets/gallery/gallery-01.png', type: 'portrait' },
  { src: '/assets/gallery/gallery-02.webp', type: 'portrait' },
  { src: '/assets/gallery/gallery-03.jpg', type: 'portrait' },
  { src: '/assets/gallery/gallery-04.jpg', type: 'portrait' },
  { src: '/assets/gallery/gallery-05.jpg', type: 'portrait' },
  { src: '/assets/gallery/gallery-06.jpg', type: 'portrait' },
  { src: '/assets/gallery/gallery-07.jpg', type: 'portrait' },
  { src: '/assets/gallery/gallery-08.jpg', type: 'portrait' },
  { src: '/assets/gallery/gallery-09.jpg', type: 'portrait' },
  { src: '/assets/gallery/gallery-10.jpg', type: 'portrait' },
  { src: '/assets/gallery/gallery-11.png', type: 'logo' },
  { src: '/assets/gallery/gallery-12.jpg', type: 'logo' },
  { src: '/assets/gallery/gallery-13.png', type: 'logo' },
  { src: '/assets/gallery/gallery-14.jpg', type: 'logo' },
  { src: '/assets/gallery/gallery-15.webp', type: 'logo' },
  { src: '/assets/gallery/gallery-16.jpg', type: 'logo' },
  { src: '/assets/gallery/gallery-17.png', type: 'logo' },
  { src: '/assets/gallery/gallery-18.webp', type: 'logo' },
  { src: '/assets/gallery/gallery-19.jpg', type: 'logo' },
];

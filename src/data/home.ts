export const profile = {
  name: 'YASIN ALI ABIR',
  displayName: 'Yasin Ali Abir',
  title: 'CREATIVE DIRECTOR & DESIGNER',
  displayTitle: 'Creative Director & Designer',
  portrait: '/assets/yasin-portrait-desktop.webp',
  portraitSrcSet: '/assets/yasin-portrait-desktop-640.webp 640w, /assets/yasin-portrait-desktop.webp 1000w',
  mobilePortrait: '/assets/yasin-portrait-mobile.webp',
  mobilePortraitSrcSet: '/assets/yasin-portrait-mobile-540.webp 540w, /assets/yasin-portrait-mobile.webp 844w',
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
  { id: 'facebook', name: 'Facebook', url: profile.socials[0].url, icon: '/assets/social/facebook.webp' },
  { id: 'page', name: 'Facebook Page', url: profile.socials[3].url, icon: '/assets/social/messenger.webp' },
  { id: 'instagram', name: 'Instagram', url: profile.socials[1].url, icon: '/assets/social/instagram.webp' },
  { id: 'youtube', name: 'YouTube', url: profile.socials[2].url, icon: '/assets/social/youtube.webp' },
  { id: 'behance', name: 'Behance', url: profile.otherSocials.find((social) => social.id === 'behance')?.url ?? '', icon: '/assets/social/behance.webp' },
];

export const clientPortraits = [
  { id: 'client-01', src: '/assets/gallery/gallery-01-sm.webp', placeholder: '' },
  { id: 'client-02', src: '/assets/gallery/gallery-02-sm.webp', placeholder: '' },
  { id: 'client-03', src: '/assets/gallery/gallery-03-sm.webp', placeholder: '' },
];

export const appSummaries = [
  {
    slug: 'project-manager',
    name: 'Project Manager',
    shortPlatform: 'Mac · Windows · Android',
    icon: '/assets/apps/project-manager.webp',
    accent: 'rose',
  },
  {
    slug: 'youtube-pro',
    name: 'YouTube Pro',
    shortPlatform: 'Mac · Windows · Android',
    icon: '/assets/apps/youtube-pro.webp',
    accent: 'red',
  },
  {
    slug: 'thumbnailkit',
    name: 'ThumbnailKit',
    shortPlatform: 'Chrome extension',
    icon: '/assets/apps/thumbnailkit.webp',
    accent: 'violet',
  },
  {
    slug: 'behancekit',
    name: 'BehanceKit',
    shortPlatform: 'Chrome extension',
    icon: '/assets/apps/behancekit.webp',
    accent: 'blue',
  },
] as const;

// Images are supplied by the existing portfolio package. Names are intentionally omitted in the UI.
export const gallery = [
  { src: '/assets/gallery/gallery-01.webp', type: 'portrait' },
  { src: '/assets/gallery/gallery-02.webp', type: 'portrait' },
  { src: '/assets/gallery/gallery-03.webp', type: 'portrait' },
  { src: '/assets/gallery/gallery-04.webp', type: 'portrait' },
  { src: '/assets/gallery/gallery-05.webp', type: 'portrait' },
  { src: '/assets/gallery/gallery-06.webp', type: 'portrait' },
  { src: '/assets/gallery/gallery-07.webp', type: 'portrait' },
  { src: '/assets/gallery/gallery-08.webp', type: 'portrait' },
  { src: '/assets/gallery/gallery-09.webp', type: 'portrait' },
  { src: '/assets/gallery/gallery-10.webp', type: 'portrait' },
  { src: '/assets/gallery/gallery-11.webp', type: 'logo' },
  { src: '/assets/gallery/gallery-12.webp', type: 'logo' },
  { src: '/assets/gallery/gallery-13.webp', type: 'logo' },
  { src: '/assets/gallery/gallery-14.webp', type: 'logo' },
  { src: '/assets/gallery/gallery-15.webp', type: 'logo' },
  { src: '/assets/gallery/gallery-16.webp', type: 'logo' },
  { src: '/assets/gallery/gallery-17.webp', type: 'logo' },
  { src: '/assets/gallery/gallery-18.webp', type: 'logo' },
  { src: '/assets/gallery/gallery-19.webp', type: 'logo' },
] as const;

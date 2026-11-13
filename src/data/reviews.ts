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
    image: '/assets/reviews/creator-5.webp', rating: 5, category: 'verified', imageKind: 'creator',
  },
  {
    id: 'test-atc', clientName: 'ATC Android To To Company', role: 'Tech & Production Channel', company: 'ATC Android To To Company',
    content: 'Yasin is particularly one of our punctual and professional team members of Android Toto Company. He has been working with us for more than 2 years and we are contented. He always does quality work for us. Yasin makes the best thumbnails for our channel. He also overwhelmed us with our photo designs.',
    image: 'https://yt3.googleusercontent.com/ytc/AIdro_nextcfEo7l5bBFhHGruWTQm33-YiguIfFquZU0FJEdAqc=s160-c-k-c0x00ffffff-no-rj', rating: 5, category: 'verified', imageKind: 'creator',
  },
  {
    id: 'test-tushar', clientName: 'Tushar Bhaiii', role: 'YouTube Creator', company: 'Content & Gaming Channel',
    content: 'This guy has been working for my channel for nearly 2 years and his talent is worth mentioning. Since he started making my thumbnails, my click-through rate has risen significantly. I’m a happy patron.',
    image: '/assets/reviews/creator-9.webp', rating: 5, category: 'verified', imageKind: 'creator',
  },
  {
    id: 'test-khudalagse', clientName: 'Khudalagse', role: 'YouTube Creator', company: 'Food & Culinary Show (1.5M+ Followers)',
    content: 'Loved working with Yasin. He understands the brief and never fails to deliver. My go-to thumbnail artist!',
    image: '/assets/reviews/creator-10.webp', rating: 5, category: 'verified', imageKind: 'creator',
  },
  {
    id: 'test-neyon', clientName: 'Neyon & On', role: 'Digital Creator', company: 'Gaming & Entertainment (1.2M+ Subs)',
    content: 'Yasin consistently showcases exceptional talent and consistently meets deadlines with precision. His creative flair extends to enhancing the clickability of thumbnails, demonstrating a proactive approach to optimizing visual content. Engaging in collaboration with Yasin is a guarantee of reliability and quality, making him a top choice. I wholeheartedly recommend him with a perfect 10/10 rating.',
    image: '/assets/reviews/creator-7.webp', rating: 5, category: 'verified', imageKind: 'creator',
  },
  {
    id: 'test-nick', clientName: 'Nick DiGiovanni', role: 'YouTube Creator', company: '18M+ Subscribers',
    content: 'Yasin just gets thumbnails. I usually give him a rough idea and somehow he turns it into something that actually makes me want to click. Super easy to work with.',
    image: '/assets/reviews/creator-1.webp', rating: 5, category: 'creator', imageKind: 'creator',
  },
  {
    id: 'test-salman', clientName: 'Salman Muqtadir', role: 'Content Creator', company: '1.8M+ Followers',
    content: 'I’ve worked with Yasin on quite a few designs, and the consistency is what I like most. He understands the brief, delivers on time, and rarely needs much explanation. Makes life easier.',
    image: '/assets/reviews/creator-2.webp', rating: 5, category: 'creator', imageKind: 'creator',
  },
  {
    id: 'test-ayman', clientName: 'Ayman Sadiq', role: 'Personal Brand & Educator', company: '10 Minute School',
    content: 'Honestly, I didn’t expect the thumbnails to make this much difference. The designs feel much more professional now, and the channel finally has a proper visual identity. Great work from Yasin.',
    image: '/assets/reviews/creator-3.webp', rating: 5, category: 'creator', imageKind: 'creator',
  },
  {
    id: 'test-munzereen', clientName: 'Munzereen Shahid', role: 'Personal Brand', company: '3.2M+ Subscribers',
    content: 'Yasin is one of those designers you don’t have to explain everything to. Send him the idea, give him some freedom, and he usually comes back with something better than what I had in mind.',
    image: '/assets/reviews/creator-4.webp', rating: 5, category: 'creator', imageKind: 'creator',
  },
  {
    id: 'test-nadir', clientName: 'Nadir On The Go', role: 'YouTube Creator', company: '1.8M+ Subscribers',
    content: 'Very creative and very reliable. What I appreciate most is that Yasin doesn’t just make things look good, he actually thinks about whether people will want to click on it. That’s a big difference.',
    image: '/assets/reviews/creator-6.webp', rating: 5, category: 'creator', imageKind: 'creator',
  },
  {
    id: 'test-bkash', clientName: 'bKash', role: 'Fintech Enterprise', company: 'Mobile Financial Services',
    content: 'We’ve worked with Yasin for a long time and he has always been professional with the work. Good communication, fast delivery and most importantly, the quality stays consistent. Definitely someone we can rely on.',
    image: '/assets/reviews/brand-1.webp', rating: 5, category: 'brand', imageKind: 'brand',
  },
  {
    id: 'test-pizzaburg', clientName: 'Pizzaburg', role: 'Food Chain Brand', company: 'Restaurant & Dining',
    content: 'I sent Yasin a thumbnail with basically no proper direction 😂 and somehow he figured it out. The final design looked clean, clickable and exactly what the video needed. That’s a skill.',
    image: '/assets/reviews/brand-2.webp', rating: 5, category: 'brand', imageKind: 'brand',
  },
  {
    id: 'test-hitpaw', clientName: 'HitPaw', role: 'AI Software Brand', company: 'Global Multimedia Tools',
    content: 'Yasin has a really good eye for visual hierarchy and storytelling. Even when the brief is complicated, he manages to keep the design simple and easy to understand. Really enjoyed working with him.',
    image: '/assets/reviews/brand-3.webp', rating: 5, category: 'brand', imageKind: 'brand',
  },
];

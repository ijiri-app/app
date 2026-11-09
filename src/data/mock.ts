// TODO: API 연동 전 목업 데이터 (Figma "07 Feed" 카드 기준)
export type FeedPost = {
  id: string;
  year: number;
  car: string;
  partCount: number;
  image: number;
  /** 카드 이미지 높이 (Figma: 대부분 176, 일부 181) */
  imageHeight: number;
};

const BASE: Omit<FeedPost, 'id'>[] = [
  { year: 2023, car: '아반떼 N', partCount: 5, image: require('@/assets/mock/feed-1.jpg'), imageHeight: 176 },
  { year: 2017, car: 'M4', partCount: 7, image: require('@/assets/mock/feed-2.jpg'), imageHeight: 176 },
  { year: 2008, car: 'M3', partCount: 14, image: require('@/assets/mock/feed-3.jpg'), imageHeight: 176 },
  { year: 2021, car: '쏘나타', partCount: 32, image: require('@/assets/mock/feed-4.jpg'), imageHeight: 181 },
  { year: 2013, car: '에쿠스', partCount: 19, image: require('@/assets/mock/feed-5.jpg'), imageHeight: 176 },
  { year: 2011, car: '제네시스 쿠페', partCount: 9, image: require('@/assets/mock/feed-6.jpg'), imageHeight: 176 },
  { year: 2021, car: '아반떼 N', partCount: 3, image: require('@/assets/mock/feed-7.jpg'), imageHeight: 176 },
  { year: 2013, car: '제네시스 쿠페', partCount: 23, image: require('@/assets/mock/feed-8.jpg'), imageHeight: 176 },
];

export const FEED_POSTS: FeedPost[] = Array.from({ length: 24 }, (_, i) => ({
  ...BASE[i % BASE.length],
  id: String(i + 1),
}));

export const INTEREST_CARS = ['아반떼 N', 'M4', '제네시스 쿠페'];
export const STYLE_TAGS = ['전체', '데일리', '서킷', '스탠스', 'VIP', '순정', '드래그'];

export type Part = { id: string; name: string; category: 'ext' | 'int' | 'pwr' | 'und' };

export const POST_DETAIL = {
  author: { id: 'j._.hyuxg', nickname: 'j._.hyuxg', avatar: require('@/assets/mock/avatar-1.jpg') },
  car: '쏘나타',
  year: 2021,
  style: 'VIP',
  daysAgo: 3,
  title: '논산 PONY카페벙 개인샷',
  body: '언제봐도 포스 멋있는 주형이차📸\n조사장님 나이스샷~!',
  tags: ['sonata', 'airsuspension', 'airsus', '에어서스펜션', '에어서스'],
  likes: 0,
  comments: 0,
  images: [
    require('@/assets/mock/feed-4.jpg'),
    require('@/assets/mock/post-2.jpg'),
    require('@/assets/mock/post-3.jpg'),
  ],
  partCount: 32,
  parts: [
    { id: 'front-lip', name: '프론트 립', category: 'ext' },
    { id: 'garcon', name: '가르송 방향제', category: 'int' },
    { id: 'methanol', name: '메탄킷', category: 'pwr' },
    { id: '24g-turbo', name: '24G 터보', category: 'pwr' },
    { id: 'jun-fitted', name: 'JUN-FITTED 에어서스', category: 'und' },
    { id: 'work-wheel', name: 'Work 휠', category: 'und' },
  ] as Part[],
};

export const RECENT_MEMBERS = [
  { id: 'avante.n.blue', nickname: 'avante.n.blue', meta: '아반떼 N · 2022 · 데일리', avatar: require('@/assets/mock/avatar-2.jpg') },
  { id: 'cn7.daily', nickname: 'cn7.daily', meta: '아반떼 N · 2023 · 스탠스', avatar: require('@/assets/mock/avatar-3.jpg') },
  { id: 'avante_ad_sport', nickname: 'avante_ad_sport', meta: '아반떼 스포츠 · 2016 · 서킷', avatar: require('@/assets/mock/avatar-4.jpg') },
];

export const RECENT_KEYWORDS = ['TE37', '네오테크 네오 스트릿'];

export const POPULAR_PARTS = [
  { id: 'rays-te37', name: 'RAYS TE37', type: '휠' },
  { id: 'storm-spring', name: 'STORM 다운스프링', type: '코일오버' },
  { id: 'neotech-nf6p', name: 'Neotech NF 6P', type: '브레이크' },
  { id: 'maintec-exhaust', name: 'MAINTEC 배기', type: '배기' },
  { id: 'bbs-zr', name: 'BBS ZR', type: '휠' },
];

export type SearchResult =
  | { kind: 'car'; id: string; title: string; image: number; imageHeight?: number }
  | { kind: 'part'; id: string; title: string; image: number };

export const SEARCH_RESULTS: SearchResult[] = [
  { kind: 'car', id: '7', title: '2021•아반떼 N', image: require('@/assets/mock/feed-7.jpg') },
  { kind: 'part', id: 'te37-saga-s-plus', title: 'TE37 SAGA S-plus', image: require('@/assets/mock/part-1.jpg') },
  { kind: 'part', id: 'te37-sl', title: 'TE37 SL', image: require('@/assets/mock/part-2.jpg') },
  { kind: 'part', id: 'te37-saga-sl-mspec', title: 'TE37 SAGA SL M-SPEC', image: require('@/assets/mock/part-3.jpg') },
  { kind: 'part', id: 'te37-ultra', title: 'TE37 ULTRA', image: require('@/assets/mock/part-4.jpg') },
  { kind: 'car', id: '4', title: '2021•쏘나타', image: require('@/assets/mock/feed-4.jpg') },
  { kind: 'car', id: '8', title: '2013•제네시스 쿠페', image: require('@/assets/mock/feed-8.jpg') },
  { kind: 'part', id: 'te37-sonic', title: 'TE37 SONIC', image: require('@/assets/mock/part-5.jpg') },
  { kind: 'part', id: 'te37-xt', title: 'TE37 XT', image: require('@/assets/mock/part-6.jpg') },
];

import type { ImagePost, User } from "./types";

export const MOCK_USERS: User[] = [
  { id: 'user1', name: 'Alice', avatarUrl: 'https://placehold.co/40x40/94D6C5/1e293b?text=A' },
  { id: 'user2', name: 'Bob', avatarUrl: 'https://placehold.co/40x40/77A1D3/ffffff?text=B' },
  { id: 'user3', name: 'Charlie', avatarUrl: 'https://placehold.co/40x40/F0F8F7/1e293b?text=C' },
];

export const MOCK_CURRENT_USER: User = MOCK_USERS[0];

export const MOCK_IMAGES: ImagePost[] = [
  {
    id: 'img1',
    imageUrl: 'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
    name: 'Image Optimization',
    tags: ['seo', 'images', 'optimisation'],
    userId: 'user1',
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    likes: 12,
  },
  {
    id: 'img2',
    imageUrl: 'https://placehold.co/600x600/77A1D3/FFFFFF',
    name: 'Blue Serenity',
    tags: ['calm', 'blue', 'water'],
    userId: 'user2',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 45,
  },
  {
    id: 'img3',
    imageUrl: 'https://placehold.co/600x600/f87171/FFFFFF',
    name: 'Red Passion',
    tags: ['vibrant', 'red', 'energy'],
    userId: 'user1',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    likes: 130,
  },
  {
    id: 'img4',
    imageUrl: 'https://placehold.co/600x600/fbbf24/FFFFFF',
    name: 'Golden Hour',
    tags: ['nature', 'sunset', 'warm'],
    userId: 'user3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    likes: 78,
  },
  {
    id: 'img5',
    imageUrl: 'https://placehold.co/600x600/34d399/FFFFFF',
    name: 'Forest Canopy',
    tags: ['nature', 'green', 'forest'],
    userId: 'user2',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    likes: 204,
  },
  {
    id: 'img6',
    imageUrl: 'https://placehold.co/600x600/818cf8/FFFFFF',
    name: 'Lavender Fields',
    tags: ['nature', 'purple', 'flowers'],
    userId: 'user1',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    likes: 99,
  },
   {
    id: 'img7',
    imageUrl: 'https://placehold.co/600x600/a78bfa/FFFFFF',
    name: 'City Lights',
    tags: ['cityscape', 'night', 'urban'],
    userId: 'user3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    likes: 310,
  },
  {
    id: 'img8',
    imageUrl: 'https://placehold.co/600x600/f472b6/FFFFFF',
    name: 'Ocean Waves',
    tags: ['beach', 'ocean', 'blue'],
    userId: 'user2',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    likes: 152,
  },
   {
    id: 'img9',
    imageUrl: 'https://placehold.co/600x600/4ade80/FFFFFF',
    name: 'Mountain Peak',
    tags: ['mountains', 'hiking', 'nature'],
    userId: 'user1',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
    likes: 420,
  },
   {
    id: 'img10',
    imageUrl: 'https://placehold.co/600x600/fb923c/FFFFFF',
    name: 'Autumn Leaves',
    tags: ['autumn', 'forest', 'orange'],
    userId: 'user3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    likes: 280,
  },
];

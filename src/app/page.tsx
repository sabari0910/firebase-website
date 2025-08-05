"use client";

import { useState, useEffect, useMemo } from 'react';
import type { ImagePost, User } from '@/lib/types';
import { MOCK_IMAGES, MOCK_USERS, MOCK_CURRENT_USER } from '@/lib/mock-data';
import Header from '@/components/header';
import ImageCard from '@/components/image-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Home() {
  const [images, setImages] = useState<ImagePost[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching data
    setImages(MOCK_IMAGES);
    const usersMap = MOCK_USERS.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {} as Record<string, User>);
    setUsers(usersMap);
  }, []);

  const handleAddImage = (newImage: Omit<ImagePost, 'id' | 'createdAt' | 'likes'>) => {
    const fullNewImage: ImagePost = {
      ...newImage,
      id: `img${images.length + 1}`,
      createdAt: new Date(),
      likes: 0,
    };
    setImages(prevImages => [fullNewImage, ...prevImages]);
  };

  const handleDeleteImage = (imageId: string) => {
    setImages(prevImages => prevImages.filter(image => image.id !== imageId));
  };

  const filteredImages = useMemo(() => {
    if (!searchTerm) {
      return images;
    }
    return images.filter(image =>
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      image.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [images, searchTerm]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onImageUploaded={handleAddImage} currentUser={MOCK_CURRENT_USER} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-headline font-bold text-center mb-4">Discover & Share</h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Explore a vibrant collection of images shared by our community. Use the search below to filter by tags or names.
        </p>
        
        <div className="relative mb-8 max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by tags or name..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredImages.map(image => (
              <ImageCard
                key={image.id}
                image={image}
                uploader={users[image.userId]}
                currentUser={MOCK_CURRENT_USER}
                onDelete={handleDeleteImage}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">No Images Found</h2>
            <p className="text-muted-foreground">Try adjusting your search or upload a new image!</p>
          </div>
        )}
      </main>
      <footer className="text-center py-4 border-t">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Image Showcase. All rights reserved.</p>
      </footer>
    </div>
  );
}

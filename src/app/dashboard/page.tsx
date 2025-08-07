
"use client";

import { useState, useEffect, useMemo } from 'react';
import type { ImagePost, User } from '@/lib/types';
import { MOCK_IMAGES, MOCK_USERS, MOCK_CURRENT_USER } from '@/lib/mock-data';
import Header from '@/components/header';
import ImageCard from '@/components/image-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function DashboardPage() {
  const [images, setImages] = useState<ImagePost[]>(MOCK_IMAGES);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching data
    const usersMap = MOCK_USERS.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {} as Record<string, User>);
    usersMap[MOCK_CURRENT_USER.id] = MOCK_CURRENT_USER;
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
    <>
      <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Image Gallery</h1>
          <Header onImageUploaded={handleAddImage} currentUser={MOCK_CURRENT_USER} />
      </div>

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

      <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        >
        
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
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
      </div>
    </>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { UploadDialog } from "./upload-dialog";
import { Logo } from "./icons";
import type { ImagePost, User } from "@/lib/types";

interface HeaderProps {
  onImageUploaded: (newImage: Omit<ImagePost, 'id' | 'createdAt' | 'likes'>) => void;
  currentUser: User | null;
}

export default function Header({ onImageUploaded, currentUser }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Logo className="h-8 w-8 mr-2 text-primary" />
          <span className="font-headline text-xl font-bold">Image Showcase</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {currentUser ? (
              <>
                <UploadDialog onImageUploaded={onImageUploaded} currentUser={currentUser} />
                <Button variant="ghost">Logout</Button>
              </>
            ) : (
              <>
                <Button variant="ghost">Login</Button>
                <Button>Sign Up</Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}


"use client";

import { Button } from "@/components/ui/button";
import { UploadDialog } from "./upload-dialog";
import type { ImagePost, User } from "@/lib/types";

interface HeaderProps {
  onImageUploaded: (newImage: Omit<ImagePost, 'id' | 'createdAt' | 'likes'>) => void;
  currentUser: User | null;
}

export default function Header({ onImageUploaded, currentUser }: HeaderProps) {
  return (
    <>
        {currentUser ? (
          <>
            <UploadDialog onImageUploaded={onImageUploaded} currentUser={currentUser} />
          </>
        ) : (
          <>
            <Button variant="ghost">Login</Button>
            <Button>Sign Up</Button>
          </>
        )}
    </>
  );
}

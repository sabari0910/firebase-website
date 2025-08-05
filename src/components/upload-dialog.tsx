"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Upload, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";
import { suggestImageTags } from "@/ai/flows/suggest-image-tags";
import { uploadImageAction } from "@/app/actions";
import type { ImagePost, User } from "@/lib/types";

interface UploadDialogProps {
  onImageUploaded: (newImage: Omit<ImagePost, 'id' | 'createdAt' | 'likes'>) => void;
  currentUser: User;
}

export function UploadDialog({ onImageUploaded, currentUser }: UploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setImageUrl("");
    setName("");
    setTags([]);
    setTagInput("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSuggestTags = async () => {
    if (!imageUrl) {
      toast({
        variant: "destructive",
        title: "No Image URL",
        description: "Please enter an image URL to suggest tags.",
      });
      return;
    }
    setIsSuggesting(true);
    try {
      const result = await suggestImageTags({ imageUrl });
      const newTags = result.tags.filter(t => !tags.includes(t));
      setTags(prev => [...prev, ...newTags]);
      toast({
        title: "Tags Suggested!",
        description: "We've added some AI-powered tags for you."
      });
    } catch (error) {
      console.error("Error suggesting tags:", error);
      toast({
        variant: "destructive",
        title: "Suggestion Failed",
        description: "Could not suggest tags for this image.",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl || !name || tags.length === 0) {
      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description: "Please fill out all fields and add at least one tag.",
      });
      return;
    }

    setIsUploading(true);
    const result = await uploadImageAction({
      name,
      imageUrl,
      tags,
      userId: currentUser.id,
    });
    setIsUploading(false);

    if (result.success) {
      toast({
        title: "Image Uploaded!",
        description: "Your image is now live in the gallery.",
      });
      if (result.data) {
        onImageUploaded(result.data);
      }
      setOpen(false);
      resetForm();
    } else {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-headline">Upload an Image</DialogTitle>
            <DialogDescription>
              Share an image with the community by providing its URL.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-url" className="text-right">
                Image URL
              </Label>
              <Input
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="col-span-3"
                placeholder="https://example.com/image.png"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="e.g. 'Majestic Mountains'"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="tags" className="text-right pt-2">
                Tags
              </Label>
              <div className="col-span-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5">
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type a tag and press Enter"
                />
                 <Button type="button" variant="outline" size="sm" onClick={handleSuggestTags} disabled={isSuggesting || !imageUrl} className="mt-2">
                  {isSuggesting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Suggest with AI
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isUploading}>
              {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload Image
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

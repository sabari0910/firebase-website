
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Camera, RefreshCcw, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const filters = [
  { name: 'None', style: 'none' },
  { name: 'Grayscale', style: 'grayscale(100%)' },
  { name: 'Sepia', style: 'sepia(100%)' },
  { name: 'Invert', style: 'invert(100%)' },
  { name: 'Contrast', style: 'contrast(200%)' },
  { name: 'Blur', style: 'blur(5px)' },
  { name: 'Saturate', style: 'saturate(200%)' },
];

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [activeFilter, setActiveFilter] = useState('none');
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
         toast({
          variant: 'destructive',
          title: 'Camera Not Supported',
          description: 'Your browser does not support camera access.',
        });
        setHasCameraPermission(false);
        return;
      }
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
      // Cleanup: stop video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [toast]);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
       <div className="flex items-center gap-2">
         <Camera className="w-8 h-8" />
         <h1 className="text-3xl font-bold font-headline">Live Camera Feed</h1>
      </div>
       <Card className="w-full max-w-4xl shadow-lg">
        <CardContent className="p-4">
          <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
             <video 
                ref={videoRef} 
                className={cn("w-full h-full object-cover transition-all duration-300", hasCameraPermission === false && "blur-sm")} 
                autoPlay 
                muted 
                playsInline
                style={{ filter: activeFilter }}
              />

            {hasCameraPermission === null && (
               <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <RefreshCcw className="w-8 h-8 animate-spin text-muted-foreground" />
                  <p className="ml-2">Initializing Camera...</p>
               </div>
            )}
            
            {hasCameraPermission === false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive/80 text-destructive-foreground p-4">
                  <XCircle className="w-12 h-12 mb-4" />
                  <AlertTitle className="text-xl font-bold">Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access in your browser to use this feature.
                  </AlertDescription>
                </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-center mb-4">Apply a Filter</h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
            {filters.map(filter => (
                <Button 
                    key={filter.name} 
                    variant={activeFilter === filter.style ? 'default' : 'outline'}
                    onClick={() => setActiveFilter(filter.style)}
                    disabled={!hasCameraPermission}
                >
                    {filter.name}
                </Button>
            ))}
        </div>
      </div>
    </div>
  );
}

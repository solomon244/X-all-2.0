import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PhotoMemoriesProps {
  restaurantName: string;
  occasionDate: string;
}

const PhotoMemories: React.FC<PhotoMemoriesProps> = ({ restaurantName, occasionDate }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const shareToSocial = (platform: 'facebook' | 'instagram') => {
    const text = `Had an amazing time at ${restaurantName}! 🍽️✨`;
    const url = window.location.href;

    if (platform === 'facebook') {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
        '_blank'
      );
    } else if (platform === 'instagram') {
      // Since Instagram doesn't have a direct share URL, we'll show instructions
      alert('To share on Instagram:\n1. Screenshot this page\n2. Open Instagram\n3. Create a new post with the screenshot');
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-2xl font-semibold">Capture Memories</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="photo-upload">Upload Photos</Label>
          <Input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2"
          />
        </div>

        {selectedImage && (
          <div className="mt-4">
            <img
              src={selectedImage}
              alt="Uploaded memory"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Share Memory</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share your memory</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4 p-4">
                <Button 
                  onClick={() => shareToSocial('facebook')}
                  className="bg-[#1877F2] hover:bg-[#0d6efd]"
                >
                  Share on Facebook
                </Button>
                <Button 
                  onClick={() => shareToSocial('instagram')}
                  className="bg-[#E4405F] hover:bg-[#d62e55]"
                >
                  Share on Instagram
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
};

export default PhotoMemories;
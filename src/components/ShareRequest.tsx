import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShareRequestProps {
  requestDetails: {
    eventName: string;
    dateTime: string;
    location: string;
  };
  onShare: () => void;
}

const ShareRequest: React.FC<ShareRequestProps> = ({ requestDetails, onShare }) => {
  const shareText = `Join me for ${requestDetails.eventName} at ${requestDetails.location} on ${requestDetails.dateTime}!`;
  
  const handleDirectShare = () => {
    // Handle direct share through the app
    onShare();
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
    onShare();
  };

  const handleMessengerShare = () => {
    const messengerUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(window.location.href)}&app_id=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(window.location.href)}`;
    window.open(messengerUrl, '_blank');
    onShare();
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank');
    onShare();
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Share Request</h2>
      <div className="space-y-4">
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Event Details</p>
          <p className="font-medium">{requestDetails.eventName}</p>
          <p className="text-sm text-gray-600">{requestDetails.dateTime}</p>
          <p className="text-sm text-gray-600">{requestDetails.location}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            className="w-full bg-primary"
            onClick={handleDirectShare}
          >
            Send Request Directly
          </Button>

          <Button 
            className="w-full bg-[#25D366] hover:bg-[#128C7E]"
            onClick={handleWhatsAppShare}
          >
            Share via WhatsApp
          </Button>

          <Button 
            className="w-full bg-[#0084FF] hover:bg-[#0063CC]"
            onClick={handleMessengerShare}
          >
            Share via Messenger
          </Button>

          <Button 
            className="w-full bg-[#1877F2] hover:bg-[#0C5DC7]"
            onClick={handleFacebookShare}
          >
            Share via Facebook
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500 mt-4">
          Choose how you want to share this request
        </div>
      </div>
    </Card>
  );
};

export default ShareRequest;
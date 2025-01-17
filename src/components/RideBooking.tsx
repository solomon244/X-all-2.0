import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TripStatusNotification } from "./TripStatusNotification";

declare global {
  interface Window {
    uber_widget: any;
  }
}

interface RideBookingProps {
  meetingTime: string;
  destination: string;
  onRideBooked: () => void;
}

const RideBooking = ({ meetingTime, destination, onRideBooked }: RideBookingProps) => {
  const [selectedService, setSelectedService] = React.useState<string>("");
  const [estimatedPrice, setEstimatedPrice] = React.useState<string>("");

  useEffect(() => {
    // Load Uber widget script
    const script = document.createElement('script');
    script.src = 'https://sandbox-api.uber.com/v1.2/embed/ride-button';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleBookRide = () => {
    // Open Uber in a new tab with pre-filled destination
    const uberUrl = `https://m.uber.com/ul/?action=setPickup&client_id=${process.env.NEXT_PUBLIC_UBER_CLIENT_ID}&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(destination)}`;
    window.open(uberUrl, '_blank');
    onRideBooked();
  };

  const mockPrices = {
    "cyberCab": "$35-40",
    "roboVan": "$45-50",
    "uber": "$25-30",
    "uberXL": "$35-40",
    "uberBLACK": "$50-55",
  };

  const handleServiceSelect = (value: string) => {
    setSelectedService(value);
    setEstimatedPrice(mockPrices[value as keyof typeof mockPrices]);
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Book Your Ride</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">Destination</p>
            <p className="font-medium">{destination}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">Pickup Time</p>
            <p className="font-medium">{meetingTime}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Select Service</p>
            <Select onValueChange={handleServiceSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose ride type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cyberCab">Tesla Cyber Cab</SelectItem>
                <SelectItem value="roboVan">Tesla Robo Van</SelectItem>
                <SelectItem value="uber">Uber</SelectItem>
                <SelectItem value="uberXL">Uber XL</SelectItem>
                <SelectItem value="uberBLACK">Uber BLACK</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {estimatedPrice && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Estimated Price</p>
              <p className="font-medium">{estimatedPrice}</p>
            </div>
          )}

          <Button 
            className="w-full mb-4"
            onClick={handleBookRide}
            disabled={!selectedService}
          >
            Book a Cyber Cab
          </Button>

          <div className="flex gap-4 w-full">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                // Handle schedule for later logic
                console.log("Schedule for later");
              }}
            >
              Schedule for Later
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={() => {
                // Handle cancel occasion logic
                if (typeof window !== 'undefined') {
                  if (window.confirm('Are you sure you want to cancel this occasion?')) {
                    window.location.href = '/';
                  }
                }
              }}
            >
              Cancel Occasion
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            You will be redirected to complete your booking
          </div>
        </div>
      </Card>
      <TripStatusNotification />
    </div>
  );
};

export default RideBooking;
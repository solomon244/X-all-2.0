import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"

type TripStatus = {
  message: string;
  timestamp: string;
  type: 'started' | 'onWay' | 'approaching' | 'arrived';
}

export function TripStatusNotification() {
  const [notifications, setNotifications] = useState<TripStatus[]>([]);

  // Simulate trip updates
  useEffect(() => {
    const statuses: TripStatus[] = [
      {
        message: "Elon Musk started the trip",
        timestamp: new Date().toLocaleTimeString(),
        type: 'started'
      },
      {
        message: "Elon Musk is on the way",
        timestamp: new Date().toLocaleTimeString(),
        type: 'onWay'
      },
      {
        message: "Elon Musk is approaching Kelli's Italian Restaurant",
        timestamp: new Date().toLocaleTimeString(),
        type: 'approaching'
      },
      {
        message: "Elon Musk has arrived at Kelli's Italian Restaurant 2 mins ago",
        timestamp: new Date().toLocaleTimeString(),
        type: 'arrived'
      }
    ];

    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < statuses.length) {
        setNotifications(prev => [...prev, statuses[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 3000); // Show a new notification every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Trip Status Updates</h2>
      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
        {notifications.map((notification, index) => (
          <Alert key={index} className="mb-4">
            <AlertTitle>Trip Update</AlertTitle>
            <AlertDescription>
              {notification.message}
              <div className="text-sm text-gray-500 mt-1">
                {notification.timestamp}
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </ScrollArea>
    </div>
  );
}
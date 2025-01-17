import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import RideBooking from "@/components/RideBooking";

export default function OccasionDetails() {
  const router = useRouter();
  const { 
    guests, 
    specialNote, 
    selectedTime, 
    selectedItems,
    venue 
  } = router.query;

  const parsedItems = selectedItems ? JSON.parse(selectedItems as string) : [];
  const parsedGuests = guests ? JSON.parse(guests as string) : ["Mr. Elon Musk", "Mr. Kimbal Musk"];

  return (
    <>
      <Head>
        <title>Occasion Details | Joey AI</title>
        <meta name="description" content="Detailed information about your planned occasion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-primary">Your Occasion Details</h1>
              <p className="text-muted-foreground mt-2">Everything is set for your perfect occasion</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Occasion Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">Venue</h3>
                      <p className="text-muted-foreground">{venue || "Kelli's Italian Restaurant"}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Time</h3>
                      <p className="text-muted-foreground">{selectedTime}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Special Note</h3>
                      <p className="text-muted-foreground">{specialNote}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">Selected Items</h3>
                      <div className="space-y-2">
                        {parsedItems.map((item: any) => (
                          <div key={item.id} className="flex justify-between">
                            <span className="text-muted-foreground">{item.name}</span>
                            <span className="text-muted-foreground">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-lg">Guests</h3>
                      <div className="space-y-1 mt-2">
                        <p className="text-muted-foreground">Mr. Elon Musk</p>
                        <p className="text-muted-foreground">Mr. Kimbal Musk</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 mt-6">
                  <h3 className="font-semibold text-lg mb-4">Transportation Options</h3>
                  <RideBooking 
                    meetingTime={selectedTime as string}
                    destination={venue as string}
                    onRideBooked={() => {
                      console.log("Ride booked");
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
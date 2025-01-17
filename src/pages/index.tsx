import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import RideBooking from "@/components/RideBooking";
import { TripStatusNotification } from "@/components/TripStatusNotification";
import PhotoMemories from "@/components/PhotoMemories";
import { RatingAndReview } from "@/components/RatingAndReview";
import GuestSelector from "@/components/GuestSelector";
import ShareRequest from "@/components/ShareRequest";
import VenueList from "@/components/VenueList";
import DateTypeSelector from "@/components/DateTypeSelector";

export default function Home() {
  const [step, setStep] = useState<'initial' | 'preview' | 'sent' | 'accepted' | 'hostConfirmation' | 'reserved'>('initial');
  const [showTripStatus, setShowTripStatus] = useState(false);
  const [specialNote, setSpecialNote] = useState("make something people want");
  const [selectedTime, setSelectedTime] = useState("1:00 PM");
  const [dateType, setDateType] = useState<'lunch' | 'dinner' | 'business' | 'romantic' | 'coffee' | 'movie' | undefined>(undefined);

  const mockRestaurantData = {
    name: "The Kitchen Restaurants Group",
    location: "Austin, Texas",
    rating: 4.8,
    priceRange: "$$$",
    cuisine: "Italian",
    specialWine: "French Riviera Red Wine",
    winePrice: 280,
  };

  const handleSendRequest = () => {
    setStep('sent');
  };

  const DatePreview = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Date Request Preview</span>
          <span className="text-sm text-muted-foreground">Status: Pending</span>
        </CardTitle>
        <CardDescription>Review the details before sending to Jessica Livingston</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Main Host:</span>
            <span className="font-medium">Paul Graham</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Meal:</span>
            <span className="font-medium">Lunch</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium">Business Date</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Place:</span>
            <span className="font-medium">{mockRestaurantData.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium text-primary hover:underline cursor-pointer">View on Map</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Items added:</span>
            <span className="font-medium">1 French Riviera Red Wine 🍾 ($280)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Bill:</span>
            <span className="font-medium">Shared, paid ✅</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Dress code:</span>
            <span className="font-medium">Casual 👖👗</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Table & Room:</span>
            <span className="font-medium">Reserved, pending</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Date/time:</span>
            <span className="font-medium">1PM Sat 28/8/25</span>
          </div>
          <div className="border-t pt-3">
            <span className="text-muted-foreground">Host special note:</span>
            <p className="mt-1">{specialNote}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setStep('initial')}>Edit</Button>
        <Button onClick={handleSendRequest}>Send Request</Button>
      </CardFooter>
    </Card>
  );

  const SentConfirmation = () => (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-green-500">Request Created Successfully! 🎉</CardTitle>
          <CardDescription className="text-center">
            Choose how you want to share this request:
          </CardDescription>
        </CardHeader>
      </Card>

      <ShareRequest
        requestDetails={{
          eventName: "Business Lunch",
          dateTime: `${selectedTime} Sat 28/8/25`,
          location: `${mockRestaurantData.name}, ${mockRestaurantData.location}`
        }}
        onShare={() => {
          // You can add additional logic here after sharing
          console.log("Request shared");
        }}
      />

      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-primary">Preview of the message:</p>
            <p className="mt-2">
              Hi Jessica, this is Joey AI from The Kitchen Restaurants Group. Paul Graham wants to meet you for lunch on a business meeting at The Kitchen Restaurants Group on 28/8/25. Please open up the invitation request to see the details. Thank you, Joey AI
            </p>
          </div>
          <div className="mt-6 text-center text-muted-foreground">
            Recipients will be able to Accept ✅ / Decline ✅ / Rain check ✅ / Change Restaurant 🔄 or DM you directly.
          </div>
        </CardContent>
        <CardFooter className="justify-center space-x-4">
          <Button variant="outline" onClick={() => setStep('initial')}>Create New Request</Button>
          <Button onClick={() => setStep('accepted')}>Simulate Acceptance</Button>
        </CardFooter>
      </Card>
    </div>
  );

  const InitialForm = () => {
    const [selectedGuests, setSelectedGuests] = useState<any[]>([]);

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Date Request</CardTitle>
          <CardDescription>
            Joey will help you arrange a perfect date
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {selectedGuests.length === 0 ? (
            <div className="space-y-2">
              <Label>Add Guests & Recipients</Label>
              <GuestSelector 
                onGuestsChange={(guests) => {
                  console.log('Selected guests:', guests);
                  setSelectedGuests(guests);
                }} 
              />
            </div>
          ) : !dateType ? (
            <DateTypeSelector
              selectedType={dateType}
              onDateTypeChange={(type) => setDateType(type)}
            />
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="special-note">Special Note</Label>
                <Textarea
                  id="special-note"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="Add a special note..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                    <SelectItem value="12:30 PM">12:30 PM</SelectItem>
                    <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                    <SelectItem value="1:30 PM">1:30 PM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-medium">Joey's Recommendation:</h3>
                <p className="text-muted-foreground">
                  Based on {selectedGuests[0]?.name}'s preferences, I've selected {mockRestaurantData.name} - 
                  a highly-rated Italian restaurant in Austin. I've also included a 
                  bottle of French Riviera Red Wine, which matches {selectedGuests[0]?.name}'s taste profile.
                </p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          {dateType && (
            <Button className="w-full" onClick={() => setStep('preview')}>
              Preview Request
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  const AcceptedStatus = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-green-500">Jessica Accepted! 🎉</CardTitle>
        <CardDescription className="text-center">
          Jessica has accepted your lunch invitation. Now Joey needs your permission to reserve the table.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-green-500">✓</span>
            <p>Jessica has confirmed availability for {selectedTime} on Sat 28/8/25</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-center font-medium">Next Step:</p>
            <p className="text-center text-muted-foreground">
              Allow Joey to send the table reservation request to {mockRestaurantData.name}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button variant="outline" onClick={() => setStep('initial')}>Cancel</Button>
        <Button onClick={() => setStep('hostConfirmation')}>Proceed with Reservation</Button>
      </CardFooter>
    </Card>
  );

  const HostConfirmation = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Confirm Table Reservation</CardTitle>
        <CardDescription className="text-center">
          Review and approve the table reservation details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Reservation Details:</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Restaurant:</span>
                <span className="font-medium">{mockRestaurantData.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">Sat 28/8/25</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Party Size:</span>
                <span className="font-medium">2 people</span>
              </div>
              <div className="flex justify-between">
                <span>Special Requests:</span>
                <span className="font-medium">Wine service</span>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-blue-600 dark:text-blue-400">
              By confirming, Joey will send the table reservation request to {mockRestaurantData.name} on your behalf.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button variant="outline" onClick={() => setStep('accepted')}>Back</Button>
        <Button onClick={() => setStep('reserved')}>Confirm Reservation</Button>
      </CardFooter>
    </Card>
  );

  const ReservedConfirmation = () => (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-green-500">Table Reserved Successfully! 🎉</CardTitle>
          <CardDescription className="text-center">
            Your reservation request has been sent to {mockRestaurantData.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-500">✓</span>
                <p>Jessica accepted the invitation</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-500">✓</span>
                <p>Table reservation request sent</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-center text-muted-foreground">
                You'll receive a confirmation from the restaurant shortly.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="outline" onClick={() => setStep('initial')}>Create New Request</Button>
        </CardFooter>
      </Card>

      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Need a ride?</h2>
        <RideBooking 
          meetingTime={selectedTime}
          destination={`${mockRestaurantData.name}, ${mockRestaurantData.location}`}
          onRideBooked={() => {
            setShowTripStatus(true);
            console.log("Ride booked successfully");
          }}
        />
      </div>

      <div className="w-full max-w-2xl mx-auto mt-8">
        <PhotoMemories 
          restaurantName={mockRestaurantData.name}
          occasionDate={`Sat 28/8/25 ${selectedTime}`}
        />
      </div>

      <div className="w-full max-w-2xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Rate Your Experience</h2>
        <RatingAndReview 
          onSubmit={(data) => {
            console.log('Rating submitted:', data);
            // Here you would typically send this data to your backend
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>X All - Your One App Fits All</title>
        <meta name="description" content="Create your perfect occasion at The Kitchen Restaurants Group with Joey AI's smart planning assistant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <Card className="w-fit absolute left-4 top-20">
              <CardHeader className="py-4">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                    <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
                  </svg>
                  <CardTitle className="text-lg">Your xAi Wallet</CardTitle>
                </div>
                <CardDescription className="text-2xl font-bold text-primary">$1,000</CardDescription>
              </CardHeader>
            </Card>
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-primary">Welcome to X All</h1>
              <p className="text-xl font-medium text-primary/80">X All your one app fits all APP</p>
              <p className="text-muted-foreground text-lg">Schedule your dates and meetings, hail your Tesla Cybercab and Robovan, pay with your xAi wallet, rent or buy Tesla humanoid robots</p>
            </div>

            {step === 'initial' && (
              <>
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-center">Available Restaurants and Hotels</h2>
                  <p className="text-center text-muted-foreground">
                    To select a venue to create your dates and meetings order your cyber cab and pay with your X ai wallet
                  </p>
                  <VenueList />
                </div>
              </>
            )}

            {step === 'initial' && <InitialForm />}
            {step === 'preview' && <DatePreview />}
            {step === 'sent' && <SentConfirmation />}
            {step === 'accepted' && <AcceptedStatus />}
            {step === 'hostConfirmation' && <HostConfirmation />}
            {step === 'reserved' && <ReservedConfirmation />}
            {showTripStatus && <TripStatusNotification />}
          </div>
        </main>
      </div>
    </>
  );
}
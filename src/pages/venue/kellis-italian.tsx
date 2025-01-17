import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GuestSelector from "@/components/GuestSelector";
import RestaurantMenu from "@/components/RestaurantMenu";

export default function KellisItalian() {
  const router = useRouter();
  const [specialNote, setSpecialNote] = useState("Humanity First");
  const [selectedTime, setSelectedTime] = useState("1:00 PM");
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectedGuests, setSelectedGuests] = useState<any[]>([]);

  const handleItemSelect = (item: any, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    }
  };

  return (
    <>
      <Head>
        <title>The Kitchen Restaurant - Create Occasion | Joey AI</title>
        <meta name="description" content="Create your perfect occasion at The Kitchen Restaurant with Joey AI's smart planning assistant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-primary">Welcome to The Kitchen Restaurant Austin Texas</h1>
              <p className="text-muted-foreground mt-2">Occasion Creation Page</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Create Occasion at The Kitchen Restaurant</CardTitle>
                  <CardDescription>
                    Let Joey help you arrange a perfect occasion
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Add Guests & Recipients</Label>
                    <GuestSelector 
                      onGuestsChange={(guests) => {
                        setSelectedGuests(guests);
                      }} 
                    />
                  </div>
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
                    <h3 className="font-medium">Restaurant Details:</h3>
                    <div className="space-y-1">
                      <p><span className="text-muted-foreground">Location:</span> Austin, Texas</p>
                      <p><span className="text-muted-foreground">Cuisine:</span> Italian</p>
                      <p><span className="text-muted-foreground">Price Range:</span> $$$</p>
                      <p><span className="text-muted-foreground">Rating:</span> 4.8 ★</p>
                      <p><span className="text-muted-foreground">Known for:</span> Fine Dining, Wine Selection, Romantic Atmosphere</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      router.push({
                        pathname: '/venue/occasion-details',
                        query: {
                          guests: JSON.stringify(selectedGuests),
                          specialNote,
                          selectedTime,
                          selectedItems: JSON.stringify(selectedItems),
                          venue: "The Kitchen Restaurant"
                        }
                      });
                    }}
                  >
                    Create Invitation
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Schedule for Later
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                <RestaurantMenu onItemSelect={handleItemSelect} />
                {selectedItems.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Selected Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedItems.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <span>{item.name}</span>
                            <span className="text-muted-foreground">{item.price}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 mt-4">
                          <div className="flex justify-between items-center font-medium">
                            <span>Total</span>
                            <span>
                              ${selectedItems.reduce((sum, item) => 
                                sum + parseFloat(item.price.replace('$', '')), 0).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
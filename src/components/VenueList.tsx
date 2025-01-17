import React from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Venue {
  id: string;
  name: string;
  type: "restaurant" | "hotel";
  location: string;
  cuisine?: string;
  priceRange: string;
  rating: number;
  tags: string[];
  slug?: string;
}

const venues: Venue[] = [
  {
    id: "1",
    name: "The Kitchen Restaurants Group",
    type: "restaurant",
    location: "Austin, Texas",
    cuisine: "Italian",
    priceRange: "$$$",
    rating: 4.8,
    tags: ["Fine Dining", "Wine Selection", "Romantic"],
    slug: "kellis-italian"
  },
  {
    id: "2",
    name: "Sakura Japanese Fusion",
    type: "restaurant",
    location: "Palo Alto, CA",
    cuisine: "Japanese",
    priceRange: "$$",
    rating: 4.6,
    tags: ["Sushi", "Modern", "Business Casual"]
  },
  {
    id: "3",
    name: "The Grand Hotel",
    type: "hotel",
    location: "San Francisco, CA",
    priceRange: "$$$$",
    rating: 4.9,
    tags: ["Luxury", "Meeting Rooms", "Restaurant"]
  },
  {
    id: "4",
    name: "Le Petit Bistro",
    type: "restaurant",
    location: "San Jose, CA",
    cuisine: "French",
    priceRange: "$$$",
    rating: 4.7,
    tags: ["Intimate", "Wine Bar", "Classic"]
  },
  {
    id: "5",
    name: "Tech Valley Inn",
    type: "hotel",
    location: "Mountain View, CA",
    priceRange: "$$$",
    rating: 4.5,
    tags: ["Business", "Modern", "Conference Center"]
  }
];

export default function VenueList() {
  const router = useRouter();

  const handleCreateInvitation = (venue: Venue) => {
    if (venue.slug) {
      router.push(`/venue/${venue.slug}`);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {venues.map((venue) => (
        <Card key={venue.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg">{venue.name}</span>
              <Badge variant={venue.type === "restaurant" ? "default" : "secondary"}>
                {venue.type}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{venue.location}</span>
                <span className="font-medium">{venue.priceRange}</span>
              </div>
              {venue.cuisine && (
                <div className="text-sm text-muted-foreground">
                  Cuisine: {venue.cuisine}
                </div>
              )}
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span>{venue.rating}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {venue.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Button 
                  className="flex-1"
                  onClick={() => handleCreateInvitation(venue)}
                >
                  Create Invitation
                </Button>
                <Button variant="outline" className="flex-1">
                  Schedule for Later
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
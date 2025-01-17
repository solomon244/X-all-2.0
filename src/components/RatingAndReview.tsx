import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Star } from 'lucide-react'

interface RatingAndReviewProps {
  onSubmit: (data: {
    restaurantRating: number
    restaurantReview: string
    occasionRating: number
    occasionReview: string
    hostRating: number
    hostReview: string
  }) => void
}

export function RatingAndReview({ onSubmit }: RatingAndReviewProps) {
  const [restaurantRating, setRestaurantRating] = React.useState(0)
  const [occasionRating, setOccasionRating] = React.useState(0)
  const [hostRating, setHostRating] = React.useState(0)
  const [restaurantReview, setRestaurantReview] = React.useState('')
  const [occasionReview, setOccasionReview] = React.useState('')
  const [hostReview, setHostReview] = React.useState('')

  const RatingStars = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
    )
  }

  const handleSubmit = () => {
    onSubmit({
      restaurantRating,
      restaurantReview,
      occasionRating,
      occasionReview,
      hostRating,
      hostReview,
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Rate Your Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Restaurant Rating */}
        <div className="space-y-2">
          <Label>Restaurant Rating</Label>
          <RatingStars rating={restaurantRating} setRating={setRestaurantRating} />
          <Textarea
            placeholder="Share your thoughts about the restaurant..."
            value={restaurantReview}
            onChange={(e) => setRestaurantReview(e.target.value)}
            className="mt-2"
          />
        </div>

        {/* Occasion Rating */}
        <div className="space-y-2">
          <Label>Occasion Rating</Label>
          <RatingStars rating={occasionRating} setRating={setOccasionRating} />
          <Textarea
            placeholder="How was the overall occasion?"
            value={occasionReview}
            onChange={(e) => setOccasionReview(e.target.value)}
            className="mt-2"
          />
        </div>

        {/* Host Rating */}
        <div className="space-y-2">
          <Label>Host Rating</Label>
          <RatingStars rating={hostRating} setRating={setHostRating} />
          <Textarea
            placeholder="Share your experience with the host..."
            value={hostReview}
            onChange={(e) => setHostReview(e.target.value)}
            className="mt-2"
          />
        </div>

        <Button 
          onClick={handleSubmit}
          className="w-full"
          disabled={!restaurantRating || !occasionRating || !hostRating}
        >
          Submit Review
        </Button>
      </CardContent>
    </Card>
  )
}
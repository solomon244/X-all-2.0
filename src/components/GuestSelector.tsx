import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

// Mock data for suggested recipients
const mockRecipients = [
  { id: 1, name: "Mr Elon Musk", image: "", email: "elon@x.com" },
  { id: 2, name: "Jessica Livingston", image: "", email: "jessica@ycombinator.com" },
  { id: 3, name: "Sam Altman", image: "", email: "sam@openai.com" },
  { id: 4, name: "Paul Buchheit", image: "", email: "paul@gmail.com" },
  { id: 5, name: "Trevor Blackwell", image: "", email: "trevor@anybots.com" },
  { id: 6, name: "Robert Morris", image: "", email: "rtm@mit.edu" },
]

interface Guest {
  id: number
  name: string
  image: string
  email: string
}

interface GuestSelectorProps {
  onGuestsChange: (guests: Guest[]) => void
}

const GuestSelector = ({ onGuestsChange }: GuestSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuests, setSelectedGuests] = useState<Guest[]>([])

  const filteredRecipients = mockRecipients.filter(
    recipient => 
      !selectedGuests.find(guest => guest.id === recipient.id) &&
      (recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       recipient.email.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const addGuest = (guest: Guest) => {
    const newGuests = [...selectedGuests, guest]
    setSelectedGuests(newGuests)
    onGuestsChange(newGuests)
    setSearchQuery("")
  }

  const removeGuest = (guestId: number) => {
    const newGuests = selectedGuests.filter(guest => guest.id !== guestId)
    setSelectedGuests(newGuests)
    onGuestsChange(newGuests)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search recipients on Joey AI..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      {selectedGuests.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedGuests.map(guest => (
            <Badge
              key={guest.id}
              variant="secondary"
              className="flex items-center gap-1 py-1 px-2"
            >
              <Avatar className="h-5 w-5">
                <AvatarImage src={guest.image} />
                <AvatarFallback>{guest.name[0]}</AvatarFallback>
              </Avatar>
              <span>{guest.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeGuest(guest.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {searchQuery && filteredRecipients.length > 0 && (
        <ScrollArea className="h-[200px] w-full rounded-md border">
          <div className="p-4 space-y-2">
            {filteredRecipients.map(recipient => (
              <div
                key={recipient.id}
                className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer"
                onClick={() => addGuest(recipient)}
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={recipient.image} />
                    <AvatarFallback>{recipient.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{recipient.name}</p>
                    <p className="text-xs text-muted-foreground">{recipient.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Add</Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}

export default GuestSelector
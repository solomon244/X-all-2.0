import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    sender: "Kelli's Restaurant",
    message: "Your reservation for 4 people is confirmed for tonight at 7 PM",
    time: "2 hours ago",
    type: "restaurant",
    unread: true
  },
  {
    id: 2,
    sender: "Sarah",
    message: "Can we move the dinner to 7:30 PM? Running a bit late from work",
    time: "3 hours ago",
    type: "recipient",
    unread: true
  },
  {
    id: 3,
    sender: "Italian Place",
    message: "We have a special menu for your group tonight!",
    time: "5 hours ago",
    type: "restaurant",
    unread: false
  },
  {
    id: 4,
    sender: "Mike",
    message: "Looking forward to dinner! Should I bring wine?",
    time: "1 day ago",
    type: "recipient",
    unread: false
  }
]

const DMInbox = () => {
  const unreadCount = mockMessages.filter(msg => msg.unread).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <MessageSquare className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Messages</h4>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-3 rounded-lg ${
                    message.unread 
                      ? 'bg-slate-100 dark:bg-slate-800' 
                      : 'bg-white dark:bg-slate-950'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium text-sm">{message.sender}</h5>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground">{message.message}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DMInbox
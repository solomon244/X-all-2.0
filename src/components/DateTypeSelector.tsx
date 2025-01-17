import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export type DateType = 'lunch' | 'dinner' | 'business' | 'romantic' | 'coffee' | 'movie';

interface DateTypeSelectorProps {
  onDateTypeChange: (type: DateType) => void;
  selectedType?: DateType;
}

const DateTypeSelector = ({ onDateTypeChange, selectedType }: DateTypeSelectorProps) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="text-muted-foreground mb-4">
            Hi Paul, this is Joey AI, can you tell me what kind of a date you want with Jessica, lunch, dinner, business, romantic, coffee, movie night etc., so that I can curate and recommend you some options based on Jessica's preference.
          </div>
          <RadioGroup
            defaultValue={selectedType}
            onValueChange={(value) => onDateTypeChange(value as DateType)}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lunch" id="lunch" />
              <Label htmlFor="lunch">Lunch Date 🍽️</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dinner" id="dinner" />
              <Label htmlFor="dinner">Dinner Date 🌙</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="business" id="business" />
              <Label htmlFor="business">Business Meeting 💼</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="romantic" id="romantic" />
              <Label htmlFor="romantic">Romantic Date 💝</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="coffee" id="coffee" />
              <Label htmlFor="coffee">Coffee Date ☕</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="movie" id="movie" />
              <Label htmlFor="movie">Movie Night 🎬</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateTypeSelector;
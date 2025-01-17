import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const RestaurantMenu = ({ onItemSelect }: { onItemSelect: (item: MenuItem, checked: boolean) => void }) => {
  const menu: MenuSection[] = [
    {
      title: "Wine Selection",
      items: [
        {
          id: "wine-1",
          name: "Chianti Classico Riserva",
          description: "Full-bodied Tuscan red wine with notes of cherry and oak",
          price: "$68"
        },
        {
          id: "wine-2",
          name: "Pinot Grigio Santa Margherita",
          description: "Crisp white wine with hints of citrus and green apple",
          price: "$52"
        },
        {
          id: "wine-3",
          name: "Prosecco Superiore DOCG",
          description: "Sparkling wine with delicate floral aromas",
          price: "$45"
        }
      ]
    },
    {
      title: "Desserts",
      items: [
        {
          id: "dessert-1",
          name: "Tiramisu",
          description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream",
          price: "$12"
        },
        {
          id: "dessert-2",
          name: "Panna Cotta",
          description: "Vanilla bean custard with berry compote",
          price: "$10"
        },
        {
          id: "dessert-3",
          name: "Cannoli",
          description: "Sicilian pastry filled with sweet ricotta and chocolate chips",
          price: "$9"
        }
      ]
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pre-select Wine & Desserts</CardTitle>
      </CardHeader>
      <CardContent>
        {menu.map((section, index) => (
          <div key={section.title} className="space-y-4">
            <h3 className="font-semibold text-lg">{section.title}</h3>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <Checkbox
                    id={item.id}
                    onCheckedChange={(checked) => onItemSelect(item, checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="font-medium">
                        {item.name}
                      </Label>
                      <span className="text-muted-foreground">{item.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {index < menu.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantMenu;
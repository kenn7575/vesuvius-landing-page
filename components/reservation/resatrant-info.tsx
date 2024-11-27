"use client";

import { MapPin, Phone } from "lucide-react";
import Image from "next/image";

export function RestaurantInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Restaurant Information</h2>
      <div className="flex gap-4">
        <div className="relative h-24 w-24 rounded-lg overflow-hidden">
          <Image
            src="/img/cafe.jpg"
            alt="Restaurant"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-semibold">Cafe Vesuvius</h3>
            <p className="text-sm text-muted-foreground">
              Meget hyggelig cafe i hjertet af Odense C.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <p>Albanigade 41a - 5000 Odense C</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <p>+45 1234 5678</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

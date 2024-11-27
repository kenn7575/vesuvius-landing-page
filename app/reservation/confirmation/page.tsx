"use client";

import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ReservationDetails } from "@/components/reservation/reservation-details";
import { RestaurantInfo } from "@/components/reservation/resatrant-info";

export default function ReservationConfirmation() {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reservation er sendt
          </h1>
          <p className="text-muted-foreground">
            Tak fordi du har reserveret et bord hos os. Vi glæder os til at se
            dig. Du vil modtage en bekræftelse på din reservation på mail, når
            den er godkendt.
          </p>
        </div>

        <Card className="p-6">
          <ReservationDetails />
          <Separator className="my-6" />
          <RestaurantInfo />
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

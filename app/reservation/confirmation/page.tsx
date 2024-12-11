import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ReservationDetails } from "@/components/reservation/reservation-details";
import { RestaurantInfo } from "@/components/reservation/resatrant-info";

export default function ReservationConfirmation() {
  return (
    <main className="min-h-screen bg-background bg-[url('/img/bg.jpg')] bg-cover bg-no-repeat bg-top">
      <div className=" mx-auto backdrop-blur-xl py-16 px-4 w-full min-h-screen flex  items-center flex-col">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-4 text-background font-semibold tracking-tight">
            Reservation er sendt
          </h1>
          <p className="text-background max-w-[40rem] text-xl text-center">
            Tak fordi du har reserveret et bord hos os. Vi glæder os til at se
            dig. Du vil modtage en bekræftelse på din reservation på mail, når
            den er godkendt.
          </p>
        </div>

        <Card className="p-6 max-w-2xl">
          <ReservationDetails />
          <Separator className="my-6" />
          <RestaurantInfo />
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

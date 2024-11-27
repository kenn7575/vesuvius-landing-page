"use client";

import { CalendarDays, Clock, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function ReservationDetails() {
  const searchParams = useSearchParams();

  const count = searchParams.get("count");
  console.log("🚀 ~ ReservationDetails ~ count:", count);
  const date = searchParams.get("date");
  console.log("🚀 ~ ReservationDetails ~ date:", date, typeof date);

  // convert the params to a number
  const peopleCount = parseInt(count ?? "0", 10);
  console.log(
    "🚀 ~ ReservationDetails ~ peopleCount:",
    peopleCount,
    typeof peopleCount
  );

  const parsedDate = new Date(date ?? "");
  console.log(
    "🚀 ~ ReservationDetails ~ parsedDate:",
    parsedDate,
    typeof parsedDate
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Detailer </h2>
      <div className="grid gap-4">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Date</p>
            <p className="text-sm text-muted-foreground">
              {parsedDate.toLocaleDateString("en-CA")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Time</p>
            <p className="text-sm text-muted-foreground">
              {parsedDate.toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Party Size</p>
            <p className="text-sm text-muted-foreground">
              {peopleCount} personer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// http://localhost:3000/reservation/confirmation?count=2&date=Sat+Nov+30+2024+19%3A00%3A00+GMT%2B0100+%28Central+European+Standard+Time%29

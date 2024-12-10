"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";

export function TimeCard({
  availableTimes,
  selectedTime,
  setSelectedTime,
  setActiveTab,
}: {
  availableTimes: string[];
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Vælg tidspunkt</CardTitle>
        <CardDescription className="text-md">
          Vælg et tidspunkt for reservationen. Du har bordet i 2 timer.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-5 gap-2">
          {availableTimes.map((time, index) => (
            <Button
              key={index}
              className={`${
                selectedTime === time
                  ? "bg-blue-700 hover:bg-blue-700 w-full"
                  : "w-full"
              }`}
              size="lg"
              onClick={() => {
                setSelectedTime(time);
                setActiveTab("info");
              }}
            >
              {time}
            </Button>
          ))}
        </div>
        {/* loop over available times  */}
      </CardContent>
    </Card>
  );
}

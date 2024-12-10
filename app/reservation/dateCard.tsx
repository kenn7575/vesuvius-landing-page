"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { enGB } from "date-fns/locale";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModifiersType } from "./types";
import { MODIFIER_STYLES, STYLES } from "./styles";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

export function DateCard({
  setPeopleCount,
  parseInt,
  isLoaded,
  month,
  handleDayClick,
  peopleCount,
  handleMonthChange,
  modifiers,
  setModifiers,
}: {
  setPeopleCount: (peopleCount: number) => void;
  parseInt: (e: string) => number;
  isLoaded: boolean;
  month: Date;
  handleDayClick: (date: Date, count: number) => Promise<void>;
  peopleCount: number;
  handleMonthChange: (month: Date) => void;
  modifiers: ModifiersType;
  setModifiers: React.Dispatch<React.SetStateAction<ModifiersType>>;
}): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Vælg dato og antal</CardTitle>
        <CardDescription className="text-md">
          Se hvilke dage der er ledige og vælg en dato for reservationen.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="gap-2">
          <p className="font-bold">Hvor mange personer bliver i? </p>
          <Select
            onValueChange={(e: string) => {
              setPeopleCount(parseInt(e));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="2" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Antal personer</SelectLabel>
                {Array.from(
                  {
                    length: 12,
                  },
                  (_, i) => (
                    <SelectItem
                      key={i}
                      value={(i + 1).toString()}
                      onClick={() => {
                        setPeopleCount(i + 1);
                      }}
                    >
                      {i + 1}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {isLoaded ? (
          <Calendar
            locale={enGB}
            month={month}
            weekStartsOn={1}
            onDayClick={(day) => {
              const oneDayAgo = new Date();
              oneDayAgo.setDate(oneDayAgo.getDate() - 1);
              if (day < oneDayAgo) {
                return;
              }
              if (
                modifiers.unavailable
                  .map((time) => time.toLocaleDateString())
                  .includes(day.toLocaleDateString())
              ) {
                return;
              }
              setModifiers({
                ...modifiers,
                selected: [day],
              });
              handleDayClick(day, peopleCount);
            }}
            onMonthChange={handleMonthChange}
            className="rounded-md border flex justify-center w-full"
            modifiersStyles={MODIFIER_STYLES}
            modifiers={modifiers}
            styles={STYLES}
          />
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-4 max-w-[28rem] ">
          <div className="flex gap-2">
            <Badge className="bg-transparent border-foreground" /> <p>Ledig</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-slate-200 border" /> <p>I dag</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-amber-500" /> <p>Delvist ledigt</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-red-600" /> <p>Intet ledigt</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-blue-700" /> <p>Valgte dag</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

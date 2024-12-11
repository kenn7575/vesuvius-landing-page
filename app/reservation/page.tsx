"use client";
import { InfoCard } from "./infoCard";
import { DateCard } from "./dateCard";
import { TimeCard } from "./timeCard";
import React, { useEffect, useState, useCallback } from "react";
import { ModifiersType } from "./types";
import { dateInfo, fetchAvailableDays, fetchAvailableTimes } from "./helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home(): JSX.Element {
  const initialMonth: Date = new Date();
  const { firstVisibleDate, lastVisibleDate } = dateInfo(initialMonth);

  //set initial state
  const [month, setMonth] = useState<Date>(initialMonth);
  const [startDate, setStartDate] = useState<Date>(firstVisibleDate);
  const [endDate, setEndDate] = useState<Date>(lastVisibleDate);
  const [modifiers, setModifiers] = useState<ModifiersType>({
    unavailable: [],
    partiallyUnavailable: [],
    selected: [],
    past: [],
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | undefined>();
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const [activeTab, setActiveTab] = useState("day");
  const [selectedTime, setSelectedTime] = useState<string>();

  // Update startDate and endDate when month changes
  useEffect(() => {
    const { firstVisibleDate, lastVisibleDate } = dateInfo(month);

    setStartDate(firstVisibleDate);
    setEndDate(lastVisibleDate);
  }, [month]);

  // Fetch availability data when startDate or endDate changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      await fetchAvailableDays(startDate, endDate, setModifiers, modifiers);
      setIsLoaded(true);
    };
    fetchData();
  }, [startDate, endDate]);

  // Handle month change
  const handleMonthChange = useCallback(
    (newMonth: Date) => {
      // Update month only if it has changed
      if (newMonth.getTime() !== month.getTime()) {
        setMonth(newMonth);
      }
    },
    [month]
  );

  // Handle day click
  const handleDayClick = useCallback(
    async (date: Date, count: number) => {
      setSelectedTime(undefined);

      const data = await fetchAvailableTimes(date, count);
      setAvailableTimes(data.availableTimes);
      setSelectedDay(date.toLocaleDateString("en-CA"));
      setActiveTab("time");
    },
    [setAvailableTimes]
  );

  useEffect(() => {}, [selectedDay]);

  return (
    <div className="flex items-center flex-col pb-16 bg-[url('/img/bg.jpg')] bg-cover bg-no-repeat bg-top">
      {/* Undskyld mads, havde ikke tid til at SEO optimere dette billede ):  */}
      <div className="pt-16 mb-16 w-full text-background  text-center bg-gradient-to-b from-foreground/90 md:via-transparent via-foreground/80 ">
        <h1 className="text-5xl font-semibold">
          Velkommen til vores reservations side
        </h1>
        <h2 className="text-xl mt-4">
          Vælg en dato og antal personer for at se tilgængelighed og reservere
          et bord.
        </h2>
      </div>
      <Tabs
        value={activeTab}
        className="scale-[70%] sm:scale-100 "
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="day">Dag</TabsTrigger>
          <TabsTrigger disabled={!selectedDay} value="time">
            Tidspunkt
          </TabsTrigger>
          <TabsTrigger disabled={!selectedTime || !selectedDay} value="info">
            Information
          </TabsTrigger>
        </TabsList>
        <TabsContent value="day">
          <DateCard
            setPeopleCount={setPeopleCount}
            parseInt={parseInt}
            isLoaded={isLoaded}
            month={month}
            setModifiers={setModifiers}
            handleDayClick={handleDayClick}
            peopleCount={peopleCount}
            handleMonthChange={handleMonthChange}
            modifiers={modifiers}
          />
        </TabsContent>
        <TabsContent value="time">
          <TimeCard
            availableTimes={availableTimes}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            setActiveTab={setActiveTab}
          />
        </TabsContent>

        <TabsContent value="info">
          <InfoCard
            peopleCount={peopleCount}
            selectedDay={selectedDay}
            selectedTime={selectedTime}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

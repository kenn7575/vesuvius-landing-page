"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState, useCallback, SetStateAction } from "react";
import { startOfMonth, endOfMonth, getDay } from "date-fns";
import { enGB } from "date-fns/locale";

const MODIFIER_STYLES = {
  unavailable: { backgroundColor: "red" },
  partiallyUnavailable: { backgroundColor: "orange" },
};

const STYLES = {
  months: { fontSize: "2rem" },
  caption: { fontSize: "1.2rem" },
  caption_label: { fontSize: "1.2rem", padding: "1rem" },
  table: { width: "100%", borderSpacing: "0.5rem" },
  head_cell: { width: "4rem", height: "4rem", fontSize: "1rem" },
  cell: { width: "4rem", height: "4rem" },
  day: { width: "4rem", height: "4rem", fontSize: "1.2rem" },
  nav_button_previous: { width: "4rem", height: "4rem" },
  nav_button_next: { width: "4rem", height: "4rem" },
};

async function fetchAvailabilityData(
  startDate: Date,
  endDate: Date,
  setModifiers: {
    (
      value: SetStateAction<{
        unavailable: never[];
        partiallyUnavailable: never[];
      }>
    ): void;
    (arg0: { unavailable: any; partiallyUnavailable: any }): void;
  }
) {
  try {
    const startDateString = startDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5005";
    const response = await fetch(
      `${backendUrl}/reservations/range?start_date=${startDateString}&end_date=${endDateString}`
    );
    const data = await response.json();
    console.log("🚀 ~ data:", data);

    const unavailable = data
      .filter(
        (item: { availability: string }) => item.availability === "Unavailable"
      )
      .map((item: { date: string | number | Date }) => new Date(item.date));
    const partiallyUnavailable = data
      .filter(
        (item: { availability: string }) =>
          item.availability === "PartiallyAvailable"
      )
      .map((item: { date: string | number | Date }) => new Date(item.date));

    setModifiers({ unavailable, partiallyUnavailable });
  } catch (error) {
    console.error("Error fetching availability data:", error);
  }
}

export default function Home() {
  const [month, setMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(startOfMonth(month));
  const [endDate, setEndDate] = useState(endOfMonth(month));
  const [modifiers, setModifiers] = useState({
    unavailable: [],
    partiallyUnavailable: [],
  });

  useEffect(() => {
    const firstDayOfWeek = getDay(startOfMonth(month)) || 7;
    const daysToSubtract = firstDayOfWeek - 1;
    const firstVisibleDate = new Date(startOfMonth(month));
    firstVisibleDate.setDate(firstVisibleDate.getDate() - daysToSubtract);

    const lastDayOfWeek = getDay(endOfMonth(month)) || 7;
    const daysToAdd = 7 - lastDayOfWeek;
    const lastVisibleDate = new Date(endOfMonth(month));
    lastVisibleDate.setDate(lastVisibleDate.getDate() + daysToAdd);

    setStartDate(firstVisibleDate);
    setEndDate(lastVisibleDate);
  }, [month]);

  useEffect(() => {
    fetchAvailabilityData(startDate, endDate, setModifiers);
    console.log(modifiers);
  }, [startDate]);

  const handleMonthChange = useCallback(
    (newMonth: SetStateAction<Date>) => setMonth(newMonth),
    []
  );

  return (
    <Calendar
      locale={enGB}
      month={month}
      weekStartsOn={1}
      onMonthChange={handleMonthChange}
      className="rounded-md border w-fit"
      modifiersStyles={MODIFIER_STYLES}
      modifiers={modifiers}
      styles={STYLES}
    />
  );
}

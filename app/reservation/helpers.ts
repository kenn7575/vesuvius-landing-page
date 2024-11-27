import { DataItem, fetchAvailableTimesRes, ModifiersType } from "./types";
import { startOfMonth, endOfMonth, getDay } from "date-fns";

export async function fetchAvailableDays(
  startDate: Date,
  endDate: Date,
  setModifiers: React.Dispatch<React.SetStateAction<ModifiersType>>,
  modifiers: ModifiersType
): Promise<void> {
  try {
    const startDateString = startDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5005";
    const response = await fetch(
      `${backendUrl}/reservations/range?start_date=${startDateString}&end_date=${endDateString}`
    );
    const data: DataItem[] = await response.json();

    const unavailable = data
      .filter((item) => item.availability === "Unavailable")
      .map((item) => new Date(item.date));

    const partiallyUnavailable = data
      .filter((item) => item.availability === "PartiallyAvailable")
      .map((item) => new Date(item.date));

    const daysInThePast = data
      .map((item) => new Date(item.date))
      .filter((date) => {
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        return date < oneDayAgo;
      });

    setModifiers({
      ...modifiers,
      unavailable,
      partiallyUnavailable,
      past: daysInThePast,
    });
  } catch (error) {
    console.error("Error fetching availability data:", error);
  }
}
export async function fetchAvailableTimes(
  date: Date,
  peopleCount: number
): Promise<fetchAvailableTimesRes> {
  try {
    const dateString = date
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .join("-");
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5005";
    const response = await fetch(
      `${backendUrl}/reservations/day?date=${dateString}&peopleCount=${peopleCount}`
    );
    const data: fetchAvailableTimesRes = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching availability data:", error);
    return { availableTimes: [], message: "Error fetching availability data" };
  }
}

export function dateInfo(date: Date): {
  firstVisibleDate: Date;
  lastVisibleDate: Date;
} {
  // Calculate initial startDate and endDate
  const firstDayOfWeek = getDay(startOfMonth(date)) || 7;
  const daysToSubtract = firstDayOfWeek - 1;
  const firstVisibleDate = new Date(startOfMonth(date));
  firstVisibleDate.setDate(firstVisibleDate.getDate() - daysToSubtract);

  const lastDayOfWeek = getDay(endOfMonth(date)) || 7;
  const daysToAdd = 7 - lastDayOfWeek;
  const lastVisibleDate = new Date(endOfMonth(date));
  lastVisibleDate.setDate(lastVisibleDate.getDate() + daysToAdd);

  return { firstVisibleDate, lastVisibleDate };
}

export function assembleDate(date: string, time: string): Date {
  // date: 2021-12-24
  // time: 12:30
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const assembledDate = new Date(year, month - 1, day, hours, minutes);

  return assembledDate;
}

export type ModifiersType = {
  unavailable: Date[];
  partiallyUnavailable: Date[];
  selected: Date[];
  past: Date[];
};

export type DataItem = {
  availability: string;
  date: string;
};
export interface fetchAvailableTimesRes {
  availableTimes: string[];
  message: string;
}

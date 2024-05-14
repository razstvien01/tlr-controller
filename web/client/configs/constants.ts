export enum USER_QUERY {
  GET_USER = "GET_USER",
  GET_USERS = "GET_USERS"
}

export const MAIN_COMPONENTS: Record<string, string> = {
  // DASHBOARD: "DASHBOARD",
  // PROJECTS: "ROBOTS",
};

export const robotSituations = {
  "0": "Stop",
  "1": "Reverse",
  "2": "Left Turn",
  "3": "Right Turn",
  "4": "Ahead",
  "5": "Behind",
  "6": "Left",
  "7": "Right",
  "9": "Forward",
  "A": "Ahead",
  "B": "Behind",
  "C": "left",
  "D": "Right",
  "E": "Low Hanging Front",
  "F": "Low Hanging Rear",
  "Z": "Gravitational acceleration is no longer on Z Axis"
};

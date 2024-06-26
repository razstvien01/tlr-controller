export enum USER_QUERY {
  GET_USER = "GET_USER",
  GET_USERS = "GET_USERS"
}

export const MAIN_COMPONENTS: Record<string, string> = {
  // DASHBOARD: "DASHBOARD",
  // PROJECTS: "ROBOTS",
};

export const robotSituations = {
  "-1": "Could not find a valid MPU6050 sensor, check wiring!",
  "0": "Stop",
  "1": "Reverse",
  "2": "Left Turn",
  "3": "Right Turn",
  "4": "Cliff Ahead",
  "5": "Cliff Behind",
  "6": "Cliff Left",
  "7": "Cliff Right",
  "9": "Forward",
  "A": "Obstacle Ahead",
  "B": "Obstacle Behind",
  "C": "Obstacle left",
  "D": "Obstacle Right",
  "Z": "Gravitational acceleration is no longer on Z Axis"
};

import axios from "axios";
import { RobotDataProps } from "@/configs/types";

export const addRobot = async (robot_data: RobotDataProps) => {
  try {
    const response = await axios.post("/api/robots", robot_data)
    return {
      success: true,
      robot_data: response.data?.robot_data
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};

import { UserDataProps } from "@/configs/types";
import axios from "axios";

export const addUser = async (user_data: UserDataProps) => {
  try {
    const response = await axios.post("/api/users", user_data);
    return {
      success: true,
      user_data: response.data?.user_data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};

export const getUser = async (user_id: string) => {
  const response = await axios.get(`/api/users/${user_id}`);
  const user_data = response.data.user_data;

  return user_data;
};

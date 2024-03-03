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
  try {
    const response = await axios.get(`/api/users/${user_id}`);
    const user_data = response.data.user_data;

    return {
      success: true,
      user_data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};

export const getUserByEmail = async (email_address: string | null) => {
  try {
    const params = {
      email_address,
    };
    const response = await axios.get("/api/users/", {
      params,
    });
    const data = response.data.data;
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};

export const modifyUser = async (user_data: UserDataProps) => {
  try {
    const { user_id, ...other_data } = user_data
    const response = await axios.patch(`/api/users/${user_id}`, other_data);

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};

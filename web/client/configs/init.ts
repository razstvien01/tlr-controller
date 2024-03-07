import { RobotDataProps, UserDataProps } from "./types";

export const UserDataInit: UserDataProps = {
  display_name: "",
  email_address: "",
  photo_url: "",
  phone_number: "",
  user_id: "",
};

export const RobotDataInit: RobotDataProps = {
  photo_url: "",
  robot_description: "",
  robot_id: "",
  location: "",
  robot_name: "",
  status: "inactive"
}
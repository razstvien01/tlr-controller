import axios from "axios"

export const addGoogleUser = async(user: any) => {
  const { displayName, email, uid, phoneNumber, photoURL } = user;
  
  await axios.post("/api/users", {
    user_id: uid,
    full_name: displayName,
    email_address: email,
    phone_number: phoneNumber,
    photo_url: photoURL
  })
}

export const getUser = async (user_id: string) => {
  const response = await axios.get(`/api/users/${user_id}`);
  const user_data = response.data.user_data;
  console.log("🚀 ~ getUser ~ user_data:", user_data)
  
  return user_data
}
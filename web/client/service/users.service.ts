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
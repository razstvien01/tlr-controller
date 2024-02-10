import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../app/firebase"
import { NextResponse } from "next/server"


export const checkIfExistsUserEmail = async (email_address: string) =>{
  //* Check if the user already exists
  const userQuery = query(
    collection(db, "users"),
    where("email_address", "==", email_address)
  )
  
  const querySnapshot = await getDocs(userQuery)
  return !querySnapshot.empty
}

export const checkIfExistsUserId = async (user_id: string) =>{
  //* Chceck if the document with user_id exists
  const userDocRef = doc(db, "users", user_id);
  const docSnapshot = await getDoc(userDocRef)
  
  return docSnapshot.exists()
}

export const getUsers = async () => {
  try {
    //* query users collection
    const q = collection(db, "users")
    const querySnapshot = await getDocs(q)
    
    //* extract user data from the query snapshot
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return NextResponse.json({
      succes: true,
      message: "Users Fetch Successfully",
      data: users
    })
  } catch (error) {
    console.log("Error fetching users:", error.message)
    
    return NextResponse.error()
  }
}
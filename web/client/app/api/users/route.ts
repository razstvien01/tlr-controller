import { NextRequest, NextResponse } from "next/server";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/app/firebase";

export const checkIfExistsUserId = async (user_id: string) => {
  //* Chceck if the document with user_id exists
  const userDocRef = doc(db, "users", user_id);
  const docSnapshot = await getDoc(userDocRef);

  return docSnapshot.exists();
};

const checkIfExistsUserEmail = async (email_address: string) => {
  //* Check if the user already exists
  const userQuery = query(
    collection(db, "users"),
    where("email_address", "==", email_address)
  );

  const querySnapshot = await getDocs(userQuery);
  return !querySnapshot.empty;
};

export const GET = async (request: NextRequest) => {
  try {
    //* query users collection
    const q = collection(db, "users");
    const querySnapshot = await getDocs(q);

    //* extract user data from the query snapshot
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      succes: true,
      message: "Users Fetch Successfully",
      data: users,
    });
  } catch (error: any) {
    console.log("Error fetching users:", error.message);

    return NextResponse.error();
  }
};

export const POST = async (request: NextRequest, context: any) => {
  try {
    const user_data = await request.json();
    // const { user_id } = user_data;
    // if (await checkIfExistsUserId(user_id)) {
    //   return NextResponse.json({
    //     succes: false,
    //     message: "The User is Already Exists",
    //   });
    // }
    
    // if(!user_id){
    //   return NextResponse.error()
    // }
    
    // const userDocRef = doc(db, "users", user_id)
    
    await addDoc(collection(db, "users"), {...user_data, created_at: serverTimestamp()});
    
    // await setDoc(userDocRef, {...user_data, created_at: serverTimestamp()})
    
    return NextResponse.json({
      succes: true,
      message: "Account User Created Successfully",
      user_data,
    });
  } catch (error) {}
};
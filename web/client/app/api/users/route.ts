import { NextRequest, NextResponse } from "next/server";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { checkIfExistsUserId } from "@/controllers/users.controller";
import { UserDataProps } from "@/configs/types";

// export const checkIfExistsUserId = async (user_id: string) => {
//   //* Chceck if the document with user_id exists
//   const userDocRef = doc(db, "users", user_id);
//   const docSnapshot = await getDoc(userDocRef);

//   return docSnapshot.exists();
// };

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
    // const user_data = await request.json();
    const url = new URL(request.url);
    const email_address = url.searchParams.get("email_address");

    if (email_address) {
      //* Query users collection by email_address
      const userQuery = query(
        collection(db, "users"),
        where("email_address", "==", email_address)
      );

      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        return NextResponse.json({
          success: true,
          message: "User Fetch Successfully",
          data: user,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "User not found",
        });
      }
    } else {
      //* Query all users
      const q = collection(db, "users");
      const querySnapshot = await getDocs(q);

      //* Extract user data from the query snapshot
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json({
        success: true,
        message: "Users Fetch Successfully",
        data: users,
      });
    }
  } catch (error: any) {
    console.log("Error fetching users:", error.message);

    return NextResponse.error();
  }
};

export const POST = async (request: NextRequest, context: any) => {
  try {
    const user_data = await request.json();
    const { user_id, ...other_data } = user_data as UserDataProps;

    if (user_id && (await checkIfExistsUserId(user_id))) {
      return NextResponse.json({
        success: false,
        message: "The User is Already Exists",
      });
    }

    if (user_id) {
      //* Reference the specific document by specifying its path
      const userDocRef = doc(db, "users", user_id);
      
      //* Set the document data with the specified document ID
      await setDoc(userDocRef, { ...other_data, created_at: serverTimestamp() });
    } else {
      await addDoc(collection(db, "users"), {
        ...user_data,
        created_at: serverTimestamp(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Account User Created Successfully",
      user_data,
    });
  } catch (error) {}
};

export const DELETE = async (request: NextRequest) => {
  try {
    const user_data = await request.json();
    const { user_id } = user_data;
    const userDocRef = doc(db, "users", user_id);

    // if(!(await checkIfExistsUserId(user_id))){
    //   return NextResponse.json({
    //     success: false,
    //     message: "Account Not Found"
    //   });
    // }

    //* Delete the document
    await deleteDoc(userDocRef);

    return NextResponse.json({
      success: true,
      message: "Account User Deleted Successfully",
    });
  } catch (error: any) {
    console.log("Error deleting user's data:", error.message);

    return NextResponse.error();
  }
};

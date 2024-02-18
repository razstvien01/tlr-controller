import { db } from "@/app/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

const checkIfExistsUserEmail = async (email_address: string) => {
  //* Check if the user already exists
  const userQuery = query(
    collection(db, "users"),
    where("email_address", "==", email_address)
  );

  const querySnapshot = await getDocs(userQuery);
  return !querySnapshot.empty;
};

export const GET = async (request: NextRequest, context: any) => {
  try {
    const { params } = context;
    const { user_id } = params;

    const userRef = doc(db, "users", user_id);
    const userDoc = await getDoc(userRef);
    
    if(!userDoc.exists()){
      return NextResponse.json({
        success: false,
        message: "User Not Found",
      });
    }
    
    const user_data = userDoc.data();
    

    return NextResponse.json({
      success: true,
      message: "User Fetch Successfully",
      user_data,
    });
  } catch (error: any) {
    console.log("Error fetching users:", error.message);

    return NextResponse.error();
  }
};

export const POST = async (request: NextRequest, context: any) => {
  return NextResponse.json({
    succes: true,
  });
};

export const PATCH = async (request: NextRequest) => {
  return NextResponse.json({
    succes: true,
  });
};

export const PUT = async (request: NextRequest) => {
  return NextResponse.json({
    succes: true,
  });
};

export const DELETE = async (request: NextRequest) => {
  return NextResponse.json({
    succes: true,
  });
};

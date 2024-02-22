import { db } from "@/app/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, context: any) => {
  try {
    const { params } = context;
    const { robot_id } = params;
    
    const robotRef = doc(db, "robots", robot_id);
    const robotDoc = await getDoc(robotRef);

    if (!robotDoc.exists()) {
      return NextResponse.json({
        success: false,
        message: "Robot Not Found",
      });
    }

    const robot_data = robotDoc.data();

    return NextResponse.json({
      success: true,
      message: "Robot Fetch Successfully",
      robot_data,
    });
  } catch (error: any) {
    console.log("Error fetching robot:", error.message);

    return NextResponse.error();
  }
};

export const PUT = async (request: NextRequest, context: any) => {
  try {
    const { params } = context;
    const { robot_id } = params;
    const robot_data = await request.json();

    const robotDocRef = doc(db, "robots", robot_id);
    await setDoc(robotDocRef, robot_data, { merge: true });

    return NextResponse.json({
      succes: true,
      robot_data,
    });
  } catch (error: any) {
    console.log("Error updating user's data:", error.message);

    return NextResponse.error();
  }
};

export const PATCH = async (request: NextRequest, context: any) => {
  try {
    const { params } = context;
    const { robot_id } = params;
    const robot_data = await request.json();

    const robotDocRef = doc(db, "robots", robot_id);

    await updateDoc(robotDocRef, robot_data);

    return NextResponse.json({
      succes: true,
      robot_data,
    });
  } catch (error: any) {
    console.log("Error modifying user's data:", error.message);

    return NextResponse.error();
  }
};
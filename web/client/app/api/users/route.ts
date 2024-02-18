import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebase";

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

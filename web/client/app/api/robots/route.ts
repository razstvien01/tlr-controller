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
  where,
} from "firebase/firestore";
import { db } from "@/app/firebase";

export const checkIfExistsRobotId = async (robot_id: string) => {
  //* Check if any document has a field named 'robot_id' with the provided value
  const robotsCollectionRef = collection(db, 'robots');
  const querySnapshot = await getDocs(query(robotsCollectionRef, where('robot_id', '==', robot_id)));

  // Return true if there is at least one document with the specified robot_id
  return querySnapshot.size > 0;
};


const checkIfExistsUserEmail = async (email_address: string) => {
  //* Check if the user already exists
  const userQuery = query(
    collection(db, "robots"),
    where("email_address", "==", email_address)
  );

  const querySnapshot = await getDocs(userQuery);
  return !querySnapshot.empty;
};

export const GET = async (request: NextRequest) => {
  try {
    //* query users collection
    const q = collection(db, "robots");
    const querySnapshot = await getDocs(q);

    //* extract user data from the query snapshot
    const robots = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      succes: true,
      message: "Robot Fetch Successfully",
      data: robots,
    });
  } catch (error: any) {
    console.log("Error fetching users:", error.message);

    return NextResponse.error();
  }
};

export const POST = async (request: NextRequest, context: any) => {
  try {
    const robot_data = await request.json();
    const { robot_id } = robot_data
    if(await checkIfExistsRobotId(robot_id)){
      return NextResponse.json({
        succes: false,
        message: "Robot is Already Created",
      });
    }
    
    await addDoc(collection(db, "robots"), {...robot_data, created_at: serverTimestamp()});
    
    return NextResponse.json({
      succes: true,
      message: "Robot Created Successfully",
      robot_data,
    });
  } catch (error) {}
};

export const DELETE = async (request: NextRequest) => {
  try {
    const user_data = await request.json();
    const { doc_id, robot_id } = user_data;
    const userDocRef = doc(db, "robots", doc_id);
    
    if(!(await checkIfExistsRobotId(robot_id))){
      return NextResponse.json({
        success: false,
        message: "Robot Not Found"
      });
    }
    
    //* Delete the document
    await deleteDoc(userDocRef);

    return NextResponse.json({
      success: true,
      message: "Account User Deleted Successfully"
    });
  } catch (error: any) {
    console.log("Error deleting user's data:", error.message);

    return NextResponse.error();
  }
};
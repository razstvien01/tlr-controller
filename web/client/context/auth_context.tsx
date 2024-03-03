"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../app/firebase";
import { addUser, modifyUser } from "@/service/users.service";
import { UserDataProps } from "@/configs/types";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useUserDataAtom } from "@/hooks/user-data-atom";

const AuthContext = createContext<any>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  // const [isLoading, setIsLoading] = useLoadingAtom();
  const [user, setUser] = useState(null);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const [currentUser, setCurrentUser] = useUserDataAtom();

  const googleSignIn = async () => {
    try {
      //* Use the hook to sign in with Google
      const result = await signInWithGoogle();
      const user = result?.user;

      if (!user) {
        return;
      }
      const user_data = {
        display_name: user.displayName,
        email_address: user.email,
        phone_number: user.phoneNumber,
        photo_url: user.photoURL,
        user_id: user.uid,
      } as UserDataProps;

      await addUser(user_data);

      //* update user data
      setCurrentUser(user_data);

      
    } catch (error) {
      console.log("Google Sign-In Error:", error);
      return false;
      
    } finally{
      // TODO set loading state
    }
    return true;
  };

  const signup = async (
    display_name: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log(res);

      if (!res) {
        console.error("Failure in creating an account");
        return;
      }

      const { user } = res;
      const { uid } = user;

      const user_data = {
        display_name,
        email_address: email,
        user_id: uid,
        phone_number: "",
        photo_url: "",
      } as UserDataProps;

      await addUser(user_data);
      
      // TODO add a display_name to the account
      await modifyUser(user_data)

      setCurrentUser(user_data);

      return true;
    } catch (error) {
      console.error("Error signing up:", error);
    }
    return false;
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);

  const contextValue = {
    user,
    googleSignIn,
    logOut,
    signup,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

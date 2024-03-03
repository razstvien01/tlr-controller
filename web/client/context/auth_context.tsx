"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../app/firebase";
import { addUser } from "@/service/users.service";
import { UserDataProps } from "@/configs/types";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
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
  const [currentUser, setCurrentUser] = useUserDataAtom();

  const googleSignIn = async () => {
    try {
      //* Use the hook to sign in with Google
      const result = await signInWithGoogle();
      const user = result?.user;

      if (!user) {
        console.error("No user found");
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

      return true;
    } catch (error) {
      console.log("Google Sign-In Error:", error);
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

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

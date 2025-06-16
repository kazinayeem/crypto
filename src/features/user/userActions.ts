import { auth, provider } from "@/firebase";
import type { AppDispatch } from "@/store";
import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";
import { addUser } from "./userSlice";

const mapFirebaseUserToUser = (firebaseUser: any) => ({
  user_id: firebaseUser.uid,
  email: firebaseUser.email || "",
  full_name: firebaseUser.displayName || "",
  nickname: "",
  photo_url: firebaseUser.photoURL || "",
  created_at: new Date(firebaseUser.metadata.creationTime || "").toISOString(),
  last_login_at: new Date(
    firebaseUser.metadata.lastSignInTime || ""
  ).toISOString(),
  updated_at: new Date().toISOString(),
  is_active: true,
});

export const loginWithGoogle = () => async (dispatch: AppDispatch) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;
    if (firebaseUser) {
      const user = mapFirebaseUserToUser(firebaseUser);
      dispatch(addUser(user));
    }
  } catch (error) {
    console.error("Google login failed:", error);
  }
};

export const loginWithApple = async () => {
  const auth = getAuth();
  const provider = new OAuthProvider("apple.com");

  try {
    const result = await signInWithPopup(auth, provider);
   // const credential = OAuthProvider.credentialFromResult(result);
    // const accessToken = credential?.accessToken;
    // const idToken = credential?.idToken;

    const user = result.user;
    console.log("Apple login success:", user);
    return user;
  } catch (error) {
    console.error("Apple login failed:", error);
    throw error;
  }
};

import { useEffect, useContext, createContext, useState } from "react";
import { auth, db } from "./firebase";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import Loading from "./components/Loading";
import Login from "./pages/login";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("No User");
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      const userData = {
        displayName: user.displayName,
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL,
        uid: user.uid,
      };
      await setDoc(doc(db, "users", user.uid), userData),
        setCurrentUser(userData);
      setLoading(false);
      console.log(token);
    });
  }, []);
  if (loading) {
    return <Loading type="bubbles" color="rgb(0,150,136)" />;
  }
  console.log(currentUser);
  if (!currentUser) {
    return <Login />;
  }
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

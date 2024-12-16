import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext()
export const useAuth = () => {
    return useContext(AuthContext)
}

// google provider 
const googleProvider = new GoogleAuthProvider()

// auth provider 
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // register user with firebase
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }
    // login user with existing user data with firebase
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // sign up with google : feature's adding 
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }
    
    // logout to our application
    const logout = async () => {
        return await signOut(auth)
    }

    // manage user 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                const {email, photoURL, displayName} = user;
                const userData = {
                    email, 
                    username: displayName, 
                    photo: photoURL
                }
            }
        })
        return () => unsubscribe()
    },[])

    const value = {
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
        loading,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
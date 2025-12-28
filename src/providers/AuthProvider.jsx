// src/providers/AuthProvider.jsx
import { useEffect, useState } from "react";
import { 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile, 
    onAuthStateChanged 
} from "firebase/auth";

import { auth } from "../components/firebase.config";
import { AuthContext } from "../contexts/AuthContext";

// ✅ AuthProvider component (named export)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const [popupLoading, setPopupLoading] = useState(false);

    // Create new user with email & password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    }

    // Sign in existing user with email & password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    }

    // Sign in with Google popup
    const googleSignIn = () => {
        if (popupLoading) {
            return Promise.reject({ code: "auth/cancelled-popup-request", message: "Popup request already in progress" });
        }

        setLoading(true);
        setPopupLoading(true);

        return signInWithPopup(auth, googleProvider)
            .finally(() => {
                setPopupLoading(false);
                setLoading(false);
            });
    }

    // Logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
            .finally(() => setLoading(false));
    }

    // Update user profile
    const updateUserProfile = (name, photo) => {
        if (!auth.currentUser) return;
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    }

    // Track auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log("Current User:", currentUser);
        });

        return () => unsubscribe();
    }, []);

    // Context value
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

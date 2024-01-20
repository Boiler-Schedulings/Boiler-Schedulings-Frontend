import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const auth = getAuth();
        return onAuthStateChanged(auth, setUser);
    }, []);

    const signOutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => setUser(null));
    };

    return (
        <UserContext.Provider value={{ user, signOutUser }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;

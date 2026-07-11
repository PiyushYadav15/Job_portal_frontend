import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

import {
    saveTokens,
    saveUser,
    getUser,
    clearTokens,
} from "../utils/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(getUser());

    const [loading, setLoading] = useState(true);

    /*
    ---------------------------------------------
    Load Current User
    ---------------------------------------------
    */

    const loadUser = async () => {

        try {

            const response = await api.get("/auth/me/");

            setUser(response.data);

            saveUser(response.data);

        }

        catch (error) {

            setUser(null);

            clearTokens();

        }

        finally {

            setLoading(false);

        }

    };

    /*
    ---------------------------------------------
    Login
    ---------------------------------------------
    */

    const login = async (

        username,

        password

    ) => {

        const response = await api.post(

            "/auth/login/",

            {

                username,

                password,

            }

        );

        saveTokens(

            response.data.access,

            response.data.refresh

        );

        saveUser(response.data.user);

        setUser(response.data.user);

        return response.data.user;

    };

    /*
    ---------------------------------------------
    Logout
    ---------------------------------------------
    */

    const logout = async () => {

        try {

            await api.post("/auth/logout/");

        }

        catch (error) {

            console.log(error);

        }

        finally {

            clearTokens();

            setUser(null);

        }

    };

    /*
    ---------------------------------------------
    Register
    ---------------------------------------------
    */

    const register = async (formData) => {

        return await api.post("/auth/register/", formData);

    };

    /*
    ---------------------------------------------
    Load user when App Starts
    ---------------------------------------------
    */

    useEffect(() => {

        if (localStorage.getItem("access")) {

            loadUser();

        }

        else {

            setLoading(false);

        }

    }, []);

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                logout,

                register,

                loadUser,

                isAuthenticated: !!user,

                isEmployer:

                    user?.role === "employer",

                isJobSeeker:

                    user?.role === "job_seeker",

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}
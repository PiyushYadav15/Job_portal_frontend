import { jwtDecode } from "jwt-decode";

/*
|--------------------------------------------------------------------------
| Save Tokens
|--------------------------------------------------------------------------
*/

export const saveTokens = (access, refresh) => {

    localStorage.setItem("access", access);

    localStorage.setItem("refresh", refresh);

};


/*
|--------------------------------------------------------------------------
| Get Tokens
|--------------------------------------------------------------------------
*/

export const getAccessToken = () => {

    return localStorage.getItem("access");

};

export const getRefreshToken = () => {

    return localStorage.getItem("refresh");

};


/*
|--------------------------------------------------------------------------
| Remove Tokens
|--------------------------------------------------------------------------
*/

export const clearTokens = () => {

    localStorage.removeItem("access");

    localStorage.removeItem("refresh");

    localStorage.removeItem("user");

};


/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

export const saveUser = (user) => {

    localStorage.setItem(

        "user",

        JSON.stringify(user)

    );

};

export const getUser = () => {

    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;

};

export const removeUser = () => {

    localStorage.removeItem("user");

};


/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

export const isAuthenticated = () => {

    return !!getAccessToken();

};


/*
|--------------------------------------------------------------------------
| User Role
|--------------------------------------------------------------------------
*/

export const getUserRole = () => {

    const user = getUser();

    return user?.role || null;

};

export const isEmployer = () => {

    return getUserRole() === "employer";

};

export const isJobSeeker = () => {

    return getUserRole() === "job_seeker";

};


/*
|--------------------------------------------------------------------------
| JWT Decode
|--------------------------------------------------------------------------
*/

export const decodeAccessToken = () => {

    const token = getAccessToken();

    if (!token) return null;

    try {

        return jwtDecode(token);

    }

    catch (error) {

        return null;

    }

};


/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

export const logout = () => {

    clearTokens();

    window.location.href = "/login";

};
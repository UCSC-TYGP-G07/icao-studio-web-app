import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import jwt from "jsonwebtoken";

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
function AuthContextProvider({ children }: AuthProviderProps){
    /* Check the whether user is logged in */
    const cookie = new Cookies();
    const accessToken = cookie.get('Access-Token');

    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        if (accessToken == undefined || accessToken == null) {
            /* Redirect to the signin page */
            setUser(null)
        } else {
            /* Decode the access token and store in react context */
            const token = jwtDecode<JwtToken>(accessToken);
            const email = token.email.toString();

            if (email == null || email == undefined) {
                /* Redirect to the signin page */
                setUser(null);
            }

            setUser({email: email, roles: []});
        }
    }, []);

    return (<AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>);
}

interface AuthProviderProps{
    children: ReactNode
}

interface UserType{
    email: string;
    roles: string[];
}

interface AuthContextType{
    user: UserType | null;
    setUser:  Dispatch<SetStateAction<UserType | null>>
}

export interface JwtToken{
    sub: string;
    email:  string;
    iat: string;
}

export default AuthContextProvider;
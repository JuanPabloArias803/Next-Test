import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUser{
    isLoggedIn: boolean;
    sessionToken: string;
    username: string;
    userId:string;
}

interface IAuthState {
    userAuth: IUser;
    setAuth: (value: IUser) => void;
    resetAuth: ()=>void;
}

export const useAuth = create<IAuthState>()(
    persist(
    (set) => ({
        userAuth: {
        isLoggedIn: false,
        sessionToken:'',
        username: '',
        userId:''
        },
        setAuth: (value) => set({ userAuth: value }),
        resetAuth:()=> set({userAuth: {
            isLoggedIn: false,
            sessionToken:'',
            username: '',
            userId:''
        }})
    }),
    {
        name: 'userSession',
    }
    )
);
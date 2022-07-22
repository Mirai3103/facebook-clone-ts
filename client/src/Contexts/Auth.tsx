import React from 'react';
import AuthService from '../Services/AuthService';
import { io, Socket } from 'socket.io-client'
interface UserDetail {
    avatarURL?: string;
}
interface User {
    id: string;
    email: string;
    avatar: string;
    firstName: string;
    lastName: string;
    userDetail: UserDetail;
}

export const AuthContext = React.createContext({
    isLoggedIn: false,
    user: null as User | null,
    setUser: (user: User | null) => { },
    setIsLoggedIn: (isLoggedIn: boolean) => { },
    socket: null as Socket | null,
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [user, setUser] = React.useState<User | null>(null);
    const [socket, setSocket] = React.useState<Socket | null>(null);


    React.useEffect(() => {
        AuthService.identify().then(res => {
            if (res.data.user) {
                localStorage.setItem('token', res.data.token);
                setIsLoggedIn(true);
                setUser(res.data.user);
                console.log(res.data.user);
            } else {
                setIsLoggedIn(false);
            }
        }).catch(err => {
            console.log(err);
            setIsLoggedIn(false);
            setUser(null);
        });

    }, []);

    React.useEffect(() => {
        if (isLoggedIn) {
            if (socket === null) {
                const IO = io(`ws://localhost:8080`, {
                    auth: {
                        token: localStorage.getItem('token')
                    },
                    path: '/realtime',
                })
                IO.on('connect', () => {
                    console.log('connected');
                }
                )
                IO.on('disconnect', () => {
                    console.log('disconnected');
                    IO.disconnect();
                }
                )
                setSocket(IO);
            }
        }
    }, [isLoggedIn, socket]);




    return (
        <AuthContext.Provider value={{ isLoggedIn, user, setUser, setIsLoggedIn, socket }}>
            {children}
        </AuthContext.Provider>
    );
}
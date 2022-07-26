import React from 'react'
import { useToast } from '../Contexts/Toast';
import useAuth from '../Hooks/useAuth';
import authService from '../Services/AuthService'
import { addHeader } from '../Services/AxiosConfig';

interface LoginCardProps {
    openSignupModal: () => void,
}

export default function LoginCard({ openSignupModal }: LoginCardProps) {

    const auth = useAuth();
    const toast = useToast();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleLogin = () => {
        authService.login(email, password).then((res) => {
            localStorage.setItem('token', res.data.token);
            addHeader('Authorization', `${res.data.token}`);
            auth.setUser(res.data.user);
            auth.setIsLoggedIn(true);
        }
        ).catch(err => {
            console.log(err);
            toast.showToast(<span className='text-red-600'>Login failed</span>, err.response.data.error, 5000);
        }
        );
    }

    return (<div className='w-full flex flex-col items-center  shadow-fb rounded-lg bg-white p-4 gap-y-[14px]'>
        <div className='w-full p-1 border-solid border rounded-md focus-within:border-blue-500'>
            <input className='w-full outline-none p-3' onChange={(e) => setEmail(e.target.value)} value={email} type="text" name="username" placeholder='Email address or phone number' />
        </div>
        <div className='w-full  p-1 border-solid border rounded-md focus-within:border-blue-500'>
            <input className='w-full outline-none p-3' onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" placeholder='Password' />
        </div>
        <button className='w-full bg-fbblue rounded-md py-2 font-bold text-xl text-white' type='submit' onClick={handleLogin}> Log in</button>
        <div className='text-[14px] hover:underline text-fbblue'>Forgotten password?</div>
        <span className='border-solid border-b-2 w-full'></span>
        <button className='w-2/3 my-2 bg-[#65c467] rounded-md py-3 font-bold text-xl text-white' onClick={openSignupModal}>Create New Account</button>
    </div>)
}
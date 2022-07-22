import React from 'react';
import { CgMenuGridR } from 'react-icons/cg';
import { BsMessenger } from 'react-icons/bs';
import { IoMdNotifications } from 'react-icons/io';
import { IoMdArrowDropdown } from 'react-icons/io';
import useAuth from '../../Hooks/useAuth';


import ContentLoader, { Facebook } from 'react-content-loader'

export default function Right() {
    const Auth = useAuth();

    return (
        <div className='flex justify-end md:ml-0 ml-auto'>
            <ul className='flex grow-0 items-center gap-x-2'>
                <li className='xl:flex items-center hover:bg-[#F2F2F2]  rounded-full py-1 px-2 hidden'>
                    <div className='w-9 h-9 rounded-full overflow-hidden'>
                        {Auth.isLoggedIn && Auth.user?.userDetail.avatarURL ? < img src={Auth.user?.userDetail.avatarURL} className='w-full rounded-full h-full object-cover' alt="" /> : <div className='skeleton-loading'><Facebook /></div>}
                    </div>
                    <div className='ml-3 min-w-[40px]'>
                        {
                            Auth.isLoggedIn ?
                                (<span > {Auth?.user?.lastName} </span >) :
                                (<span className='skeleton-loading'>Con cac </span>)
                        }
                    </div>
                </li>
                <li className='bg-[#F0F2F5] rounded-full p-2'><CgMenuGridR size={28} /></li>
                <li className='bg-[#F0F2F5] rounded-full  p-2'><BsMessenger size={28} /></li>
                <li className='bg-[#F0F2F5] rounded-full  p-2'><IoMdNotifications size={28} /></li>
                <li className='bg-[#F0F2F5] rounded-full  p-2'><IoMdArrowDropdown size={28} /></li>
            </ul>
        </div>
    )

}
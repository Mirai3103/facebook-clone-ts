import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { MdOndemandVideo } from 'react-icons/md';
import { BsShopWindow } from 'react-icons/bs';
import { MdGroups } from 'react-icons/md';
import { SiFacebookgaming } from 'react-icons/si';
import { FiMenu } from 'react-icons/fi';
export default function Tab() {
    return (
        <div className={`flex`}>
            <ul className='hidden md:flex grow mx-auto' >
                <li className='flex justify-center items-center grow w-tabauou lg:w-[112px] tab active'><AiFillHome size={28} /></li>
                <li className='flex justify-center items-center grow w-tabauou lg:w-[112px] tab'><MdOndemandVideo size={28} /></li>
                <li className='flex justify-center items-center grow w-tabauou lg:w-[112px] tab'><BsShopWindow size={28} /></li>
                <li className='flex justify-center items-center grow w-tabauou lg:w-[112px] tab'><MdGroups size={28} /></li>
                <li className='flex justify-center items-center grow w-tabauou lg:w-[112px] tab'><SiFacebookgaming size={28} /></li>
            </ul>
            <div className='flex md:hidden justify-center items-center grow lg:w-[112px] tab' ><FiMenu size={30} /> </div>
        </div>
    )
}
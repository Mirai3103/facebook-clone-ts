import React from 'react';
import Left from './Left';
import Right from './Right';
import Tab from './Tab';

export default function Header() {
    return (
        <div className='flex md:justify-between px-4 fixed top-0 z-20 w-full border-b py-2 shadow-fb bg-white '>
            <Left />
            <Tab />
            <Right />
        </div>
    )
}
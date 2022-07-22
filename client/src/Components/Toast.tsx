import React from 'react';
import { GrClose } from 'react-icons/gr';

interface props {
    children?: React.ReactNode
    header?: string | React.ReactNode;
    onClose?: () => void;
}

export default function Toast({ children, header, onClose }: props) {
    return (
        <div className='fixed left-3 bottom-3 z-50 flex flex-col items-center justify-center '>
            <div className='bg-white rounded-lg shadow-lg p-4 min-w-[320px]'>
                <div className='flex justify-between items-center'>
                    <div className='text-xl font-normal'>{header}</div>
                    <div className='text-xl font-normal bg-slate-100 rounded-full p-1 cursor-pointer' onClick={onClose}><GrClose size={14} /></div>
                </div>
                <div className='p-2'>
                    {children}
                </div>
            </div>
        </div>
    )
}
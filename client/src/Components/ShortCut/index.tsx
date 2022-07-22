import React from 'react';
import { ChatContext } from '../../Contexts/Chat';
import ShortCutIcon from './ShortCutIcon';

interface ShortCutProps {
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    title: string;
    imageURL: string;
    className?: string | '';
    customIcon?: JSX.Element;
    isContact?: boolean | false;
}


export default function ShortCut({ onClick, title, imageURL, className, customIcon, isContact }: ShortCutProps) {


    return (
        <div className={`${className} hover:bg-[#E4E6E9] cursor-pointer p-2 rounded-md `} onClick={onClick}>
            <div className='flex justify-start items-center'>
                {customIcon || <ShortCutIcon isCircle imageURL={imageURL} className={`mx-2 w-9 h-9 ${isContact ? 'avatar-icon-active' : ''}`} />}
                <div className='grow'>{title}</div>
            </div>
        </div>
    )
}
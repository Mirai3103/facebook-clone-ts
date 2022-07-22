import React from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { RiShareForwardLine } from 'react-icons/ri';

export default function Footer() {

    const [isLiked, setIsLiked] = React.useState(false);

    const handleLike = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsLiked(pre => !pre);
    }
    return <div className='flex flex-row text-unactive text-sm font-light justify-around gap-x-3 text-center mx-4 mt-2 py-[2px] border-solid border-t '>
        <div onClick={handleLike} className={`basis-1/3 rounded-md p-[2px] hover:bg-[#F0F2F5] flex justify-center items-center  ${isLiked ? 'text-fbblue' : ''}`}> {isLiked ? <AiFillLike className='mx-2 text-lg' /> : <AiOutlineLike className='mx-2 text-lg' />}Like</div>
        <div className='basis-1/3 rounded-md p-[2px] hover:bg-[#F0F2F5] flex justify-center items-center'> <BiComment className='mx-2 text-lg' />Comment</div>
        <div className='basis-1/3 rounded-md p-[2px] hover:bg-[#F0F2F5] flex justify-center items-center'><RiShareForwardLine className='mx-2 text-lg' />Share</div>
    </div>
}
import React from 'react';
import StoryCard from './StoryCard';
import { BsArrowRight } from 'react-icons/bs';
export default function Story() {
    return (<div className='min-w-[480px] relative sm:w-[600px] grid grid-cols-4 gap-x-1 mx-auto sm:grid-cols-5 '>
        <StoryCard />
        <StoryCard />
        <StoryCard />
        <StoryCard />
        <StoryCard className='hidden sm:block' />
        <div className='cursor-pointer border-solid p-2 border rounded-full absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-white'> <BsArrowRight size={20} /></div>
    </div>)
}
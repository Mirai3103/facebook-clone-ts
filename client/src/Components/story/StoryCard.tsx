import React from 'react';
import Avatar from '../Avatar'
interface StoryCardProps {
    fullName?: string,
    avatarUrl?: string,
    previewURL?: string,
    className?: string,

}


export default function StoryCard(props: StoryCardProps) {
    return <div className={props.className ? props.className + " relative" : "relative"}>
        <div className='absolute z-10'>
            <Avatar size='medium' className='border-4 border-black border-solid rounded-full' />
        </div>
        <div className='absolute bottom-0 z-10 text-white'>Mirai Kuriyama</div>
        <div className='relative -z-10 flex'>

            <img className='w-full h-auto object-cover' src={props.previewURL || require('../../Assets/Images/blank_story-min.jpg')}
                alt=""
            />

        </div>

    </div>
}
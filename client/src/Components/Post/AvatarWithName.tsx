import React from 'react';

interface AvatarWithNameProps {
    name: string | 'Hoang';
    avatar?: string;
    supDescription?: JSX.Element;
    classNameSize?: string;
    classFontSize?: string;

}
export default function AvatarWithName({ name, avatar, supDescription, classNameSize, classFontSize }: AvatarWithNameProps) {

    return (<div className='flex items-center gap-x-2 text-black '>
        <div className='grow-0'>
            <img src={avatar} alt="" className={`object-cover ${classNameSize ? classNameSize : "w-10 h-10"} rounded-full`} />
        </div>
        <div className='flex flex-col  '>
            <div className={classFontSize ? classFontSize : "font-medium"}>{name}</div>
            {supDescription}
        </div>
    </div>)

}
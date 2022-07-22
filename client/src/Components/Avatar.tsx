import React from 'react'

interface AvatarProps {
    avatarURL?: string
    size: 'medium' | 'large' | 'small'
    className?: string
}

export default function Avatar(props: AvatarProps) {
    return (<div className={props.className}>
        <img src={require('../Assets/Images/blankIMG.png')} className='w-10 h-10 align-middle rounded-full' alt="" />
    </div>)

}
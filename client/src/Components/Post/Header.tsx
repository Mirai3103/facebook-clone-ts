import React from 'react';
import useAuth from '../../Hooks/useAuth';
import AvatarWithName from './AvatarWithName';
interface HeaderProps {
    name: string;
    avatar?: string;
    supDescription?: JSX.Element;

}
export default function Header({ name, avatar, supDescription }: HeaderProps) {
    const auth = useAuth();
    return (
        <AvatarWithName name={name}
            avatar={avatar}
            supDescription={<div className='font-light text-sm'>{supDescription}</div>} />
    )

};
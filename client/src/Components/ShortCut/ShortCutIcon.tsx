import React from 'react';

interface ShortCutIconProps {
    isCircle: boolean;
    imageURL: string;
    className?: string | '';

}

export default function ShortCutIcon({ isCircle, imageURL, className }: ShortCutIconProps) {
    return (

        <div className={`${className} flex grow-0 items-center justify-center`}>
            <img src={imageURL} alt="Icon" className={`w-full h-full object-cover  ${isCircle ? 'rounded-full' : 'rounded-lg'}`
            } />
        </div>

    )
}

import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PostProps {
    fullName: string;
    avatarUrl: string;
    text?: string;
    image?: string | null;
    createdAt: Date;
    _id: string;

}
// { postHeader, text, image }: PostProps
export default function Post({ fullName, avatarUrl, text, image }: PostProps) {
    return (
        <div className=' text-black'>
            <div className='flex flex-col'>
                <div className='m-4 mb-1'>
                    <Header name={fullName} avatar={avatarUrl} />
                    <p className='my-1'>{text}</p>
                </div>
                <div>
                    {image ? <img className='object-cover' src={image} alt="" /> : null}
                </div>
                {/* todo:ảnh / video */}
                <Footer />
                {/* todo:Bình luận */}
            </div>
        </div>
    );
}

import React from 'react';
import ShortCut from '../../Components/ShortCut';
import { RiArrowDropDownLine } from 'react-icons/ri';
import useAuth from '../../Hooks/useAuth';
export default function ShortCuts() {

    let seeMore = (
        <div className={`flex grow-0 w-9 h-9 items-center justify-center bg-[#D8DADF] rounded-full mx-2`}>
            <RiArrowDropDownLine size={36} />
        </div>
    )

    const auth = useAuth();

    return (

        <div className='hidden xl:flex min-w-[280px] w-[360px] flex-col basis-[360px] shrink-[9999] font-medium text-sm'>
            <div className='sticky top-16'>
                < ShortCut className={!auth.isLoggedIn ? 'skeleton-loading' : ''} title={auth.user?.firstName + ' ' + auth.user?.lastName} imageURL={auth.user?.userDetail.avatarURL + ''} />
                <ShortCut className={!auth.isLoggedIn ? 'skeleton-loading' : ''} title='Friend' imageURL={require('../../Assets/Images/Friend.png')} />
                <ShortCut className={!auth.isLoggedIn ? 'skeleton-loading' : ''} title='Memories' imageURL={require('../../Assets/Images/Memories.png')} />
                <ShortCut className={!auth.isLoggedIn ? 'skeleton-loading' : ''} title='Friend' imageURL={require('../../Assets/Images/Friend.png')} />
                <ShortCut className={!auth.isLoggedIn ? 'skeleton-loading' : ''} title='Memories' imageURL={require('../../Assets/Images/Memories.png')} />
                <ShortCut className={!auth.isLoggedIn ? 'skeleton-loading' : ''} title='Friend' imageURL={require('../../Assets/Images/Friend.png')} />
                <ShortCut className={!auth.isLoggedIn ? 'skeleton-loading' : ''} title='See more' customIcon={seeMore} imageURL='' />
                <div> to be continue .....</div>
            </div>
        </div >

    )
}
import React from 'react';
import friendService from '../../Services/FriendService';


interface Props {
    setIsHasFriendRequest: React.Dispatch<React.SetStateAction<boolean>>;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        userDetail: {
            avatarUrl: string;
        }
    }
}

export default function FriendRequest({ user, setIsHasFriendRequest }: Props) {

    const handleAccept = () => {
        friendService.acceptFriendRequest(user._id).then(() => {
            console.log('friend request accepted');
            setIsHasFriendRequest((pre) => !pre);
        }
        ).catch(err => {
            console.log(err);
        }
        );

    }
    const handleReject = () => {
        friendService.refuseFriendRequest(user._id).then(() => {
            console.log('friend request rejected');
            setIsHasFriendRequest((pre) => !pre);
        }
        ).catch(err => {
            console.log(err);
        }
        );

    }




    return (
        <div className='flex  justify-between m-3 items-center hover:bg-slate-50 p-2 rounded-md'>
            <div className='flex items-start gap-x-4 text-black grow'>
                <div className='grow-0'>
                    <img src={user.userDetail.avatarUrl} alt="" className='object-cover border-2 border-solid w-[60px] h-[60px] rounded-full' />
                </div>
                <div className='flex flex-col mt-2 justify-between gap-y-5 grow'>
                    <div className='font-medium'>{user.firstName + " " + user.lastName}</div>
                    <div className='grid grid-cols-2 text-center gap-x-3 '>
                        <button className='bg-fbblue text-white p-2 rounded-md ' onClick={handleAccept}>Confirm</button>
                        <button className='bg-slate-100 p-2 rounded-md ' onClick={handleReject}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
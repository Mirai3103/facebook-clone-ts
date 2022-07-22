import React from 'react';

import Card from '../../Components/NewFeed/Card';
import useAuth from '../../Hooks/useAuth';
import { IUserSearch } from '../../Services/UserService';
import FriendService from '../../Services/FriendService';
interface Props {
    user: IUserSearch;

}

export default function SearchResult({ user }: Props) {
    const auth = useAuth();
    const [userState, setUserState] = React.useState(user);



    return (
        <Card>
            <div className='flex  justify-between m-3 items-center'>
                <div className='flex items-start gap-x-2 text-black '>
                    <div className='grow-0'>
                        <img src={user.userDetail.avatarURL} alt="" className='object-cover border-2 border-solid w-[60px] h-[60px] rounded-full' />
                    </div>
                    <div className='flex flex-col mt-2'>
                        <div className='font-medium'>{user.firstName + " " + user.lastName}</div>
                    </div>
                </div>
                <div>
                    <ConCac user={userState} setUser={setUserState} />
                </div>
            </div>
        </Card>)
}

function ConCac({ user, setUser }: { user: IUserSearch, setUser: React.Dispatch<React.SetStateAction<IUserSearch>> }) {
    if (user.relationship === "PENDING YOU ACCEPT") {
        const handleAccept = () => {
            FriendService.acceptFriendRequest(user.id).then(() => {
                console.log('friend request accepted');
                setUser((pre) => { return { ...pre, relationship: "FRIEND" } });
            }
            ).catch(err => {
                console.log(err);
            }
            );

        }
        const handleReject = () => {
            FriendService.refuseFriendRequest(user.id).then(() => {
                console.log('friend request rejected');
                setUser((pre) => { return { ...pre, relationship: "NOT FRIEND" } });
            }
            ).catch(err => {
                console.log(err);
            }
            );

        }
        return (
            <div className='grid grid-cols-2 text-center gap-x-3 '>
                <button className='bg-fbblue text-white p-2 rounded-md ' onClick={handleAccept}>Confirm</button>
                <button className='bg-slate-100 p-2 rounded-md ' onClick={handleReject}>Delete</button>
            </div>
        )
    }
    else if (user.relationship === "PENDING THEY ACCEPT") {
        return (
            <div>Pending they accept</div>
        )
    }
    else if (user.relationship === "FRIEND") {
        return (
            <div>Friend</div>
        )

    }
    else {
        const handleAddFriend = () => {
            FriendService.sendFriendRequest(user.id);
            setUser((pre) => { return { ...pre, relationship: "PENDING YOU ACCEPT" } });
        }
        return <button onClick={handleAddFriend} className='p-1 px-3 rounded-md bg-[#ECF3FF] hover:bg-[#AAC9FF] text-[#1877F2]'>Add friend</button>
    }

}

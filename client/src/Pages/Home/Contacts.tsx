import React from 'react'
import ShortCut from '../../Components/ShortCut'
import { AiOutlineVideoCameraAdd } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'
import FriendRequest from './FriendRequest'
import FriendService, { IUser } from '../../Services/FriendService'
import useAuth from '../../Hooks/useAuth'
import { ChatContext } from '../../Contexts/Chat'



export default function Contacts() {

    const [isHasFriendRequest, setIsHasFriendRequest] = React.useState(false)
    const auth = useAuth();
    const [friendRequests, setFriendRequests] = React.useState([])
    const [friendList, setFriendList] = React.useState<IUser[]>([])

    React.useEffect(() => {
        FriendService.getAllFriendRequests().then(res => {
            setFriendRequests(res.data)
        }
        ).catch(err => {
            console.log(err);
        }
        )
    }, [isHasFriendRequest]);

    React.useEffect(() => {
        auth.socket?.on('new-friend-request', (data) => {
            setIsHasFriendRequest(true)
        });

        return () => {
            auth.socket?.off('new-friend-request')
        }
    }, [auth.socket]);


    React.useEffect(() => {
        FriendService.getAllFriends().then(res => {
            setFriendList(res.data)
        }
        ).catch(err => {
            console.log(err);
        }
        )
    }, [isHasFriendRequest]);

    const chatContext = React.useContext(ChatContext);
    const handleClick = React.useCallback((id: string, name: string, avatar: string) => {

        chatContext.addWindowsChatInfo({
            toUser: {
                _id: id,
                name,
                avatar
            }
        });
    }, [chatContext]);

    React.useEffect(() => {

        interface IData {
            fromUserId: string;
            toUserId: string;
            message: string;
            id: number;
        }

        const handleMgs = (data: IData) => {
            for (const friend of friendList) {
                if (friend._id === data.fromUserId) {
                    handleClick(friend._id, friend.firstName + " " + friend.lastName, friend.userDetail.avatarUrl)
                }
            }
        }

        auth.socket?.on('message', handleMgs);
        return () => {
            auth.socket?.off('message', handleMgs)
        }
    }, [auth.socket, friendList, handleClick]);


    return (
        <div className='hidden ipad:flex min-w-[280px]  flex-col w-[360px] shrink-[9999] font-medium text-sm sticky'>
            <div className='sticky top-16'>
                <div className='flex items-center justify-between text-unactive px-2 border-t-2'>
                    <div className='flex grow-0 text-lg mt-2'>Friend request</div>
                </div>
                {friendRequests.length > 0 && friendRequests.map(friendRequest => <FriendRequest setIsHasFriendRequest={setIsHasFriendRequest} key={(friendRequest as any)._id} user={friendRequest}></FriendRequest>)}
                <div className='flex items-center justify-between text-unactive px-2 border-t-2'>
                    <div className='flex grow-0 text-lg  mt-2'>Contacts</div>
                    <div className='flex justify-end grow-0 '>
                        <div className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#E4E6E9]'><AiOutlineVideoCameraAdd size={16} /></div>
                        <div className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#E4E6E9]'><AiOutlineSearch size={16} /></div>
                        <div className='w-8 h-8 flex items-start justify-center rounded-full cursor-pointer hover:bg-[#E4E6E9]'>...</div>
                    </div>
                </div>
                {friendList.length > 0 && friendList.map(friend => <ShortCut key={friend._id} onClick={(e) => handleClick(friend._id, friend.firstName + " " + friend.lastName, friend.userDetail.avatarUrl)} title={friend.firstName + " " + friend.lastName} isContact imageURL={friend.userDetail.avatarUrl} />)}

            </div>
        </div>
    )
}
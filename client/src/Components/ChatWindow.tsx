import React from 'react';
import useAuth from '../Hooks/useAuth';
import AvatarWithName from './Post/AvatarWithName';
import ChatService from '../Services/ChatService';
import { GrClose } from 'react-icons/gr';
interface Props {
    toUser: {
        id: string;
        name: string;
        avatar: string;
    }
    onClose: (id: string) => void;
}

interface IMessage {
    message: string;
    fromUserId: string;
    createdAt: Date;
    id: number;
}





export default function ChatWindow({ toUser, onClose }: Props) {
    const auth = useAuth();
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const handleSendMessage = () => {
        auth.socket?.emit('message', {
            fromUserId: auth.user?.id,
            toUserId: toUser.id,
            message
        });
    }
    const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
            setMessage('');
        }
    }

    React.useEffect(() => {
        const handleNewMessage = (data: {
            fromUserId: string;
            toUserId: string;
            message: string;
            id: number;
        }) => {
            if (data.toUserId === toUser.id || data.fromUserId === toUser.id) {
                setMessages((pre) =>

                    [{
                        message: data.message,
                        fromUserId: data.fromUserId,
                        createdAt: new Date(),
                        id: data.id
                    }, ...pre]
                );
            }
        }
        auth.socket?.on('message', handleNewMessage);
        return () => {
            auth.socket?.off('message', handleNewMessage);
        }
    }, [auth.socket, toUser.id]);

    React.useEffect(() => {
        ChatService.getMessages(toUser.id).then((res) => {
            setMessages((res.data.messages as IMessage[]).reverse());
        }
        );
    }, [toUser.id]);


    return (
        <div className='w-[338px] h-[445px] bg-white shadow-fb border rounded-lg flex flex-col'>
            <div className='py-2 px-3 border-b shadow-fb grow-0 flex justify-between'>
                <AvatarWithName name={toUser.name} avatar={toUser.avatar} classNameSize="w-9 h-9" classFontSize='font-medium text-base' />
                <div className='cursor-pointer flex items-center font-bold' onClick={() => onClose(toUser.id)} > <GrClose /></div>
            </div>
            <div className='grow overflow-y-auto flex flex-col-reverse px-3 py-2'>
                {messages.map(mgs => {
                    return <MessageBox key={mgs.id} message={mgs.message} isOwn={mgs.fromUserId !== toUser.id} />
                })}
            </div>
            <div className='grow-0 flex px-2 py-1'>
                <div className='bg-[#F0F2F5] p-1 px-3 rounded-full grow'>
                    <input onKeyDown={handlePressEnter} value={message} onChange={handleChangeMessage} type="text" name="a" placeholder='Aa' className='outline-none bg-transparent w-full' />
                </div>
            </div>

        </div>
    );
}

function MessageBox(props: { message: string, isOwn: boolean }) {

    return <div className={`flex  ${props.isOwn ? "justify-end" : "justify-start"} my-1`}>
        <div className={`${props.isOwn ? "bg-fbblue text-white" : "bg-slate-100 text-black min-w-[50px] text-center"}  text-base font-normal p-2 rounded-full`}>
            {props.message}
        </div>
    </div>

}
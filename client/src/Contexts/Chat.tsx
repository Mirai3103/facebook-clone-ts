import React from 'react';
import ChatWindow from '../Components/ChatWindow';
import useAuth from '../Hooks/useAuth';



interface IWindowsChatInfo {
    toUser: {
        id: string;
        name: string;
        avatar: string;
    }

}

interface IChatContext {
    windowsChatInfo: IWindowsChatInfo[] | null;
    setWindowsChatInfo: React.Dispatch<React.SetStateAction<IWindowsChatInfo[] | null>>;
    addWindowsChatInfo: (newWindow: IWindowsChatInfo) => void;
}

export const ChatContext = React.createContext<IChatContext>(null as unknown as IChatContext);



export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [windowsChatInfo, setWindowsChatInfo] = React.useState<IWindowsChatInfo[] | null>(null);
    function addWindowsChatInfo(newWindow: IWindowsChatInfo) {
        if (windowsChatInfo) {
            for (const item of windowsChatInfo) {
                if (item.toUser.id === newWindow.toUser.id) {
                    return;
                }
            }
            setWindowsChatInfo([...windowsChatInfo, newWindow]);
            return;
        }
        setWindowsChatInfo([newWindow]);
    }

    const handleClose = (id: string) => {
        if (windowsChatInfo) {
            setWindowsChatInfo(windowsChatInfo?.filter(item => item.toUser.id !== id))
        }
    }

    return <ChatContext.Provider value={{ windowsChatInfo, setWindowsChatInfo, addWindowsChatInfo }}>
        {children}
        <div className='fixed z-50 right-5 bottom-2 flex gap-x-3'>
            {windowsChatInfo?.map((item) => {
                return <ChatWindow key={item.toUser.id} onClose={handleClose} toUser={item.toUser} />
            })}

        </div>
    </ChatContext.Provider>;
}

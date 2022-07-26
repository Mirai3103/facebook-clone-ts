import React from 'react'
import Modal from './Modal'
import AvatarWithName from './Post/AvatarWithName';
import { FaImages } from 'react-icons/fa';
import DropMedia from './DropMedia';
import PostService from '../Services/PostService';
import useAuth from '../Hooks/useAuth';


interface CreatePostModalProps {
    isOpen: boolean;
    closeModal: () => void;
    contentLabel: string;
}


export default function CreatePostModal({ isOpen, closeModal, contentLabel }: CreatePostModalProps) {

    const [file, setFile] = React.useState<File | null>(null);
    const [content, setContent] = React.useState<string>('');
    const handleTextAreaChange = (e: React.FormEvent<HTMLTextAreaElement>) => { setContent(e.currentTarget.value) }
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const handlePost = () => {
        setIsLoading(true);
        PostService.addPost(content, file as File).then(res => {
            setIsLoading(false);
            setFile(null);
            setContent('');
            closeModal();
        }).catch(err => {
            setIsLoading(false);
            console.log(err)
        }
        )
    }

    const Header = <div className='border-solid border-b text-center w-[500px]'>
        <h1 className='text-xl font-semibold text-center p-3 pt-0'>Create post</h1>
    </div>
    const auth = useAuth();
    const Body = <div className='flex flex-col max-w-[500px]'>
        <AvatarWithName name={auth.user?.firstName + " " + auth.user?.lastName} avatar={auth.user?.userDetail.avatarUrl} />
        <div className=' overflow-y-auto no-scrollbar max-h-[400px]'>
            <div className='mt-1'>
                <textarea onInput={handleTextAreaChange} value={content} className='w-full resize-none outline-none text-2xl p-2 overflow-y-hidden' onChange={(e) => { e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px' }} placeholder="What's on your mind?"></textarea>
            </div>
            <DropMedia setFile={setFile} />
        </div>
        <div className='border border-solid rounded-md p-4 my-2 flex items-center justify-between   '>
            <div>Add to your post</div>

            <div>
                <div className='text-xl text-green-500 rounded-full p-1 hover:bg-slate-200'>
                    <FaImages />
                </div>

            </div>
        </div>
    </div>
    const Footer = <button disabled={isLoading} onClick={handlePost} className='disabled:bg-slate-400  bg-fbblue rounded-lg hover:bg-blue-700 p-2 text-white'>Post</button>
    return <Modal header={Header} body={Body} footer={Footer} closeModal={closeModal} isOpen={isOpen} contentLabel={contentLabel} />

}
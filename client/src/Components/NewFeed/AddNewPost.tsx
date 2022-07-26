import React from 'react';
import useAuth from '../../Hooks/useAuth';
import CreatePostModal from '../CreatePostModal';

export default function AddNewPost() {
    const auth = useAuth();
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    function openCreatePostModal() {
        setIsOpenModal(true)
    }
    function closeCreatePostModel() {
        setIsOpenModal(false)
    }
    return (
        <div className='m-2 text-unactive'>
            <CreatePostModal closeModal={closeCreatePostModel} isOpen={isOpenModal} contentLabel='create post' />
            <div className={`flex gap-x-2 ml py-2 pb-3`}>
                <div className='flex justify-center items-center'><img className='rounded-full object-cover w-10 h-10' src={auth.user?.userDetail.avatarUrl} alt="avatar" /></div>
                <div onClick={openCreatePostModal} className='bg-[#F0F2F5] grow rounded-full flex items-center p-2 cursor-pointer'>

                    <input type="text" onClick={openCreatePostModal} disabled name="status" className='cursor-pointer hidden xl:flex flex-grow outline-none bg-transparent' placeholder="What's on your mind, Hoangf?" />
                </div>
            </div>
            <div className='flex gap-x-1 text-center py-2 pb-0 border-solid border-t'>
                <div className='basis-1/3 rounded-lg p-2 hover:bg-[#F0F2F5]'>Live video</div>
                <div className='basis-1/3 rounded-lg p-2 hover:bg-[#F0F2F5]'>Photo/Video</div>
                <div className='basis-1/3 rounded-lg p-2 hover:bg-[#F0F2F5]'>Feeling/activity</div>
            </div>
        </div>
    )
}
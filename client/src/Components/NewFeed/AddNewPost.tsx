import React from "react";
import useAuth from "../../Hooks/useAuth";
import CreatePostModal from "../CreatePostModal";

export default function AddNewPost() {
  const auth = useAuth();
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  function openCreatePostModal() {
    setIsOpenModal(true);

    console.log("openCreatePostModal");
  }
  function closeCreatePostModel() {
    setIsOpenModal(false);
  }
  return (
    <div className="m-2 text-unactive">
      <CreatePostModal
        closeModal={closeCreatePostModel}
        isOpen={isOpenModal}
        contentLabel="create post"
      />
      <div className={`flex gap-x-2 ml py-2 pb-3`}>
        <div className="flex items-center justify-center">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src={auth.user?.userDetail.avatarURL}
            alt="avatar"
          />
        </div>
        <div
          onClick={openCreatePostModal}
          className="bg-[#F0F2F5] grow rounded-full flex items-center p-2 cursor-pointer"
        >
          <input
            type="text"
            onClick={openCreatePostModal}
            disabled
            name="status"
            className="flex-grow hidden bg-transparent outline-none cursor-pointer xl:flex"
            placeholder="What's on your mind, Hoangf?"
          />
        </div>
      </div>
      <div className="flex py-2 pb-0 text-center border-t border-solid gap-x-1">
        <div className="basis-1/3 rounded-lg p-2 hover:bg-[#F0F2F5]">
          Live video
        </div>
        <div className="basis-1/3 rounded-lg p-2 hover:bg-[#F0F2F5]">
          Photo/Video
        </div>
        <div className="basis-1/3 rounded-lg p-2 hover:bg-[#F0F2F5]">
          Feeling/activity
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import SignupModal from '../../Components/SignupModal'
import LoginCard from '../../Components/LoginCard'



export default function DefaultPage() {

    const [isOpenModal, setIsOpenModal] = React.useState(false);

    function openSignupModal() {
        setIsOpenModal(true)
    }
    function closeSignupModel() {
        setIsOpenModal(false)
    }


    return (
        <div className='w-full bg-[#f0f2f5] h-screen lg:grid lg:place-items-center'>
            <SignupModal closeModal={closeSignupModel} isOpen={isOpenModal} contentLabel={'Signup'} />
            <div className="flex flex-col max-w-[400px] lg:-mt-28 lg:max-w-5xl lg:flex-row mx-auto  gap-y-4 lg:gap-x-5 pt-3">
                <div className="text-center lg:text-left flex flex-col gap-y-2 lg:justify-center">
                    <h1 className='font-bold text-[64px] text-fbblue lg:leading-[60px]'>Facebook</h1>
                    <h2 className='text-2xl leading-7 font-normal' >Facebook helps you connect and share with the people in your life.</h2>
                </div>
                <div className="mt-6 lg:w-1/2">
                    <LoginCard openSignupModal={openSignupModal} />
                    <div className='text-[14px] text-center mt-4'><b>Create a Page </b>for a celebrity, brand or business.</div>
                </div>
            </div>
        </div>
    );
}
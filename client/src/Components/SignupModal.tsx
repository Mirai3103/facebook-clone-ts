import React from 'react';
import { DropdownDate } from 'react-dropdown-date';
import { useToast } from '../Contexts/Toast';
import authService, { Genders } from '../Services/AuthService';
import Modal from './Modal';

interface LoginModalProps {
    closeModal: () => void;
    isOpen: boolean;
    contentLabel: string;

}
const formatDate = (date: string) => {
    // formats a JS date to 'yyyy-mm-dd'
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
};



export default function LoginModal({ closeModal, isOpen, contentLabel }: LoginModalProps) {
    const Toast = useToast();
    const [file, setFile] = React.useState<File | null>(null);
    const onfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let files = e.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }

    }

    const [userInfo, setUserInfo] = React.useState({
        firstName: '',
        lastName: '',
        username: '',
        dateOfBirth: formatDate(new Date().toDateString()),
        gender: '',
        password: ''
    })

    const updateUser = (key: string, value: string) => {
        setUserInfo({ ...userInfo, [key]: value });
    }

    const handleSignup = () => {
        //toDo: validate
        authService.register({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.username,
            birthday: new Date(userInfo.dateOfBirth),
            gender: Number(userInfo.gender),
            pwdHash: userInfo.password,
        }, file as File).then(res => {
            Toast.showToast(<div className='text-green-500'>Success</div>, <div>Đăng ký thành công, mời bạn đăng nhập</div>, 5000)
            closeModal();
        }).catch(e => {
            console.log(e);
            Toast.showToast(<div className='text-red-500'>Error</div>, <div>{e.response.data.error}</div>, 5000)
        })
    }

    const Body = <div className='grid grid-cols-2 gap-2 mt-3'>

        <div className='bg-[#f5f6f7] border-solid border-2 border-[#dadde1] p-2'>
            <input type="text" name="firstName" value={userInfo.firstName} onChange={(e) => updateUser('firstName', e.target.value)} className='w-full outline-none bg-[#f5f6f7]' placeholder='Frist name' />
        </div>
        <div className='bg-[#f5f6f7] border-solid border-2 border-[#dadde1] p-2'>
            <input type="text" name="lastName" value={userInfo.lastName} onChange={(e) => updateUser('lastName', e.target.value)} className='w-full outline-none bg-[#f5f6f7]' placeholder='Last name' />
        </div>
        <div className="col-span-2 bg-[#f5f6f7] border-solid border-2 border-[#dadde1] p-2">
            <input type="text" name="username" value={userInfo.username} onChange={(e) => updateUser('username', e.target.value)} className='w-full outline-none bg-[#f5f6f7]' placeholder='Mobile number or email address' />
        </div>
        <div className="col-span-2 bg-[#f5f6f7] border-solid border-2 border-[#dadde1] p-2">
            <input type="password" name="password" value={userInfo.password} onChange={(e) => updateUser('password', e.target.value)} className='w-full outline-none bg-[#f5f6f7]' placeholder='New password' />
        </div>
        <div className="col-span-2">
            <label className='text-xs'>Date of birth</label>
            <div className=" date-picker">

                <DropdownDate
                    selectedDate={userInfo.dateOfBirth}
                    onDateChange={(date: any) => updateUser('dateOfBirth', formatDate(date))}
                />

            </div>
        </div>


        <div className="col-span-2 ">
            <label className='text-xs'>Gender</label>
            <div className='grid grid-cols-3 gap-x-4'>
                <div className='flex items-center justify-between border-solid rounded-md border-gray-300 border-2 px-2 py-1'>
                    <label htmlFor='female'>Female</label>
                    <input type="radio" onChange={e => e.target.checked ? updateUser('gender', '0') : null} id="female" name="gender" value="female"></input>
                </div>
                <div className='flex items-center justify-between border-solid rounded-md border-gray-300 border-2 px-2'>
                    <label htmlFor='male'>Male</label>
                    <input type="radio" onChange={e => e.target.checked ? updateUser('gender', '1') : null} id="male" name="gender" value="male"></input>
                </div>
                <div className='flex items-center justify-between border-solid rounded-md border-gray-300 border-2 px-2'>
                    <label htmlFor='gay'>Orther</label>
                    <input type="radio" onChange={e => e.target.checked ? updateUser('gender', '2') : null} id="gay" name="gender" value="gay"></input>
                </div>
                <div>
                    <input onChange={onfileChange} type="file" name="Avatar" id="" />
                </div>
            </div>
        </div>
        <div className="col-span-2 text-[10px] leading-3 mt-3">People who use our service may have uploaded your contact information to Facebook.<span className='text-fbblue hover:border-solid hover:border-b hover:border-fbblue'> Learn more.</span></div>
        <div className="col-span-2 text-[10px] leading-3 mt-3">By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time.</div>
    </div>
    const Header = <div className='border-solid border-b-2'>
        <h1 className='text-[32px] leading-9 font-semibold'>Sign Up</h1>
        <h4 className='text-[15px] leading-6 mb-2'>It's quick and easy.</h4>
    </div>
    const Footer = <div className='px-24'><button onClick={handleSignup} className='bg-[#00a400] py-2 mt-3 text-white w-full rounded-md font-bold'>Sign Up</button></div>

    return (<Modal isOpen={isOpen} contentLabel={contentLabel} className='max-w-[400px]' body={Body} header={Header} footer={Footer} closeModal={closeModal} />
    )
}

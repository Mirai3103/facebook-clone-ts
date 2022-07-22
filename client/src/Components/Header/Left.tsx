import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'

interface Props { className?: string | '' }

export default function Left({ className }: Props) {
    const handleGoHome = () => {
        window.location.href = '/';
    }
    const navigate = useNavigate();
    const [searchQuery, setSearchQuey] = React.useState<string>('');
    const handleSearch = () => {
        navigate('/search?name=' + searchQuery);
    }
    return (
        <div className={`flex gap-x-2 ml ${className}`}>
            <div onClick={handleGoHome} className='cursor-pointer'><img src={require('../../Assets/Images/fblogo.png')} alt="logo" width={40} height={40} /></div>
            <div className='bg-[#F0F2F5] rounded-full flex items-center p-2'>
                <IoIosSearch size={20} color='#6F7174' className='flex-none mx-1' />
                <input value={searchQuery} onChange={(e) => setSearchQuey(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSearch() }} type="text" name="search on facebook" className='hidden xl:flex flex-grow outline-none bg-transparent' placeholder='Search Facebook' />
            </div>
        </div>
    )
}
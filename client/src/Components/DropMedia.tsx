import React from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { GrClose } from 'react-icons/gr';

interface DropMediaProps {
    setFile: (file: File | null) => void;
}

export default function DropMedia({ setFile }: DropMediaProps) {
    const imageInputId = React.useId();
    const [preview, setPreview] = React.useState<JSX.Element | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        console.log(file)
        if (file) {
            URL.revokeObjectURL(preview?.props.src)
            let src = URL.createObjectURL(file[0]);
            const image = <img src={src} className='w-full h-auto object-cover' alt='preview' />
            setPreview(image)
            setFile(file[0])
        }

    }
    const handleClear = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        URL.revokeObjectURL(preview?.props.src)
        setPreview(null)
    }

    return (
        <div className='w-full border border-solid rounded-md p-2 min-h-[200px] flex flex-col '>
            <div className='hidden'>
                <input id={imageInputId} onChange={handleChange} type="file" accept='image/*,image/heif,image/heic' />
            </div>
            <div className='relative grow h-full flex flex-col items-center justify-center '>
                <div onClick={handleClear} className='absolute p-2 cursor-pointer bg-white border border-solid rounded-full top-2 right-2 flex items-center justify-center'><GrClose size={15} /></div>
                {
                    preview ? preview :
                        <label htmlFor={imageInputId} className='w-full h-full rounded-md bg-slate-100 grow hover:bg-slate-200 items-center flex flex-col text-center justify-center ' >
                            <div className='text-unactive flex items-center justify-center p-1 rounded-full bg-slate-300'><MdAddPhotoAlternate size={30} /></div>
                            <div className='font-medium text-lg'>Add photo/video</div>
                            <div className='font-light text-xs text-unactive'>or drag and drop</div>
                        </label>
                }
            </div>
        </div>)
}
//video/*,video/mp4,video/x-m4v,video/x-matroska,.mkv
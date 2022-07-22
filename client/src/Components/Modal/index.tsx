import React from 'react'
import { GrFormClose } from 'react-icons/gr';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)',
    },
};

interface ModalProps {
    closeModal: () => void;
    className?: string | '';
    body: JSX.Element;
    header: JSX.Element;
    footer: JSX.Element;
    isOpen: boolean;
    contentLabel: string;
    style?: Modal.Styles;

}
export type ModalType = Modal.Styles;

export default function CustomModal({ closeModal, className, header, footer, body, isOpen, contentLabel, style }: ModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            contentLabel={contentLabel}
            style={customStyles}
            onRequestClose={closeModal}
            overlayRef={(el) => {
                if (el) {
                    el.style.zIndex = '20';
                }
            }
            }
        >

            <div>
                <div className={`flex flex-col ${className} relative gap-y-1`}>
                    <GrFormClose className='absolute -top-2 -right-2 cursor-pointer' size={30} onClick={closeModal} />
                    {header}
                    {body}
                    {footer}
                </div>
            </div>
        </Modal>



    )

}
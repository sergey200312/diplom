import React, { FC } from 'react'

interface IConfirmModalProps {
    isOpen: boolean
    title: string
    onClose: () => void
    onConfirm: () => void
}
export const ConfirmModal: FC<IConfirmModalProps> = ({ isOpen, title, onClose, onConfirm}) => {

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 flex items-center justify-center backdrop-blur bg-black bg-opacity-50'>
            <div className='rounded-md bg-white mx-auto p-4 '>
                <h2 className='mb-4'>{title}</h2>
                <div className='flex justify-center items-center gap-4'>
                    <button className='rounded-md border border-gray-300 p-1' onClick={onClose}>Отмена</button>
                    <button className='rounded-md border bg-blue-500 text-white p-1' onClick={onConfirm}>Подтвердить</button>
                </div>
            </div>
        </div>
    )
}

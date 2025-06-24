import { useState } from 'react';
import CreateGroup from './CreateGroup';
import GroupList from './GroupList';
import { useGroups } from '../Context/api/GroupsContext';

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const { selectedGroup } = useGroups();
    return (
        <div className={`relative flex flex-col w-1/4 max-sm:w-full space-y-4 h-screen ${selectedGroup ? 'max-sm:hidden' : ''}`}>
            <h1 className='font-semibold text-3xl justify-center mx-auto my-8'>Pocket Notes</h1>
            <div className='overflow-y-auto [&::-webkit-scrollbar-track]:bg-gray-300 [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-track]:rounded-md'>
                <GroupList />
                <div
                    onClick={() => setOpen(!open)}
                    className='fixed bottom-3 left-66 inline-flex justify-end items-center cursor-pointer mr-3'
                >
                    <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="46.5" cy="46.5" r="46.5" fill="#16008B" />
                        <path d="M63.3672 42.7246V50.1416H29.2559V42.7246H63.3672ZM50.3105 28.7793V65.0098H42.3467V28.7793H50.3105Z" fill="white" />
                    </svg>
                </div>
            </div>
            {open &&
                <div
                    className='fixed inset-0 flex items-center justify-center bg-[#2F2F2F]/75 z-50'
                    onClick={() => setOpen(false)}
                >
                    <div
                        className='relative'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CreateGroup setOpen={setOpen} />
                    </div>
                </div>
            }
        </div>

    )
}

export default Sidebar;

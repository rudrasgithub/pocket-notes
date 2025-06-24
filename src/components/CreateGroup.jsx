import { useState } from "react";
import { useGroups } from "../Context/api/GroupsContext";

const CreateGroup = ({ setOpen }) => {
    const { groups, setGroups } = useGroups();
    console.log('Groups:', groups);

    const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];
    const [groupName, setGroupName] = useState('');
    const [activeColor, setActiveColor] = useState(colors[0]);

    const handleCreateGroup = (e) => {
        e.preventDefault();
        const trimmedName = groupName.trim();

        if (!trimmedName) {
            alert("Group Name is required!");
            return;
        }
        if (trimmedName.length < 2) {
            alert("Group Name must be at least 2 characters long!");
            return;
        }

        const existingGroup = groups?.some(group => group.name === trimmedName);
        if (existingGroup) {
            alert("Group with this name already exists!");
            return;
        }

        const newGroup = {
            name: trimmedName,
            color: activeColor,
            notes: []
        };

        setGroups(prevGroups => [...prevGroups, newGroup]);
        setOpen(false);
    };

    return (
        <div className='relative bg-white pt-6 pl-8 max-sm:pl-4 pr-8 max-sm:pr-3 pb-4 w-[550px] max-sm:w-[350px] flex flex-col space-y-5 rounded-lg'>
            <h1 className="font-semibold text-2xl">Create New Group</h1>
            <form onSubmit={handleCreateGroup} className="space-y-8">
                <div className="flex justify-center items-center space-x-10 max-sm:space-x-4">
                    <span className="text-nowrap text-xl font-semibold">Group Name</span>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-3xl px-6 max-sm:px-4 py-2 w-full"
                        placeholder="Enter group name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </div>

                <div className="flex space-x-14 max-sm:space-x-7">
                    <span className="text-xl font-semibold">Choose Color</span>
                    <div className="flex gap-2">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveColor(color)}
                                style={{
                                    backgroundColor: color,
                                    border: activeColor === color ? '2px solid black' : 'none'
                                }}
                                className="cursor-pointer rounded-full w-7 h-7"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-end max-sm:justify-center">
                    <button
                        type="submit"
                        className={`bg-[#001F8B] w-fit text-white text-xl px-10 max-sm:px-20 py-1 max-sm:py-2 rounded-lg 
                            ${!groupName.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        disabled={!groupName.trim()}
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateGroup;
import { useState } from "react";
import { useGroups } from "../Context/api/GroupsContext";
import "../css/CreateGroup.css";

const CreateGroup = ({ setOpen }) => {
    const { groups, setGroups } = useGroups();

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
        <div className="create-group-container">
            <h1 className="create-group-title">Create New Group</h1>
            <form onSubmit={handleCreateGroup} className="create-group-form">
                <div className="form-row">
                    <span className="form-label">Group Name</span>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Enter group name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row-2">
                    <span className="form-label">Choose Color</span>
                    <div className="color-options">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveColor(color)}
                                style={{
                                    backgroundColor: color,
                                    border: activeColor === color ? '2px solid black' : 'none'
                                }}
                                className="color-circle"
                            />
                        ))}
                    </div>
                </div>

                <div className="form-submit-row">
                    <button
                        type="submit"
                        className={`submit-btn ${!groupName.trim() ? 'disabled' : ''}`}
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

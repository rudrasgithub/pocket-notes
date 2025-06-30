import { useEffect, useState } from 'react';
import { useGroups } from '../Context/api/GroupsContext';
import getInitials from '../utils/lib';
import '../css/NotePage.css';

const NotePage = () => {
    const { setGroups, selectedGroup, setSelectedGroup } = useGroups();
    const [text, setText] = useState('');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (selectedGroup) {
            setNotes(selectedGroup.notes || []);
        }
    }, [selectedGroup]);

    const handleCreateNote = () => {
        if (!text.trim()) return;

        const newNote = {
            text: text.trim(),
            timestamp: timeFormat()
        };

        setGroups(prevGroups =>
            prevGroups.map(g =>
                g.name === selectedGroup.name
                    ? { ...g, notes: [...g.notes, newNote] }
                    : g
            )
        );

        setSelectedGroup({
            ...selectedGroup,
            notes: [...selectedGroup.notes, newNote]
        });

        setText('');
    };

    const timeFormat = () => {
        const timeStamp = new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        const fullDate = timeStamp.split('at');
        const newDate = fullDate[0].split(',');
        const MonthDay = newDate[0].split(' ');
        const date = MonthDay[1] + ' ' + MonthDay[0] + newDate[1];
        const time = fullDate[1];
        return [date, time];
    };

    return (
        <div className="note-container">
            <div className="note-header">
                <div className="note-back" onClick={() => setSelectedGroup(null)}>
                    <svg width="20" height="17" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.27495 10.85C6.47495 10.65 6.57095 10.4083 6.56295 10.125C6.55495 9.84167 6.45061 9.6 6.24995 9.4L3.42495 6.575H14.5749C14.8583 6.575 15.0959 6.479 15.2879 6.287C15.4799 6.095 15.5756 5.85767 15.5749 5.575C15.5749 5.29167 15.4789 5.054 15.2869 4.862C15.0949 4.67 14.8576 4.57433 14.5749 4.575H3.42495L6.27495 1.725C6.47495 1.525 6.57495 1.28733 6.57495 1.012C6.57495 0.736666 6.47495 0.499333 6.27495 0.3C6.07495 0.0999997 5.83728 0 5.56195 0C5.28661 0 5.04928 0.0999997 4.84995 0.3L0.274948 4.875C0.174948 4.975 0.103947 5.08333 0.0619469 5.2C0.0199471 5.31667 -0.000720024 5.44167 -5.34058e-05 5.575C-5.34058e-05 5.70833 0.0209484 5.83333 0.0629482 5.95C0.104948 6.06667 0.175614 6.175 0.274948 6.275L4.87495 10.875C5.05828 11.0583 5.28728 11.15 5.56195 11.15C5.83661 11.15 6.07428 11.05 6.27495 10.85Z" fill="white" />
                    </svg>
                </div>
                <div
                    className="note-avatar"
                    style={{ backgroundColor: selectedGroup.color }}
                >
                    {getInitials(selectedGroup.name)}
                </div>
                <h1 className="note-title">{selectedGroup.name}</h1>
            </div>

            <div className="note-list">
                {notes.map(note => (
                    <div className="note-card" key={note.timestamp}>
                        <div className="note-text">{note.text}</div>
                        <div className="note-timestamp">
                            {note.timestamp[0]} <span className="dot" /> {note.timestamp[1]}
                        </div>
                    </div>
                ))}
            </div>

            <div className="note-input-section">
                <textarea
                    className="note-textarea"
                    placeholder="Enter your text here..........."
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleCreateNote();
                        }
                    }}
                    autoFocus
                    value={text}
                />
                <button onClick={handleCreateNote} className="send-button">
                    <svg width="35" height="29" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z" fill={text ? '#001F8B' : '#ABABAB'} />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NotePage;

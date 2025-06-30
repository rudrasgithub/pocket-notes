import { useState } from 'react';
import CreateGroup from './CreateGroup';
import GroupList from './GroupList';
import { useGroups } from '../Context/api/GroupsContext';
import '../css/Sidebar.css';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { selectedGroup } = useGroups();

  return (
    <div className={`sidebar ${selectedGroup ? 'hidden-on-mobile' : ''}`}>
      <h1 className="sidebar-title">Pocket Notes</h1>

      <div className="group-scroll-container">
        <GroupList />
        <div
          onClick={() => setOpen(!open)}
          className="create-group-btn"
        >
          <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="46.5" cy="46.5" r="46.5" fill="#16008B" />
            <path d="M63.3672 42.7246V50.1416H29.2559V42.7246H63.3672ZM50.3105 28.7793V65.0098H42.3467V28.7793H50.3105Z" fill="white" />
          </svg>
        </div>
      </div>

      {open && (
        <div
          className="modal-overlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <CreateGroup setOpen={setOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

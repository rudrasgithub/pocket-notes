import { useGroups } from '../Context/api/GroupsContext';
import getInitials from '../utils/lib.js';
import '../css/GroupList.css';

const GroupList = () => {
  const { groups, selectedGroup, setSelectedGroup } = useGroups();

  const handleSelectedGroup = (group) => {
    localStorage.setItem('selectedGroup', JSON.stringify(group));
    setSelectedGroup(group);
  };

  return (
    <div className="group-list-wrapper">
      {groups && groups.map((group, index) => (
        <div
          key={index}
          onClick={() => handleSelectedGroup(group)}
          className={`group-list-item ${selectedGroup?.name === group.name ? 'selected' : ''}`}
        >
          <span
            className="group-avatar"
            style={{ backgroundColor: group.color }}
          >
            {getInitials(group.name)}
          </span>
          <span className="group-name">
            {group.name.slice(0, 20)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default GroupList;

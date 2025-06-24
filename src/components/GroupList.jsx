import { useGroups } from '../Context/api/GroupsContext';
import getInitials from '../utils/lib.js';

const GroupList = () => {
  const { groups, selectedGroup, setSelectedGroup } = useGroups();
  console.log('Groups:', groups);

  const handleSelectedGroup = (group) => {
    localStorage.setItem('selectedGroup', JSON.stringify(group));
    setSelectedGroup(group)
  }

  return (
    <div className='flex flex-1 flex-col items-center'>
      {groups ? (
        groups.map((group, index) => {
          return (
            <div
              key={index}
              onClick={() => handleSelectedGroup(group)}
              className={`mb-1 pl-7 py-2 cursor-pointer flex text-center items-center rounded-2xl gap-x-4 w-full hover:bg-gray-200 ${selectedGroup && selectedGroup.name === group.name ? 'bg-gray-300' : ''}`}
            >
              <span
                className="inline-flex items-center rounded-full justify-center w-15 h-15 text-white font-semibold"
                style={{ backgroundColor: group.color }}
              >
                {getInitials(group.name)}
              </span>
              <span className='font-semibold text-xl'>{group.name.slice(0, 20)}</span>
            </div>
          )
        })
      ) : <></>
      }
    </div>
  )
}

export default GroupList
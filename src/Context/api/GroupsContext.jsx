import { createContext, useContext, useEffect, useState } from 'react'

const GroupsContext = createContext();

const GroupsProvider = ({ children }) => {
  
  const [groups, setGroups] = useState(() => {
    return JSON.parse(localStorage.getItem('groups')) || [];
  });
  const [selectedGroup, setSelectedGroup] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedGroup')) || null;
  });

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('selectedGroup', JSON.stringify(selectedGroup));
  }, [selectedGroup]);

  return (
    <GroupsContext.Provider value={{ groups, setGroups, selectedGroup, setSelectedGroup }}>
      {children}
    </GroupsContext.Provider>
  )
}

export const useGroups = () => {
  return useContext(GroupsContext);
}

export default GroupsProvider;
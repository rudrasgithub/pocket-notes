import Sidebar from './Sidebar'
import Home from './Home'
import NotePage from './NotePage'
import { useGroups } from '../Context/api/GroupsContext';

const LandingPage = () => {
    const { selectedGroup } = useGroups();
    console.log('Selected Group:', selectedGroup);

    return (
        <div className='flex h-screen w-full'>
            <Sidebar />
            {selectedGroup ? <NotePage /> : <Home />}
        </div>
    )
}

export default LandingPage
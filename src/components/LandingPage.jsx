import Sidebar from './Sidebar';
import Home from './Home';
import NotePage from './NotePage';
import { useGroups } from '../Context/api/GroupsContext';
import '../css/LandingPage.css';

const LandingPage = () => {
    const { selectedGroup } = useGroups();
    console.log('Selected Group:', selectedGroup);

    return (
        <div className="landing-page-container">
            <Sidebar />
            {selectedGroup ? <NotePage /> : <Home />}
        </div>
    );
};

export default LandingPage;

import { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './features/appHeader/AppHeader';
import { Messages } from './features/messages/Messages';
import Notification from './features/notifications/Notification';
import ProjectPage from './pages/project/ProjectPage';
import TasksPage from './pages/task/TasksPage';
import BoardPage from './pages/board/BoardPage';
import { retrieveValueSessionStorage } from './utils/sessionStorage/SessionStorageUtil';
import { Navigate, useNavigate } from 'react-router-dom';
import TeamPage from './pages/team/TeamPage';
import AppDrawer from './features/appDrawer/AppDrawer';
import { CheckTokenExpired } from './services/CheckTokenExpired';
import { LoadingContext } from './services/LoadingContext';
import { CircularProgress } from '@mui/material';

function App() {
  const [isLoading, setIsLoading] = useState(false)

  const [isMessagesOpen, setIsMessagesOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const [unreadMessages, setUnreadMessages] = useState(0)
  const [unreadNotifications, setunreadMessages] = useState(0)
  const navigate = useNavigate()
  const [selectedPage, setSelectedPage] = useState("Project")
  const [content, setContent] = useState(<ProjectPage />)

  useEffect(() => {
    displayPage(selectedPage, setContent)
  }, [selectedPage])

  const displayPage = (selectedPage_arg, setContent_arg) => {
    switch (selectedPage_arg) {
      case 'Projects': setContent_arg(<ProjectPage />)
        break;
      case 'Tasks': setContent_arg(<TasksPage />)
        break;
      case 'Board': setContent_arg(<BoardPage />)
        break;
      case 'Team': setContent_arg(<TeamPage />)
    }
  }

  const isTokenValid = () => {
    let isUserTokenValid = false
    if (retrieveValueSessionStorage('token') != null) {
      if (!CheckTokenExpired(JSON.parse(retrieveValueSessionStorage('token')).expiry)) {
        isUserTokenValid = true
      }
    }
    return isUserTokenValid
  }

  return (
    <section className="App">
      {
        isTokenValid() ? <>
          <LoadingContext.Provider value={setIsLoading }>
            <section className='page-display'>
              <AppDrawer setSelectedPage={setSelectedPage} />
              {content}
              <AppHeader setIsMessagesOpen={setIsMessagesOpen} setIsNotificationOpen={setIsNotificationOpen} unreadMessages={unreadMessages} unreadNotifications={unreadNotifications} />
            </section>
          </LoadingContext.Provider>
          <Messages isMessagesOpen={isMessagesOpen} setIsMessagesOpen={setIsMessagesOpen} setUnreadMessages={setUnreadMessages} />
          <Notification isNotificationOpen={isNotificationOpen} setIsNotificationOpen={setIsNotificationOpen} setunreadMessages={setunreadMessages} />
          {isLoading ? <CircularProgress className='progress_indicator' /> : <></>}
        </> : <Navigate to="/login" />
      }
    </section>
  );
}

export default App;

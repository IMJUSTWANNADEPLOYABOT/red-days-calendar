import { useState, useEffect} from 'react'
import AuthPage from "./components/AuthPage"
import Record from './components/Record'
import recordService from './services/records'


const App = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('LoggedRedDaysUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      recordService.setToken(user.token)
    }
  }, [])


  return (
    <>
    {user ? <Record user={user} setUser={setUser}/> : <AuthPage setUser={setUser}/>}
    </>
  )
}

export default App
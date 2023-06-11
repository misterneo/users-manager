import Users from './pages/Users'
import UserContextProvider from './context/UserContext'

function App() {
  return (
    <UserContextProvider>
      <Users />
    </UserContextProvider>
  )
}

export default App
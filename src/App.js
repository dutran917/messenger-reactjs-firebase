import './App.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ChatRoom from './Components/ChatRoom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoom from './Components/Modal/AddRoom';
import AddMember from './Components/Modal/AddMember';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/' component={ChatRoom}></Route>
          </Switch>
          <AddRoom></AddRoom>
          <AddMember></AddMember>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

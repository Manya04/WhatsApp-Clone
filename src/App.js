import './App.css';
 import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Chat  from './Chat/Chat';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './login/Login';
import {useStateValue} from "./StateProvider"

function App() {

  const [{user}, dispatch] = useStateValue();


  // const [user, setUser] = useState(null)
  return (
    //BEM naming convention 
    <div className="app">
      {!user ? (
      <Login></Login>
      ): (
        <div className="app_body">
        <Router>
        <Sidebar ></Sidebar>
          <Switch>
          
            <Route path="/rooms/:roomId"> 
        <Chat ></Chat>
        </Route>
        <Route path="/"></Route>
        </Switch>
        </Router>
        
      </div>
      ) }
      
    </div>
  );
}

export default App;

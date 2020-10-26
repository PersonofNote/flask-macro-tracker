/** 
 * TODO next: 
 * -Add client-side validation to forms
 *    -MaterialUI has built-in validation, consider using
 * -Add login/register pages in React
 * -Add check for logged-in user
 * -Style router menu
*/

import React, { useState, useEffect, PureComponent } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import './App.css'
import Dashboard from './components/Dashboard'
import GraphPage from './components/GraphPage'
import UpdatePage from './components/UpdatePage'
import Login from './components/Login'

function App() {
// Refactored to one GET request that is passed down
// TODO: Look into this. It feels smelly/bad code to have a request in every component, but need to repopulate
// the data in the single page
/*
const [userData, setUserData] = useState(0);

  useEffect(() => {
  fetch('/user', {
      headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      }}).then(res => res.json()).then(data => {
      setUserData(data);
  });
  }, []);
*/

  return (
    <div className="App" style={{height: `100vh`}}>
      <div>
      <Router>
        <div>
          <nav style={{
          
            }}>
            <ul style={{
              listStyle: `none`,
              display: `flex`,
              flexDirection: `row`,
              justifyContent: `space-evenly`
          }}>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/graph">Graph</Link>
              </li>
              <li>
                <Link to="/update">Update Info</Link>
              </li>
              <Link to="/logout">Logout</Link>
            </ul>
          </nav>
          <Switch>
            <Route path="/dashboard">
              <Dashboard/>
            </Route>
            <Route path="/graph">
              <GraphPage />
            </Route>
            <Route path="/update">
              <UpdatePage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
   

    </div>
  );
}

export default App;

/** 
 * TODO next: 
 * -Implement POST request to /update endpoint
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

function App() {

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
                <Link to="/user">Home</Link>
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
            <Route path="/user">
              <Dashboard />
            </Route>
            <Route path="/graph">
              <GraphPage />
            </Route>
            <Route path="/update">
              <UpdatePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
   

    </div>
  );
}

export default App;

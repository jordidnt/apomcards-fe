import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Home from './screens/Home';
import NewGame from './screens/NewGame';
import HostedGame from './screens/HostedGame';
import JoinedGame from './screens/JoinedGame';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/about">
            <h2>About</h2>
          </Route>
          <Route path="/newGame">
            <NewGame />
          </Route>
          <Route path="/game/:id">
            <HostedGame />
          </Route>
          <Route path="/joinedGame/:gameId/:participantId">
            <JoinedGame />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;

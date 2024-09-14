import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ClassPage from './components/ClassPage';
import SessionPage from './components/SessionPage';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute path="/class/:id" component={ClassPage} />
        <ProtectedRoute path="/session/:id" component={SessionPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
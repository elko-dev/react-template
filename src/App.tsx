import React from 'react';
import { UserStore } from './stores/UserStore';
import SignupPage from './component/auth/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './component/auth/PrivateRoute';
import LoginPage from './component/auth/Login';
import HomePage from './component/pages/HomePage';

const App: React.FC = () => {
  const userStore: UserStore = new UserStore();

  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignupPage userStore={userStore} />
        </Route>
        <Route path="/login">
          <LoginPage userStore={userStore} />
        </Route>
        <PrivateRoute userStore={userStore} path="/">
          <HomePage userStore={userStore} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default App;

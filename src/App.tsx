import React from 'react';
import { UserStore } from './stores/UserStore';
import SignupPage from './component/auth/Signup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './component/auth/Login';

const App: React.FC = () => {
  const userStore: UserStore = new UserStore();
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/signup">
            <SignupPage userStore={userStore} />
          </Route>
          <Route path="/login">
            <LoginPage userStore={userStore} />
          </Route>
        </Switch>
      </div>
      <Redirect to="/signup" />
    </Router>
  );
};

export default App;

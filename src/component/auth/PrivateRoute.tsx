import React, { Component } from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { UserStore } from '../../stores/UserStore';

interface Props extends RouteProps {
  userStore: UserStore;
}

class PrivateRoute extends Component<Props> {
  public render() {
    const { userStore, children, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={({ location }) =>
          userStore.currentUser ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
}

export default PrivateRoute;

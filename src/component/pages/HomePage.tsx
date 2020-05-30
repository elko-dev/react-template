import React, { Component } from 'react';
import { UserStore } from '../../stores/UserStore';

interface Props {
  userStore: UserStore;
}

class HomePage extends Component<Props> {
  public render() {
    return (
      <div>Welcome to Elko, {this.props.userStore.currentUser?.firstName}!</div>
    );
  }
}

export default HomePage;

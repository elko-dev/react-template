import * as React from 'react';
import { UserStore } from '../../stores/UserStore';
import Graphic from './shared/graphic';
import SignupForm from './form/SignupForm';
import { User } from '../../model/User';
import { BrowserRouterProps, Redirect } from 'react-router-dom';

interface State {
  signedIn: boolean;
}

interface Props extends BrowserRouterProps {
  userStore: UserStore;
}

class SignupPage extends React.Component<Props, State> {
  public state: State = {
    signedIn: false,
  };

  public render() {
    return this.state.signedIn ? (
      <Redirect to="/login" />
    ) : (
      <div style={containerStyle}>
        <SignupForm
          style={leftContainerStyle}
          userStore={this.props.userStore}
          handleSignup={this.handleSignUp}
        />
        <Graphic style={rightContainerStyle} />
      </div>
    );
  }
  private handleSignUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) => {
    try {
      const user: User = await this.props.userStore.signUp(
        email,
        password,
        firstName,
        lastName,
        phoneNumber
      );
      console.log('Created user ', user);
      this.setState({
        signedIn: true,
      });
    } catch (errors) {
      console.log(errors);
      alert(errors);
    }
  };
}

const rightContainerStyle: React.CSSProperties = {
  width: '50%',
  minHeight: '650px',
  backgroundColor: '#109CF1',
};

const leftContainerStyle: React.CSSProperties = {
  width: '50%',
  minHeight: '650px',
  backgroundColor: '#E5E5E5',
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  height: '100%',
  flexDirection: 'row',
};

export default SignupPage;

import * as React from 'react';
import { Redirect } from 'react-router';
import { UserStore } from '../../stores/UserStore';
import { User } from '../../model/User';

interface State {
  loginError: string | null;
  authenticated: boolean;
  email?: string;
  password?: string;
}

interface Props {
  userStore: UserStore;
}

class LoginPage extends React.Component<Props, State> {
  public state: State = {
    loginError: null,
    authenticated: Boolean(this.props.userStore.currentUser),
  };

  public render() {
    return this.state.authenticated ? (
      <Redirect to="/" />
    ) : (
      <div style={containerStyle}>
        <div style={rightContainerStyle}></div>
        <div style={leftContainerStyle}>
          <h1>Elko</h1>
          <div>Log into Admin portal</div>

          <div style={loginForm}>
            <form style={{ width: 400 }}>
              <div style={formField}>
                <input
                  onChange={(e) => this.setState({ email: e.target.value })}
                  style={inputStyle}
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
              </div>
              <div style={formField}>
                <input
                  onChange={(e) => this.setState({ password: e.target.value })}
                  style={inputStyle}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </div>
              <div style={formField}>
                <button
                  style={submitBtn}
                  type="button"
                  onClick={() => this.handleLogin()}
                >
                  Login
                </button>
              </div>
            </form>
          </div>

          {this.state.loginError && (
            <div style={errorBlock}>{this.state.loginError}</div>
          )}
        </div>
      </div>
    );
  }

  private handleLogin = async () => {
    try {
      const user: User = await this.props.userStore.login(
        this.state.email!,
        this.state.password!
      );
      console.log('Logged in user ', user);
      this.setState({
        authenticated: true,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loginError: error.message,
      });
    }
  };
}

const rightContainerStyle: React.CSSProperties = {
  width: '50%',
  backgroundColor: '#109CF1',
};

const leftContainerStyle: React.CSSProperties = {
  width: '50%',
  backgroundColor: '#E5E5E5',
};
const containerStyle: React.CSSProperties = {
  display: 'flex',
  height: '100%',
  flexDirection: 'row-reverse',
};

const loginForm: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1rem',
};

const formField: React.CSSProperties = {
  marginBottom: '2rem',
};

const submitBtn: React.CSSProperties = {
  padding: '15px',
  width: 100,
};

const errorBlock: React.CSSProperties = {
  color: 'red',
};

export default LoginPage;

import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserStore } from '../../stores/UserStore';
import { User } from '../../model/User';

interface Props {
  userStore: UserStore;
}

interface LocationState {
  from?: Location;
}

function LoginPage(props: Props) {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const handleLogin = async () => {
    const from = location.state.from || { pathname: '/' };

    try {
      const user: User = await props.userStore.login(email!, password!);

      console.log('Logged in user ', user);

      history.replace(from);
    } catch (error) {
      console.log(error);
      setLoginError(error.errorMessage);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={rightContainerStyle}></div>
      <div style={leftContainerStyle}>
        <h1>Elko</h1>
        <div>Log into Admin portal</div>

        <div style={loginForm}>
          <form style={{ width: 400 }}>
            <div style={formField}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
            </div>
            <div style={formField}>
              <input
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>
            <div style={formField}>
              <button style={submitBtn} type="button" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
        </div>

        <div>
          Don't have an account yet? Sign up <a href="/signup">here</a>.
        </div>

        {loginError && <div style={errorBlock}>{loginError}</div>}
      </div>
    </div>
  );
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

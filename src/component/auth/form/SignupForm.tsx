import * as React from 'react';
import { UserStore } from '../../../stores/UserStore';

interface State {
    email: string
    password: string
    firstName: string
    lastName: string
    phoneNumber: string
}
interface Props {
    style: React.CSSProperties
    userStore: UserStore
    signUpSuccess: (email: string, password: string, firstName: string, lastName: string, phoneNumber: string) => void;

}


export default class SignupForm extends React.Component<Props, State> {
    public render() {
        return (
            <div style={this.props.style}>
                <div style={{ textAlign: 'center' }}>SignUp</div>

                <div style={loginForm}>
                    <form style={{ width: 400 }}>
                        <div style={formField}>
                            <input onChange={e => this.setState({ email: e.target.value })} style={inputStyle} type="text" placeholder="Email" />
                        </div>
                        <div style={formField}>
                            <input onChange={e => this.setState({ firstName: e.target.value })} style={inputStyle} type="text" placeholder="Firstname" />
                        </div>
                        <div style={formField}>
                            <input onChange={e => this.setState({ lastName: e.target.value })} style={inputStyle} type="text" placeholder="Lastname" />
                        </div>
                        <div style={formField}>
                            <input onChange={e => this.setState({ phoneNumber: e.target.value })} style={inputStyle} type="text" placeholder="Phonenumber" />
                        </div>
                        <div style={formField}>
                            <input onChange={e => this.setState({ password: e.target.value })} style={inputStyle} type="password" placeholder="Password" />
                        </div>
                        <div style={formField}>
                            <button style={submitBtn} type="button" onClick={e => {
                                this.props.signUpSuccess(this.state.email,
                                    this.state.password,
                                    this.state.firstName,
                                    this.state.lastName,
                                    this.state.phoneNumber)
                            }
                            }>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        )

    }

}

const loginForm: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '25px 25px 0',
    margin: '20px 20px 0'
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem'
};

const formField: React.CSSProperties = {
    marginBottom: '2rem'
};

const submitBtn: React.CSSProperties = {
    padding: '15px',
    width: 100
};
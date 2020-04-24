import * as React from 'react';
import graphic from './undraw_feeling_proud_qne1.png'; // with import

interface State {
}

interface Props {
    style: React.CSSProperties
}


export default class Graphic extends React.Component<Props, State> {
    public render() {
        return (
            <div style={this.props.style}>
                <img src={graphic} height="350" width="350" style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 'auto',
                    marginBlock: 'auto',
                    width: '50%'
                }} />
            </div>
        )
    }
}


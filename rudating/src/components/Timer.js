import React from 'react';
import { Header } from 'semantic-ui-react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            intervalId: null,
        };
    }

    componentDidMount() {
        const intervalId = setInterval(() => {
            this.setState((state) => {            
                if (state.value > 1 ) {
                    return {
                        value: state.value - 1
                    };
                } else if (state.value === 1) {
                    this.props.onTimerEnd();
                    clearInterval(this.state.intervalId);
                    return {
                        value: state.value - 1
                    };
                }
            });
        }, 1000);
        this.setState({ intervalId })
    }

    render() {
        const { value } = this.state;
        return (
            <div style={{ width: '90%', margin: '0 auto'}}>
                <Header size="large" textAlign="right">{value}</Header>
            </div>
        )
    }
}

export default Timer;

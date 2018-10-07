import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Responsive } from 'semantic-ui-react';

import LoginForm from '../components/LoginForm';

import { login } from '../util/ApiUtil';

const styles = {
    container: {
        height: '100%',
        
        margin: '0 auto',
    },
};

class Login extends React.Component {
    state = {
        number: '',
        error: null,
        submitting: false,
        success: false,
    };

    handleChange = (e, { value }) => this.setState({ number: value });

    onSubmit = async () => {
        this.setState({ submitting: true });
        const { number } = this.state;

        try {
            const result = await login(number);
            localStorage.setItem('userId', result.data.id);
            this.setState((state) => ({
                success: true,
                submitting: false
            }));
        } catch (error) {
            this.setState({
                error: true,
                submitting: false,
            })
        }
    };

    render() {
        const { success, error } = this.state;

        if (success) {
            return <Redirect to="/lobby" />
        }

        return (
            <Grid
                className="home-container"
                style={styles.container}
                verticalAlign="middle"
                centered>
                <Responsive
                    as={Grid.Column}
                    style={{ width: '80%' }} >
                    <LoginForm
                        {...this.state}
                        error={error}
                        handleChange={this.handleChange}
                        handleSubmit={this.onSubmit} />
                </Responsive>
            </Grid>
        )
    }
}

export default Login;

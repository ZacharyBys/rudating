import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Responsive } from 'semantic-ui-react';
import RegisterForm from '../components/RegisterForm';

import { register } from '../util/ApiUtil';

const styles = { 
    container: {
        height: '100%',
        backgroundColor: 'white', 
        margin: '0 auto',
    },
};

class MakeProfile extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        number: '',
        gender: '',
        error: null,
        submitting: false,
        success: false,
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    onSubmit = async () => {
        this.setState({ submitting: true });
        const {
            firstName,
            lastName,
            number,
            gender,
        } = this.state;

        try {
            await register(firstName, lastName, number, gender);
            this.setState({ success: true });
        } catch(error) {
            this.setState({ 
                error: true,
                submitting: false,
            })
        }
    };

    render() {
        const { success, error } = this.state;

        if (success) {
            return <Redirect to="/home"/>
        }

        return (
            <Grid 
                className="home-container" 
                style={styles.container} 
                verticalAlign="middle" 
                centered>
                <Responsive 
                    as={Grid.Column} 
                    style={{ width: '80%'}} 
                    maxWidth={426}>              
                    <RegisterForm 
                        {...this.state}
                        error={error}
                        handleChange={this.handleChange} 
                        handleSubmit={this.onSubmit} />
                </Responsive>
            </Grid>
        )
    }
}

export default MakeProfile;

import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Responsive } from 'semantic-ui-react';

import RegisterForm from '../components/RegisterForm';
import AvatarForm from '../components/AvatarForm';
import InterestsSelector from '../components/InterestsSelector';

import { register, uploadAvatar } from '../util/ApiUtil';

const styles = { 
    container: {
        height: '100%',
        backgroundColor: 'white', 
        margin: '0 auto',
    },
};

class MakeProfile extends React.Component {
    state = {
        userId: null,
        firstName: '',
        lastName: '',
        number: '',
        gender: '',
        lookingFor: '',
        file: null, 
        filename: '', 
        fileError: '',
        error: null,
        submitting: false,
        success: false,
        step: 1,
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    onSubmit = async () => {
        this.setState({ submitting: true });
        const {
            firstName,
            lastName,
            number,
            gender,
            lookingFor,
        } = this.state;

        try {
            const result = await register(firstName, lastName, number, gender, lookingFor);
            localStorage.setItem('userId', result.data.id);
            this.setState((state) => ({  
                userId: result.data.id,
                submitting: false,
                step: state.step + 1 
            }));
        } catch(error) {
            this.setState({ 
                error: true,
                submitting: false,
            })
        }
    };

    handleFileUpload = async (event) => {
        const { userId, file } = this.state;
        this.setState({ submitting: true });
        try {
            await uploadAvatar(userId, file);
            this.setState((state) => ({ submitting: false, step: state.step + 1 }));
        } catch (error) {
            this.setState({
                error: true,
                submitting: false,
            })
        }
    }

    handleFileChange = (event) => {
        const file = event.target.files[0];
        let filename = file.name;

        if (filename.length > 10) {
            filename = filename.slice(0, 11).concat('...');
        }

        if (file.size > 10 * 1000 * 1000) {
            this.setState({
                filename,
                error: 'The picture you selected is too large!',
            });
            return;
        }

        this.setState({ 
            file,
            filename,
        });
    }

    handleInterestsClick = () => {
        this.setState({ success: true })
    }

    render() {
        const { step, success, error } = this.state;

        if (success) {
            return <Redirect to="/lobby"/>
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
                    { step === 1 && 
                        <RegisterForm 
                            {...this.state}
                            error={error}
                            handleChange={this.handleChange} 
                            handleSubmit={this.onSubmit} />
                    }
                    {
                        step === 2 && 
                        <AvatarForm {...this.state} handleFileChange={this.handleFileChange} handleSubmit={this.handleFileUpload}/>
                    }
                    {
                        step === 3 && <InterestsSelector handleSubmit={this.handleInterestsClick}/>

                    }
                </Responsive>
            </Grid>
        )
    }
}

export default MakeProfile;

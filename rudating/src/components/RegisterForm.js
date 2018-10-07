import React from 'react';
import { Button, Form, Grid, Header, Segment, Message, Dropdown } from 'semantic-ui-react'

const RegisterForm = (props) => {
    const { 
        firstName, 
        lastName, 
        submitting, 
        handleChange, 
        handleSubmit, 
        number,
        gender,
        lookingFor,
        error, 
    } = props;

    const genderOptions = [
        {
            text: 'Male',
            value: 'Male',
        },
        {
            text: 'Female',
            value: 'Female',
        },
        {
            text: 'Other',
            value: 'Other',
        },
    ];

    const interestedInOptions = [
        {
            text: 'Men',
            value: 'Men',
        },
        {
            text: 'Women',
            value: 'Women',
        },
        {
            text: 'Other',
            value: 'Other',
        },
    ];

    return (
        <div>
            <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
                height: 100%;
            }
            `}</style>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' style={{ color: '#cc0033' }} textAlign='left'>
                        Who RU?
                    </Header>
                    <Form size='large' onSubmit={handleSubmit} error={error}>
                        <Segment stacked>
                            <Form.Input 
                                fluid 
                                icon='user' 
                                name='firstName' 
                                value={firstName} 
                                iconPosition='left' 
                                placeholder='First Name' 
                                required 
                                onChange={handleChange} />
                            <Form.Input
                                fluid
                                icon='user'
                                name='lastName'
                                value={lastName}
                                iconPosition='left'
                                placeholder='Last Name'
                                required
                                onChange={handleChange}/>
                            <Form.Input
                                fluid
                                icon='phone'
                                name='number'
                                value={number}
                                iconPosition='left'
                                placeholder='Phone Number'
                                required
                                onChange={handleChange} />
                            <Dropdown 
                                placeholder="I identify as..." 
                                name="gender"
                                value={gender}
                                options={genderOptions} 
                                onChange={handleChange}
                                style={{margin: '1em 0'}}
                                fluid 
                                selection 
                                required/>
                            <Dropdown 
                                placeholder="Interested in..." 
                                name="lookingFor"
                                value={lookingFor}
                                options={interestedInOptions} 
                                onChange={handleChange}
                                style={{margin: '1em 0'}}
                                fluid 
                                selection 
                                required />
                            <Message 
                                error  
                                header="Error" 
                                content="There was a problem creating your account! Please try again."
                                style={{ textAlign: 'left' }} />
                            <Button 
                                fluid 
                                size='large' 
                                loading={submitting}>
                                    Create your profile!
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default RegisterForm;
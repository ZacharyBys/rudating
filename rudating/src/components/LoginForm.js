import React from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'

const LoginForm = (props) => {
    const {
        submitting,
        handleSubmit,
        handleChange,
        number,
        error,
    } = props;

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
                                icon='phone'
                                name='phoneNumber'
                                value={number}
                                iconPosition='left'
                                placeholder='Phone Number'
                                required
                                onChange={handleChange} />
                            
                            <Message
                                error
                                header="Error"
                                content="There was a problem logging in! Please try again."
                                style={{ textAlign: 'left' }} />
                            <Button
                                fluid
                                size='large'
                                loading={submitting}>
                                Sign In
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default LoginForm;
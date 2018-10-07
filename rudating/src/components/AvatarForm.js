import React from 'react';
import { Header, Form, Segment, Grid, Button, Message } from 'semantic-ui-react';

class AvatarForm extends React.Component {
    render() {
        const { handleSubmit, handleFileChange, submitting, error } = this.props;
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
                            What do you look like?
                        </Header>
                        <Form size='large' onSubmit={handleSubmit} error={error}>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    type="file"
                                    icon='photo'
                                    name='avatars'
                                    accept="image/*"
                                    iconPosition='left'
                                    required
                                    onChange={handleFileChange}/>
                                <Message 
                                    error  
                                    header="Upload Error" 
                                    content="There was a problem uploading your picture! Please try again."
                                    style={{ textAlign: 'left' }} />
                                <Button 
                                    fluid 
                                    size='large' 
                                    loading={submitting}>
                                        Upload
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default AvatarForm;

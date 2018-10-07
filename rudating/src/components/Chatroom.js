import React from 'react';
import { Header, Comment, Form, Button, Icon } from 'semantic-ui-react';

import Question from '../components/Question';
import Message from '../components/Message';
import Timer from './Timer';

class Chatroom extends React.Component {
    state = {
        chats: [],
        message: '',
        timeExpired: false,
    };

    handleChange = (e, { value }) => {
        this.setState({ message: value });
    }

    handleSubmit = () => {
        const { message } = this.state;
        console.log()
        this.setState((state) => ({
            chats: state.chats.concat({
                username: 'Jay',
                content: message,
            }), 
            message: '',
        }));
    }

    onTimerEnd = () => {
        this.setState({ timeExpired: true });
    }

    render() {
        const { chats, message, timeExpired } = this.state;
        const username = 'Jay';
        return (
            <div className="chatroom">
                <Header size="huge" textAlign="center" style={{ color: '#cc0033' }}>RU Dating?</Header>
                <Timer value={5} onTimerEnd={this.onTimerEnd}/>
                <Question question="What was your childhood like?"/>
                <Comment.Group className="chats">
                    {
                        chats.map((chat, index) => 
                            <Message key={index} chat={chat} user={username} />
                        )
                    }
                </Comment.Group>
                <Form size='large' onSubmit={this.handleSubmit}>
                    <Form.Input 
                        fluid
                        icon="heart outline"
                        iconPosition='left' 
                        placeholder='Say something...' 
                        value={message}
                        onChange={this.handleChange}/>
                    <Button 
                        fluid 
                        style={{ background: '#cc0033', color: 'white'}} 
                        size='large'
                        disabled={!message.replace(/\s/g, '').length || timeExpired }>
                            Send
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Chatroom;

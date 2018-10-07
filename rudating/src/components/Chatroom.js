import React from 'react';
import { Header, Comment, Form, Button, Icon } from 'semantic-ui-react';

import Question from '../components/Question';
import Message from '../components/Message';
import Timer from './Timer';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            message: '',
            timeExpired: false
        };
    }

    componentDidMount() {
        const { socket } = this.props;
        socket.on('messageReceived', (user, content) => {
            this.setState((state) => ({
                chats: state.chats.concat({
                    username: user.firstName,
                    content,
                    picture: user.picture,
                })
            }), () => console.log(this.state.chats));
        }); 
    }

    handleChange = (e, { value }) => {
        this.setState({ message: value });
    }

    handleClick = () => {
        const { message } = this.state;
        const { user, roomId, socket } = this.props;
        socket.emit('message', { user, message, roomId });
        this.setState({ 
            message: '',
        });
    }

    onTimerEnd = () => {
        this.setState({ timeExpired: true });
    }

    render() {
        const { chats, message, timeExpired } = this.state;
        const { user } = this.props;
        return (
            <div className="chatroom">
                <Header size="huge" textAlign="center" style={{ color: '#cc0033' }}>RU Dating?</Header>
                <Timer value={100000000} onTimerEnd={this.onTimerEnd}/>
                <Question question="What was your childhood like?"/>
                <Comment.Group className="chats">
                    {
                        chats.map((chat, index) => 
                            <Message key={index} chat={chat} user={user.firstName} />
                        )
                    }
                </Comment.Group>
                <Form size='large'>
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
                        onClick={this.handleClick}
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

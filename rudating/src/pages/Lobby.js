import React from 'react';
import { Grid, Responsive, Button, Loader, Header } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import { Link } from 'react-router-dom';

import UserCard from '../components/UserCard';
import Chatroom from '../components/Chatroom';
import SelectionModal from '../components/SelectionModal';
import { activate, getUser, updateSId, saveNumber, getQuestion } from '../util/ApiUtil';

const styles = { 
    container: {
        height: '100%',
        backgroundColor: 'white', 
        margin: '0 auto',
    },
};

class Lobby extends React.Component {
    state = { 
        searching: false,
        foundMatch: false,
        socket: null,
        user: false,
        otherUser: false,
        roomId: '',
        timeExpired: false,
        selection: '',
        selectionReceived: false,
        gotContact: 0,
        question: null,
     };

    componentDidMount = async () => {
        const socket = socketIOClient('http://127.0.0.1:5000');
        socket.on('connected', async data => {
            localStorage.setItem('sId', data);
            const userId = localStorage.getItem('userId');
            const reponse = await getUser(userId);
            await updateSId(userId, data);
            this.setState({
                user: reponse.data,
                socket
            });
        });
        socket.on('matched', (user, otherUser, question, roomId) => {
            socket.emit('join', roomId);
            this.setState({
                searching: false,
                foundMatch: true,
                otherUser,
                roomId,
                question,
            });
        });
        socket.on('selectionMade', (gotContact) => {
            this.setState({
                selectionReceived: true,
                gotContact,
            }, async () => {
                if (this.state.gotContact === 2) {
                    const userId = localStorage.getItem('userId');
                    const { number } = this.state.otherUser;
                    try {
                        await saveNumber(userId, number)
                        socket.emit('leave', this.state.roomId)
                        window.location.reload();
                    } catch (error) {

                    }
                } else if (this.state.gotContact < 0) {
                    window.location.reload();
                }
            });
        });
    }

    handleClick = async () => {
        this.setState((state) => ({ searching: !state.searching }), async () => {
            try {
                if (this.state.searching) {
                    const id = localStorage.getItem('userId');
                    await activate(id);
                }
            } catch (err) {
                this.setState({
                    searching: false,
                    foundMatch: false
                })
            }
        });
    };

    onTimerEnd = () => {
        this.setState({ timeExpired: true });
    }

    onSelection = (e, { name, value }) => {
        const { socket, roomId, user } = this.state;
        if (value === 'yes') {
            socket.emit('selection', { selection: 1, roomId });
        } else if (value === 'no') {
            this.setState({ [name]: value }, () => {
                socket.emit('selection', { selection: -2, roomId });
                window.location.reload()
            })
        }
    }

    render() {
        const { 
            searching, 
            foundMatch, 
            user, 
            otherUser, 
            timeExpired, 
            selection, 
            selectionReceived, 
            gotContact,
            question,
        } = this.state;

        return (
            <Grid 
            className="home-container" 
            style={styles.container} 
            verticalAlign="middle" 
            centered>
            <Responsive 
                as={Grid.Column} 
                maxWidth={426}>        
                {
                    !searching && !foundMatch && user &&
                    <UserCard {...user} centered/>
                }      
                { 
                    !searching && !foundMatch &&  user &&
                    <Button 
                        fluid 
                        size="large"
                        style={{ background: '#cc0033', color: 'white', width: '80%', margin: '0 auto' }} 
                        onClick={this.handleClick}>
                            Find a match
                    </Button> 
                }
                {
                    !searching && !foundMatch &&  user &&
                    <Button 
                        fluid  
                        size="large"
                        style={{ background: '#cc0033', color: 'white', width: '80%', margin: '0 auto 0 auto' }} 
                        as={Link} to={{ pathname: '/numbers', state: { user: user} }}
                        params={{ userId: user }}>
                            Saved Numbers
                    </Button> 
                }
                { 
                    searching && 
                    <Loader 
                        active 
                        inline="centered"
                        size="large" 
                        style={{ color: '#cc0033' }}>
                            Looking for a potential match
                    </Loader>
                }
                {
                    searching &&                     
                    <Button 
                        fluid 
                        size="large"
                        style={{ margin: '1em 0', background: '#cc0033', color: 'white'}} 
                        onClick={this.handleClick}>
                            Go back
                    </Button> 
                }
                {
                    foundMatch && !timeExpired && question &&
                        <Chatroom   
                            time={1}
                            onTimerEnd={this.onTimerEnd}
                            user={this.state.user} 
                            otherUser={this.state.otherUser} 
                            roomId={this.state.roomId} 
                            socket={this.state.socket} 
                            question={question}/>
                }
                {
                    timeExpired && !selectionReceived &&
                    <SelectionModal 
                        open={timeExpired} 
                        onSelection={this.onSelection} 
                        selection={selection}/>
                }
                {
                    timeExpired && selectionReceived && gotContact === 2 &&
                    <Header textAlign="center" style={{ color: '#cc0033' }}>Awesome! {otherUser.firstName}'s contact information was saved!</Header>
                }
                {
                    timeExpired && selectionReceived && gotContact === -1 &&
                    <Header textAlign="center" style={{ color: '#cc0033' }}>Sorry! Guess things didn't work out with {otherUser.firstName} :(</Header>
                }
            </Responsive>
        </Grid>
        )
    }
}

export default Lobby;

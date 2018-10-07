import React from 'react';
import { Grid, Responsive, Button, Loader } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client'

import UserCard from '../components/UserCard';
import Chatroom from '../components/Chatroom';
import SelectionModal from '../components/SelectionModal';
import { activate, getUser, updateSId } from '../util/ApiUtil';

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
     };

    componentDidMount() {
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
        socket.on('matched', async (user, otherUser, roomId) => {
            socket.emit('join', roomId);
            this.setState({
                searching: false,
                foundMatch: true,
                otherUser,
                roomId
            });
        });
    }

    handleClick = async () => {
        this.setState((state) => ({ searching: !state.searching }), async () => {
            try {
                if (this.state.searching) {
                    const id = localStorage.getItem('userId');
                    console.log('current user id: ' + id)
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
        this.setState({ [name]: value })
    }

    render() {
        const { searching, foundMatch, user, timeExpired, selection } = this.state;

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
                    foundMatch &&
                        <Chatroom 
                            time={5}
                            onTimerEnd={this.onTimerEnd}
                            user={this.state.user} 
                            otherUser={this.state.otherUser} 
                            roomId={this.state.roomId} 
                            socket={this.state.socket} />
                }
                {
                    timeExpired && 
                    <SelectionModal 
                        open={timeExpired} 
                        onSelection={this.onSelection} 
                        selection={selection}/>
                }
            </Responsive>
        </Grid>
        )
    }
}

export default Lobby;

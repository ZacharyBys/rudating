import React from 'react';
import { Grid, Responsive, Button, Loader } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client'

import Chatroom from '../components/Chatroom';
import { activate, updateSId } from '../util/ApiUtil';

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
        roomId: ''
     };

    componentDidMount() {
        const socket = socketIOClient('http://127.0.0.1:5000');
        socket.on('connected', async data => {
            localStorage.setItem('sId', data);
            console.log(data);
            const userId = localStorage.getItem('userId');
            await updateSId(userId, data);
            this.setState({
                socket
            });
        });
        socket.on('matched', async (user, otherUser, roomId) => {
            this.setState({
                searching: false,
                foundMatch: true,
                user,
                otherUser,
                roomId
            });
        });
    }

    handleClick = async () => {
        this.setState((state) => ({ searching: !state.searching }));
        try {
            await activate(localStorage.getItem('userId'));
            this.setState({
                searching: true
            }); 
        } catch (err) {
            this.setState({
                searching: false,
                foundMatch: false
            })
        }
    };

    render() {
        const { searching, foundMatch } = this.state;

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
                    !searching && !foundMatch &&  
                    <Button 
                        fluid 
                        size="large"
                        style={{ background: '#cc0033', color: 'white'}} 
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
                    foundMatch && <Chatroom user = { this.state.user } otherUser = { this.state.otherUser } roomId = { this.state.roomId }/>
                }
            </Responsive>
        </Grid>
        )
    }
}

export default Lobby;

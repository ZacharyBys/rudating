import React from 'react';
import { Grid, Responsive, Button, Loader } from 'semantic-ui-react';

import Chatroom from '../components/Chatroom';

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
     };

    handleClick = () => {
        this.setState((state) => ({ searching: !state.searching }));
        this.setState({ 
            searching: false,
            foundMatch: true,
        }); 
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
                    foundMatch && <Chatroom/>
                }
            </Responsive>
        </Grid>
        )
    }
}

export default Lobby;

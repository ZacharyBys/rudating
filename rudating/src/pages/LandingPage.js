import React from 'react';
import { Link } from 'react-router-dom';
import { Responsive, Grid, Image, Header, Button } from 'semantic-ui-react';

const styles = { 
    container: {
        height: '100%',
        backgroundColor: 'white', 
        margin: '0 auto',
    },
    header: {
        margin: 0,
        color: '#cc0033',
    },
    button: {
        margin: '1em auto',
    }
};

class LandingPage extends React.Component {
    render() {
        return (
            <Grid className="home-container" style={styles.container} verticalAlign="middle" centered>
                <Responsive as={Grid.Column} style={{ width: '80%'}} maxWidth={426}>              
                    <Image src={`${process.env.PUBLIC_URL}/ru-logo.png`} size="small" style={{ margin: '1em 0' }}/>
                    <Header size="large" style={{ margin: 0, color: '#cc0033' }}>RU looking for a "study buddy"?</Header>
                    <Header size="large" sub style={{ margin: '0.5em 0', textTransform: 'none', color: '#cc0033'}}>Try RU Dating... Now!</Header>
                    <Button as={Link} to="/start" style={styles.button}>Let's get started!</Button>
                    <Header size="large" sub style={{ margin: '0.5em 0', textTransform: 'none', color: '#cc0033' }}>Already have an account?</Header>
                    <Button as={Link} to="/login" style={styles.button}>Sign In</Button>
                </Responsive>
            </Grid>
        )
    }
}

export default LandingPage;

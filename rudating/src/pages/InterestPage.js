import React from 'react';
import { Link } from 'react-router-dom';
import { Responsive, Grid, Header, Image, Button } from 'semantic-ui-react';
import Guitar from '../assets/guitar.png';
import Book from '../assets/book.png';
import Beer from '../assets/beer.png';
import Plane from '../assets/plane.png';
import Computer from '../assets/computer.png';
import Hammer from '../assets/hammer.png';

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

class InterestPage extends React.Component {
    render() {
        return (
            <Grid className="home-container" style={styles.container} verticalAlign="middle" centered>
                <Responsive as={Grid.Column} style={{ width: '80%'}} maxWidth={426}>              
                    <Header size="large" style={{ margin: 20, color: '#cc0033' }}>Select two images</Header>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Image src={Guitar} />
                            </Grid.Column>
                            <Grid.Column>
                                <Image src={Computer} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Image src={Book} />
                            </Grid.Column>
                            <Grid.Column>
                                <Image src={Beer} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Image src={Plane} />
                            </Grid.Column>
                            <Grid.Column>
                                <Image src={Hammer} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Button as={Link} to="/start" style={styles.button}>Keep Going!</Button>
                </Responsive>
            </Grid>
        )
    }
}

export default InterestPage;
import React from 'react';
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

class InterestsSelector extends React.Component {
    constructor() {
        super();

        this.state = { 
            colors : [false, false, false, false, false, false],
            count: 0,
        };
    }

    handleOne(index) {
        const { count } = this.state;
        const colors = this.state.colors;
        if (colors[index] === true) {
            colors[index] = false;
            this.setState((state) => ({
                colors,
                count: state.count - 1
            }));
        } else if (count < 2) {
            colors[index] = true;
            this.setState((state) => ({ 
                colors,
                count: state.count + 1
            })); 
        }
    }

    render() {
        var opacity = [6]
        var i;
        for (i=0;i<6;i++) {
            opacity[i] = this.state.colors[i] ? {opacity : 1.0} : {opacity : 0.2}
        }

        const { count } = this.state;
        return (
            <Grid className="home-container" style={styles.container} verticalAlign="middle" centered>
                <Responsive as={Grid.Column}>              
                    <Header size="large" style={{ margin: 20, color: '#cc0033' }}>Select two images</Header>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Image size="small" src={Guitar} style={{...opacity[0], margin: '0 auto'}} onClick={() => this.handleOne(0)}/>
                            </Grid.Column>
                            <Grid.Column>
                                <Image size="small" src={Computer} style={{...opacity[1], margin: '0 auto'}} onClick={() => this.handleOne(1)}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Image size="small" src={Book} style={{...opacity[2], margin: '0 auto'}} onClick={() => this.handleOne(2)}/>
                            </Grid.Column>
                            <Grid.Column>
                                <Image size="small" src={Beer} style={{...opacity[3], margin: '0 auto'}} onClick={() => this.handleOne(3)}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Image size="small" src={Plane} style={{...opacity[4], margin: '0 auto'}} onClick={() => this.handleOne(4)}/>
                            </Grid.Column>
                            <Grid.Column>
                                <Image size="small" src={Hammer} style={{...opacity[5], margin: '0 auto'}} onClick={() => this.handleOne(5)}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Button disabled={count !== 2} onClick={this.props.handleSubmit} style={styles.button}>All done!</Button>
                </Responsive>
            </Grid>
        )
    }
}

export default InterestsSelector;
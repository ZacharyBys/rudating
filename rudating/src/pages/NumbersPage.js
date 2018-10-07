import React from 'react';
import { Link } from 'react-router-dom';
import { Responsive, Grid, Image, Header, Button, List , Comment} from 'semantic-ui-react';

import { login } from '../util/ApiUtil';

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

class NumbersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            userNum: props.location.state.user.number,
            userId: null,
            error: false,
        };
    }

    componentDidMount = async () => {
        try {
            const result = await login(this.state.userNum);
            localStorage.setItem('userId', result.data.id);
            var nums = result.data.savedNumbers.split(', ')
            const newNums = nums.filter(function(item, pos) {
                return nums.indexOf(item) == pos;
            })

            var i;
            var users = []
            for (i=0;i<newNums.length;i++){
                const user = await login(newNums[i])
                users.push(user.data)
            }

            this.setState((state) => ({
                userId: result.data.id,
                numbers: newNums,
                users: users,
            }));

        } catch (error) {
            this.setState({
                error: true,
            })
        }
    }

    render() {
        const users = this.state.users;
        return (
            <Grid className="home-container" style={styles.container} verticalAlign="middle" centered>
                <Responsive as={Grid.Column} style={{ width: '80%'}} maxWidth={426}>              
                    <Header size="large" style={{ margin: 0, color: '#cc0033' }}>My Phone Numbers</Header>
                    {users && <Comment.Group>
                        {
                            users.map((user) => {
                                return <Comment>
                                <Comment.Avatar src={user.picture} />
                                <Comment.Content>
                                  <Comment.Author as='a'>{user.firstName + ' ' + user.lastName}</Comment.Author>
                                  <Comment.Text>{user.number}</Comment.Text>
                                </Comment.Content>
                              </Comment>
                            })
                        }
                    </Comment.Group>
                    }
                </Responsive>
            </Grid>
        )
    }
}

export default NumbersPage;
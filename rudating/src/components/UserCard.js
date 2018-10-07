import React from 'react';
import { Header, Image, Divider, Icon } from 'semantic-ui-react';

const UserCard = (props) => {
    const { firstName, lastName, gender, picture, number } = props;
    return (
        <div style={{ width: 'fit-content', margin: '3em auto' }}>
            <Image src={picture} circular size="small" style={{ margin: '1em 0' }}/>
            <Header textAlign="left" style={{ margin: 0 }}>{`${firstName} ${lastName}`}</Header>
            <Header size="tiny" textAlign="left" style={{ margin: 0, opacity: '0.7' }}>{gender}</Header>
            <Divider/>
            <Header size="tiny" textAlign="left" style={{ margin: '1em 0', opacity: '0.7' }}>
                <Icon size="mini" name="phone"/>
                {number}
            </Header>
        </div>
    )
}

export default UserCard;

import React from 'react';
import { List, Image, Comment } from 'semantic-ui-react';

const Message = ({chat, user}) => (
    <Comment className={`chat ${user === chat.username ? "right" : ""}`} style={{ textAlign: 'left' }}>
        { 
            user !== chat.username && 
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
        }
        <Comment.Content>
            <Comment.Author>{chat.username}</Comment.Author>
            <Comment.Text>{chat.content}</Comment.Text>
        </Comment.Content>
    </Comment>
);

export default Message;

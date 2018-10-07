import React from 'react';
import { Comment } from 'semantic-ui-react';

const Message = ({chat, user}) => (
    <Comment className={`chat ${user === chat.username ? "right" : ""}`} style={{ textAlign: 'left' }}>
        { 
            user !== chat.username && 
            <Comment.Avatar src={chat.picture} />
        }
        <Comment.Content>
            <Comment.Author>{chat.username}</Comment.Author>
            <Comment.Text>{chat.content}</Comment.Text>
        </Comment.Content>
    </Comment>
);

export default Message;

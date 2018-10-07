import React from 'react';
import { Header } from 'semantic-ui-react';

const Question = (props) => {
    return (
        <div>
            <Header 
                as='h3'
                style={{ color: '#cc0033', margin: 0 }}>
                    Question:
            </Header>
            <Header as='h4' style={{ color: '#cc0033', margin: 0, marginBottom: '0.5em' }}>
                "{props.question}"
            </Header>
        </div>
    )
}

export default Question;

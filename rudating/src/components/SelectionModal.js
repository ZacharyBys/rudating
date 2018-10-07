import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

const SelectionModal = (props) => {
    const { open, onSelection, selection } = props;
    return (
        <Modal open={open} style={{ width: '90%'}}>
            <Modal.Header>Would you like to continue the conversation?</Modal.Header>
            <Modal.Content>
                <Button
                    name="selection"
                    value="yes"
                    animated
                    positive
                    fluid 
                    style={{ margin: '1em 0' }}
                    size='large'
                    onClick={onSelection}
                    disabled={selection === 'no'}>
                        <Button.Content visible>Yes</Button.Content>
                        <Button.Content hidden>
                            <Icon name="heart outline"/>
                        </Button.Content>
                </Button>
                <Button 
                    name="selection"
                    value="no"
                    animated
                    negative
                    fluid 
                    style={{ margin: '1em 0'}}
                    size='large'
                    onClick={onSelection}
                    disabled={selection === 'yes'}>
                        <Button.Content visible>No</Button.Content>
                        <Button.Content hidden>
                            <Icon name="x"/>
                        </Button.Content>
                </Button>
            </Modal.Content>
      </Modal>
    )
};

export default SelectionModal;

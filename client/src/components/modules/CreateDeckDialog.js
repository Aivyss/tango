import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TextField} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function CreateDeckDialog(props) {
    let [open, setOpen] = useState(true);
    let [name, setName] = useState('');
    let [isValidDeck, setIsValidDeck] = useState(true);

    const handleClose = () => {
        setOpen(false);
        setTimeout(props.history.push, 100, '/');
    };

    const valueChange = e => {
        props.valueChange(e, setName);
    };

    const createDeck = () => {
        props.createDeck(name, setOpen).then(() => {
            handleClose();
        });
    };

    useEffect(() => {
        const length = name.length;
        if (length !== null && length !== undefined && length > 0) {
            props.checkDuplicatedName(name, isValidDeck, setIsValidDeck);
        }
    }, [name]);

    return (
        <main>
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-slide-title'
                    aria-describedby='alert-dialog-slide-description'
                >
                    <DialogTitle id='alert-dialog-slide-title'>{'Create Deck'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-slide-description'>
                            デックの名を付けてください。
                        </DialogContentText>
                        <TextField type='text' label='DECK NAME' name='name' onChange={valueChange} /> <br />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={createDeck} color='primary'>
                            create deck
                        </Button>
                        <Button onClick={handleClose} color='primary'>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </main>
    );
}

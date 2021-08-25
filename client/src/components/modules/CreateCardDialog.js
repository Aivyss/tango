import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function CreateCardDialog(props) {
    const classes = useStyles();

    const handleChange = event => {
        const deckName = event.target.name;
        const deckId = event.target.value;

        props.setTargetDeck(deckId, deckName);
    };

    const handleClose = () => {
        props.handleCreateCardDialog(false);
    };

    const handleSave = () => {};

    return (
        <div>
            <Dialog
                fullScreen
                open={props.createCardDialogIsOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant='h6' className={classes.title}>
                            新しいカードを作成し、デックに入れます。
                        </Typography>

                        <FormControl variant='filled' className={classes.formControl}>
                            <InputLabel htmlFor='decks'>decks</InputLabel>
                            <Select
                                native
                                value={props.deckId}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'decks',
                                    id: 'decks',
                                }}
                            >
                                <option aria-label='None' value='' />
                                {props.deckList.map(curr => {
                                    return (
                                        <option key={curr.DECK_ID} value={curr.DECK_ID}>
                                            {curr.DECK_NAME}
                                        </option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <Button autoFocus color='inherit' onClick={handleSave}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <></>
            </Dialog>
        </div>
    );
}

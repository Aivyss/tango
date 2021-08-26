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
import {AddBox} from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import DeleteIcon from '@material-ui/icons/Delete';
import {TextField} from '@material-ui/core';
import {Container} from '@material-ui/core';
import {Title} from '@material-ui/icons';
import {post, get} from 'axios';

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
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function CreateCardDialog(props) {
    const classes = useStyles();
    const cardList = props.cardCategories;
    const colsList = props.targetCardsCols;
    const [colsValues, setColsValues] = useState({});
    const [error, setError] = useState(false);

    const handleChangeDeck = event => {
        const deckId = Number(event.target.value);

        props.setTargetDeck(deckId);
    };

    const handleChangeCard = e => {
        const cardId = Number(e.target.value);

        const url = '/api/cards/call-card-cols?cardId=' + cardId;
        get(url)
            .then(res => {
                const data = res.data; // [{CARD_COL_ID, KIND_ID, COL_NAME}]
                props.setTargetCardsCols(data);
                const refinedData = {};
                data.map(curr => {
                    refinedData[curr.CARD_COL_ID.toString()] = '';
                    return true;
                });
                return refinedData;
            })
            .catch(err => console.log(err))
            .then(data => {
                props.setTargetCard(cardId);
                setColsValues(data);
            });
    };

    const handleClose = () => {
        props.handleCreateCardDialog(false);
    };

    const getOneItem = (colName = '', colId) => {
        if (colName !== null) {
            return (
                <ListItem key={colId}>
                    <ListItemAvatar>
                        <Avatar>
                            <FormatListNumbered />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItem>
                        <TextField
                            value={colsValues[colId.toString()]}
                            placeholder={`${colName}`}
                            id={`${colId}`}
                            onChange={writeCol}
                        />
                    </ListItem>
                </ListItem>
            );
        }
    };

    const writeCol = e => {
        const id = e.target.id; // colId
        colsValues[id] = e.target.value;
        setColsValues(colsValues);
    };

    useEffect(() => {
        const userId = sessionStorage.getItem('primaryKey');
        const url = '/api/cards/call-all-card-categories?userId=' + userId;

        get(url)
            .then(res => {
                const data = res.data;
                props.setAllCardCategories(data);
            })
            .catch(err => console.log(err));
    }, []);

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
                        <decks>
                            <FormControl variant='filled' className={classes.formControl}>
                                <InputLabel htmlFor='decks'>decks</InputLabel>
                                <Select
                                    native
                                    value={props.deckId}
                                    onChange={handleChangeDeck}
                                    inputProps={{
                                        name: 'decks',
                                        id: 'dekcs',
                                        value: props.deckId,
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
                        </decks>

                        <cards>
                            <FormControl variant='filled' className={classes.formControl}>
                                <InputLabel htmlFor='cards'>cards</InputLabel>
                                <Select
                                    native
                                    onChange={handleChangeCard}
                                    inputProps={{
                                        name: 'cards',
                                        id: 'cards',
                                        value: props.targetCardId,
                                    }}
                                >
                                    <option aria-label='None' value='' />
                                    {cardList.map(curr => {
                                        return (
                                            <option key={curr.KIND_ID} value={curr.KIND_ID}>
                                                {curr.CARD_NAME}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </cards>

                        <Button autoFocus color='inherit' onClick={handleSave}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <colms>
                    <Container maxWidth='sm'>
                        <div className={classes.demo}>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Title />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItem>
                                        <TextField error={error} placeholder='Front' />
                                    </ListItem>
                                </ListItem>
                                {props.targetCardsCols
                                    ? props.targetCardsCols.map(curr => {
                                          return getOneItem(curr.COL_NAME, curr.CARD_COL_ID);
                                      })
                                    : ''}
                            </List>
                        </div>
                    </Container>
                </colms>
            </Dialog>
        </div>
    );
}

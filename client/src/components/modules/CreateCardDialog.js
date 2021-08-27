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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import {TextField} from '@material-ui/core';
import {Container} from '@material-ui/core';
import {Title} from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import {Box} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import {post, get} from 'axios';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    textField: {
        width: '75ch',
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
        marginTop: theme.spacing(7),
    },
    alert: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function CreateCardDialog(props) {
    const classes = useStyles();
    const cardList = props.cardCategories;
    const [colsValues, setColsValues] = useState({});
    const [front, setFront] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [duplicated, setDuplicated] = useState(false);

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
                console.log('🚀 ~ file: CreateCardDialog.js ~ line 100 ~ CreateCardDialog ~ data', data);
                props.setTargetCard(cardId);
                setColsValues(data);
                setError(false);
                setFront('');
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
                            className={classes.textField}
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
        const str = e.target.value;
        const id = e.target.id; // colId

        colsValues[id] = str;
        console.log('🚀 ~ file: CreateCardDialog.js ~ line 138 ~ CreateCardDialog ~ colsValues', colsValues);
        setColsValues({...colsValues});
    };

    const writeFront = e => {
        const str = e.target.value;

        if (str) {
            const cardId = props.targetCardId;
            const deckId = props.deckId;
            const url = `/api/cards/check-duplicate-front?cardId=${cardId}&deckId=${deckId}&str=${str}`;

            get(url)
                .then(res => {
                    const bool = res.data;

                    if (!bool) {
                        setError(!bool);
                        setDuplicated(true);
                    }
                })
                .catch(err => console.log(err));
        }
        setFront(str);
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

    useEffect(() => {
        if (duplicated) {
            // 디스플레이가 보이는 중
            setTimeout(setDuplicated, 3000, false);
        }
    }, [duplicated]);

    useEffect(() => {
        if (success) {
            // 디스플레이가 보이는 중
            setTimeout(setSuccess, 3000, false);
        }
    }, [success]);

    const handleSave = () => {
        if (front && !error) {
            const url = '/api/cards/create-card';
            const config = {
                headers: {
                    'content-type': 'application/json',
                },
            };
            const data = {
                deckId: props.deckId,
                cardId: props.targetCardId,
                front: front,
                colsValues: colsValues,
            };

            post(url, data, config)
                .then(res => {
                    const bools = res.data;
                    if (bools) {
                        setError(false);
                        setSuccess({display: ''});
                        for (const prop in Object.entries(colsValues)) {
                            colsValues[prop] = '';
                        }
                        setColsValues({...colsValues});
                        setFront('');
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <Container>
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

                            <Button autoFocus color='inherit' onClick={handleSave}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <Container maxWidth='sm'>
                        <Box zIndex='tooltip'>
                            <div className={classes.alert}>
                                <Collapse in={success}>
                                    <Alert variant='filled' severity='success'>
                                        カードを作り、デックに入れました。
                                    </Alert>
                                </Collapse>
                                <Collapse in={duplicated}>
                                    <Alert variant='filled' severity='error'>
                                        中腹の語がります。
                                    </Alert>
                                </Collapse>
                            </div>
                        </Box>
                        <Box zIndex='modal'>
                            <div className={classes.demo}>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Title />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItem>
                                            <TextField
                                                className={classes.textField}
                                                error={error}
                                                placeholder='Front'
                                                onChange={writeFront}
                                                value={front}
                                            />
                                        </ListItem>
                                    </ListItem>
                                    {props.targetCardsCols
                                        ? props.targetCardsCols.map(curr => {
                                              return getOneItem(curr.COL_NAME, curr.CARD_COL_ID);
                                          })
                                        : ''}
                                </List>
                            </div>
                        </Box>
                    </Container>
                </Dialog>
            </Container>
        </div>
    );
}

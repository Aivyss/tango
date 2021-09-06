import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    makeStyles,
    Collapse,
    Box,
    Container,
    TextField,
    Avatar,
    ListItemAvatar,
    ListItem,
    List,
    Select,
    InputLabel,
    FormControl,
    Slide,
    Typography,
    IconButton,
    Toolbar,
    AppBar,
    Button,
    Dialog,
} from '@material-ui/core';
import {TransitionProps} from '@material-ui/core/transitions';
import {FormatListNumbered, Close, Title} from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import axios, {AxiosResponse} from 'axios';

// * recoils
import {useRecoilState} from 'recoil';
import {KindTable, DeckTable, ColsTable} from '../../_recoil/dbs';
import {
    cDOpenState,
    allDeckState,
    cardKindState,
    targetCardColsState,
    targetDeckIdState,
    targetCardIdState,
} from '../../_recoil';

// * CSS styles
const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    textField: {
        width: '55ch',
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

// * Props Interface
interface PropsCardDialog {
    cardCategories: KindTable[];
    targetCardsCols: ColsTable[];
    targetCardId: number | undefined;
    deckList: DeckTable[];
    deckId: number | undefined;
    createCardDialogIsOpen: boolean;
    setTargetDeck(id: number): void;
    setTargetCard(id: number): void;
    setTargetCardsCols(data: ColsTable[]): void;
    setAllCardCategories(data: KindTable[]): void;
    handleCreateCardDialog(bools: boolean): void;
}
interface PropsOneItem {
    key: number;
    colId: number;
    colName: string;
    setColsValues: React.Dispatch<
        React.SetStateAction<{
            [index: number]: string;
        }>
    >;
    colsValues: {[index: number]: string};
}

// * Container Component
export default function ContainerComp() {
    const [cardDialog, setCardDialog] = useRecoilState(cDOpenState);
    const [allDecks, setAllDecks] = useRecoilState(allDeckState);
    const [cardKinds, setCardKinds] = useRecoilState(cardKindState);
    const [targetCardCols, setTargetCardCols] = useRecoilState(targetCardColsState);
    const [deckId, setDeckId] = useRecoilState(targetDeckIdState);
    const [cardId, setCardId] = useRecoilState(targetCardIdState);

    return (
        <CreateCardDialog
            cardCategories={cardKinds}
            targetCardsCols={targetCardCols}
            targetCardId={cardId}
            deckList={allDecks}
            deckId={deckId}
            createCardDialogIsOpen={cardDialog}
            setTargetDeck={setDeckId}
            setTargetCard={setCardId}
            setTargetCardsCols={setTargetCardCols}
            setAllCardCategories={setCardKinds}
            handleCreateCardDialog={setCardDialog}
        />
    );
}

// * Presentational Components
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {children?: React.ReactElement},
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function GetOneItem(props: PropsOneItem) {
    const classes = useStyles();

    const writeCol = (e: ChangeEvent<HTMLInputElement>) => {
        const str = e.target.value;
        const id = Number(e.target.id); // colId

        props.colsValues[id] = str;
        props.setColsValues({...props.colsValues});
    };

    //colName = '', colId
    if (props.colName !== null) {
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FormatListNumbered />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItem>
                        <TextField
                            className={classes.textField}
                            value={props.colsValues[props.colId]}
                            placeholder={`${props.colName}`}
                            id={`${props.colId}`}
                            onChange={writeCol}
                        />
                    </ListItem>
                </ListItem>
            </React.Fragment>
        );
    } else {
        return <React.Fragment />;
    }
}

function CreateCardDialog(props: PropsCardDialog) {
    const classes = useStyles();
    const cardList = props.cardCategories;
    const [colsValues, setColsValues] = useState({} as {[index: number]: string});
    const [front, setFront] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState({display: 'none'});
    const [duplicated, setDuplicated] = useState(false);

    const handleChangeDeck = (e: ChangeEvent<{name?: string | undefined; value: unknown}>) => {
        if (!e.target.value) {
            return;
        }
        const deckId = Number(e.target.value);

        props.setTargetDeck(deckId);
    };

    const handleChangeCard = (e: ChangeEvent<{name?: string | undefined; value: unknown}>) => {
        if (!e.target.value) {
            return;
        }
        const cardId = Number(e.target.value);

        const url = '/api/cards/call-card-cols?cardId=' + cardId;
        axios
            .get(url)
            .then((res: AxiosResponse<ColsTable[]>) => {
                const data = res.data; // [{CARD_COL_ID, KIND_ID, COL_NAME}]
                props.setTargetCardsCols(data);
                const refinedData = {} as {[index: number]: string};
                data.map(curr => {
                    refinedData[curr.CARD_COL_ID] = '';
                    return true;
                });
                return refinedData;
            })
            .catch(err => console.log(err))
            .then(data => {
                console.log('🚀 ~ file: CreateCardDialog.js ~ line 100 ~ CreateCardDialog ~ data', data);
                if (data) {
                    props.setTargetCard(cardId);
                    setColsValues(data);
                    setError(false);
                    setFront('');
                }
            });
    };

    const handleClose = () => {
        cleanState();
        props.handleCreateCardDialog(false);
    };

    const writeFront = (e: ChangeEvent<{value?: string}>) => {
        const str = e.target.value;

        if (str) {
            const cardId = props.targetCardId;
            const deckId = props.deckId;
            const url = `/api/cards/check-duplicate-front?cardId=${cardId}&deckId=${deckId}&str=${str}`;

            axios
                .get(url)
                .then(res => {
                    const bool = res.data; // duplicate-> true

                    setError(bool);
                    setDuplicated(bool);
                })
                .catch(err => console.log(err));
        }
        setFront(str ? str : '');
    };

    const cleanState = () => {
        setError(false);
        for (const keyValueSets of Object.entries(colsValues)) {
            console.log('🚀 ~ file: CreateCardDialog.js ~ line 162 ~ cleanState ~ keyValueSets', keyValueSets);
            colsValues[Number(keyValueSets[0])] = '';
        }
        console.log('🚀 ~ file: CreateCardDialog.js ~ line 207 ~ handleSave ~ colsValues', colsValues);
        setColsValues({...colsValues});
        setFront('');
    };

    useEffect(() => {
        const userId = localStorage.getItem('primaryKey');
        const url = '/api/cards/call-all-card-categories?userId=' + userId;

        axios
            .get(url)
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

            axios
                .post(url, data, config)
                .then(res => {
                    const bools = res.data;
                    if (bools) {
                        setSuccess({display: ''});
                        cleanState();
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
                                <Close />
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
                                <Collapse in={!success.display.length}>
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
                                              return (
                                                  <GetOneItem
                                                      key={curr.CARD_COL_ID}
                                                      colId={curr.CARD_COL_ID}
                                                      colName={curr.COL_NAME}
                                                      colsValues={colsValues}
                                                      setColsValues={setColsValues}
                                                  />
                                              );
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

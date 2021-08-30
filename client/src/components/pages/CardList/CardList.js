import React, {useState, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {createTheme, darken, lighten} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/styles';
import {Grid, IconButton, Paper, TextField} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import {get, put} from 'axios';
import {useHistory} from 'react-router-dom';

function getThemePaletteMode(palette) {
    return palette.type || palette.mode;
}

const defaultTheme = createTheme();

const tableStyles = makeStyles(
    theme => {
        const getBackgroundColor = color =>
            getThemePaletteMode(theme.palette) === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

        const getHoverBackgroundColor = color =>
            getThemePaletteMode(theme.palette) === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

        return {
            root: {
                '& .super-app-theme--Open': {
                    backgroundColor: getBackgroundColor(theme.palette.info.main),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(theme.palette.info.main),
                    },
                },
                '& .super-app-theme--Filled': {
                    backgroundColor: getBackgroundColor(theme.palette.success.main),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(theme.palette.success.main),
                    },
                },
                '& .super-app-theme--PartiallyFilled': {
                    backgroundColor: getBackgroundColor(theme.palette.warning.main),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(theme.palette.warning.main),
                    },
                },
                '& .super-app-theme--Rejected': {
                    backgroundColor: getBackgroundColor(theme.palette.error.main),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
                    },
                },
            },
        };
    },
    {defaultTheme},
);

const paperContainerStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
        width: '100%',
        height: '82vh',
        overflowY: 'scroll',
    },
}));

const paperStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        height: '20vh',
    },
}));

const buttonStyles = makeStyles(
    theme => ({
        root: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: theme.spacing(1),
            color: theme.palette.text.secondary,
        },
        textPrimary: {
            color: theme.palette.text.primary,
        },
    }),
    {defaultTheme},
);

function EditButtons(props) {
    const {id} = props;
    const classes = buttonStyles();
    const handleEditClick = e => {};
    const handleDeleteClick = e => {};

    return (
        <div className={classes.root}>
            <IconButton
                color='inherit'
                className={classes.textPrimary}
                size='small'
                aria-label='edit'
                onClick={handleEditClick}
            >
                <Edit fontSize='small' />
            </IconButton>
            <IconButton color='inherit' size='small' aria-label='delete' onClick={handleDeleteClick}>
                <DeleteOutlined fontSize='small' />
            </IconButton>
        </div>
    );
}

function Cols(props) {
    const card = props.frontCard; // selected front card
    const backSide = props.backCard; // selected back card
    const stylesThree = paperStyles();
    const id = props.backCard.BACK_ID;
    const [text, setText] = useState('');

    const editCols = e => {
        e.stopPropagation();
        e.preventDefault();
        const text = e.target.value;
        setText(text);
        sendToServerBackColChanges(text, id);
    };

    const sendToServerBackColChanges = (colData, id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
            },
        };
        const data = {
            BACK_DATA: colData,
            BACK_ID: id,
        };
        const url = `/api/cards/edit-back-col`;
        return put(url, data, config)
            .then(() => {})
            .catch(err => console.log(err));
    };

    useEffect(() => {
        setText(backSide.BACK_DATA);
    }, [card]);

    return (
        <Paper className={stylesThree.root} elevation={0}>
            <TextField
                fullWidth
                id={backSide.BACK_ID.toString()}
                value={text || ''}
                label={backSide.CARD_COL_ID}
                variant='outlined'
                onChange={editCols}
            />
        </Paper>
    );
}

function RenderSelectedCard(props) {
    const stylesThree = paperStyles();
    const card = props.frontCard; // selected front card
    const backCard = props.backCard; // selected back card
    const [cols, setCols] = useState([]);
    const [front, setFront] = useState('');

    const sendToServerFrontText = (word, id) => {
        const urlOne = `/api/cards/checkDuplicateCardName?userId=${localStorage.getItem('primaryKey')}&cardName=${id}`;
        const urlTwo = '/api/cards/change-front-data';
        get(urlOne)
            .then(res => {
                const bools = res.data.length;

                if (card.FRONT_DATA !== front) {
                    if (bools) {
                        alert('中腹のカードでアップデートが出来ませんでした。');
                    }
                } else {
                    const config = {
                        headers: {
                            'content-type': 'application/json',
                        },
                    };
                    const data = {
                        frontId: card.FRONT_ID,
                        frontData: word,
                    };
                    put(urlTwo, data, config);
                }
            })
            .catch(err => console.log(err));
    };

    const editFront = e => {
        e.stopPropagation();
        e.preventDefault();
        const text = e.target.value;
        setFront(text);
        card.FRONT_DATA = text;
        sendToServerFrontText(text, card.FRONT_ID);
    };

    useEffect(() => {
        setFront(card.FRONT_DATA);
    }, [card]);

    return (
        <React.Fragment>
            <Paper className={stylesThree.root} elevation={0}>
                <TextField
                    fullWidth
                    id={card.FRONT_ID + ''}
                    value={front || ''}
                    variant='outlined'
                    onChange={editFront}
                    style={{height: '100%'}}
                />
            </Paper>

            {backCard.length ? (
                backCard.map(curr => {
                    return <Cols key={curr.BACK_ID} frontCard={card} backCard={curr} />;
                })
            ) : (
                <div></div>
            )}
        </React.Fragment>
    );
}

export default function CardList(props) {
    const stylesOne = tableStyles();
    const stylesTwo = paperContainerStyles();
    const history = useHistory();
    const cols = [
        {field: 'FRONT_ID', headerName: 'ID', width: 100},
        {field: 'FRONT_DATA', headerName: 'front', width: 130},
        {field: 'CARD_NAME', headerName: 'Card Categ.', width: 170},
        {field: 'DECK_NAME', headerName: 'Deck Name', width: 120},
        {field: 'DUE_DATE', headerName: 'Due Date', width: 140},
        {
            field: 'actions',
            headerName: 'actions',
            renderCell: EditButtons,
            sortable: false,
            width: 100,
            headerAlign: 'center',
            filterable: 'false',
            align: 'center',
            disableColumnMenu: true,
            disableReorder: true,
        },
    ];
    const [rows, setRows] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [selectedBackCard, setSelectedBackCard] = useState([]);

    const viewCardCols = params => {
        (async () => {
            const card = searchCard(rows, params.id);
            const url = '/api/cards/get-back-cols?frontId=' + card.FRONT_ID;
            const res = await get(url);
            const data = res.data;
            setSelectedCard(card);
            setSelectedBackCard(data);
        })();
    };
    const searchCard = (cardList, id) => {
        let returnCol = null;

        cardList.some(curr => {
            if (curr.id === id) {
                returnCol = curr;
                return true;
            }
        });

        return returnCol;
    };

    // call all cards after first rendering
    useEffect(() => {
        const url = `/api/cards/call-all-of-cards?userId=` + localStorage.getItem('primaryKey');
        (async () => {
            const res = await get(url);
            const data = res.data;
            data.forEach(curr => {
                curr.id = curr.FRONT_ID;
            });
            console.log('🚀 ~ file: CardList.js ~ line 292 ~ data', data);
            setRows(data);
            history.push('/card-list');
        })();
    }, []);

    return (
        <div>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <div style={{height: '82vh', width: '100%'}} className={stylesOne.root}>
                        <DataGrid columns={cols} rows={rows} onCellClick={viewCardCols} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={stylesTwo.root}>
                        <RenderSelectedCard frontCard={selectedCard} backCard={selectedBackCard} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

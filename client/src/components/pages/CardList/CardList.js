import React, {useState, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {createTheme, darken, lighten} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/styles';
import {Grid, IconButton, Paper, TextField} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import {get, put} from 'axios';

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

function RenderSelectedCard(props) {
    const stylesThree = paperStyles();
    const card = props.card;
    const [cols, setCols] = useState([]);
    const [id, setId] = useState(0);
    const [text, setText] = useState('');

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

        return put(url, data, config);
    };

    const editCols = e => {
        e.stopPropagation();
        e.preventDefault();
        const text = e.target.value;
        const id = Number(e.target.id);
        setId(id);
        setText(text);

        cols.map(curr => {
            if (curr.BACK_ID === id) {
                curr.BACK_DATA = text;
                setCols(cols);
            }
        });
    };

    useEffect(() => {
        const frontId = card.FRONT_ID;
        if (id && text) {
            sendToServerBackColChanges(text, id);
        }

        if (frontId) {
            const url = '/api/cards/get-back-cols?frontId=' + frontId;
            get(url)
                .then(res => {
                    const data = res.data;
                    setCols(data);
                })
                .catch(err => console.log(err));
        }
    }, [card]);

    return (
        <React.Fragment>
            <Paper className={stylesThree.root} elevation={3} />

            {cols.length ? (
                cols.map(curr => {
                    return (
                        <Paper key={curr.BACK_ID} className={stylesThree.root} elevation={3}>
                            <TextField
                                id={curr.BACK_ID.toString()}
                                value={curr.BACK_DATA}
                                label='Filled'
                                variant='filled'
                                onChange={editCols}
                            />
                        </Paper>
                    );
                })
            ) : (
                <div></div>
            )}
        </React.Fragment>
    );
}

export default function StylingRowsGrid() {
    const stylesOne = tableStyles();
    const stylesTwo = paperContainerStyles();
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

    const viewCardCols = params => {
        const card = searchCard(rows, params.id);
        setSelectedCard(card);
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
            setRows(data);
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
                <Grid item xs={12} sm={6} justifyContent='center' alignItems='center'>
                    <div className={stylesTwo.root}>
                        <RenderSelectedCard card={selectedCard} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

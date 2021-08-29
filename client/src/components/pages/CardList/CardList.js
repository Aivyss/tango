import React, {useState, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {createTheme, darken, lighten} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/styles';
import {Grid, IconButton, Paper} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import {get} from 'axios';

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

export default function StylingRowsGrid() {
    const stylesOne = tableStyles();
    const stylesTwo = paperContainerStyles();
    const stylesThree = paperStyles();
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
    const [rows, setRows] = React.useState([]);
    const testRow = [
        {
            id: 1,
            FRONT_ID: 25,
            FRONT_DATA: 'asdf',
            CARD_NAME: 'my word',
            KIND_NAME: '테스트분류',
            DECK_NAME: '테스트덱',
            DUE_DATE: '2021-08-29',
        },
        {
            id: 2,
            FRONT_ID: 25,
            FRONT_DATA: 'aaaa',
            CARD_NAME: 'my word',
            KIND_NAME: '테스트분류',
            DECK_NAME: '테스트덱',
            DUE_DATE: '2021-08-29',
        },
        {
            id: 3,
            FRONT_ID: 25,
            FRONT_DATA: 25,
            CARD_NAME: 'my word',
            KIND_NAME: '테스트분류',
            DECK_NAME: '테스트덱',
            DUE_DATE: '2021-08-29',
        },
        {
            id: 4,
            FRONT_ID: 25,
            FRONT_DATA: 25,
            CARD_NAME: 'my word',
            KIND_NAME: '테스트분류',
            DECK_NAME: '테스트덱',
            DUE_DATE: '2021-08-29',
        },
        {
            id: 5,
            FRONT_ID: 25,
            FRONT_DATA: 25,
            CARD_NAME: 'my word',
            KIND_NAME: '테스트분류',
            DECK_NAME: '테스트덱',
            DUE_DATE: '2021-08-29',
        },
    ];

    // call all cards after first rendering
    useEffect(() => {
        const url = `/api/cards/call-all-of-cards?userId=` + localStorage.getItem('primaryKey');

        get(url)
            .then(res => {
                const data = res.data;

                data.map(curr => {
                    curr.id = curr.FRONT_ID;
                    return true;
                });
                setRows(data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <div style={{height: '82vh', width: '100%'}} className={stylesOne.root}>
                        <DataGrid columns={cols} rows={rows} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} justifyContent='center' alignItems='center'>
                    <div className={stylesTwo.root}>
                        <Paper className={stylesThree.root} elevation={3} />
                        <Paper className={stylesThree.root} elevation={3} />
                        <Paper className={stylesThree.root} elevation={3} />
                        <Paper className={stylesThree.root} elevation={3} />
                        <Paper className={stylesThree.root} elevation={3} />
                        <Paper className={stylesThree.root} elevation={3} />
                        <Paper className={stylesThree.root} elevation={3} />
                        <Paper className={stylesThree.root} elevation={3} />
                        <Paper className={stylesThree.root} elevation={3} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

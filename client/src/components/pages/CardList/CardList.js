import React, {useState, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {createTheme, darken, lighten} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/styles';
import {Grid, Paper} from '@material-ui/core';

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

export default function StylingRowsGrid() {
    const stylesOne = tableStyles();
    const stylesTwo = paperContainerStyles();
    const stylesThree = paperStyles();
    const cols = [
        {field: 'ID', width: 100},
        {field: 'Front', width: 130},
        {field: 'Card Categ.', width: 170},
        {field: 'Deck', width: 120},
        {field: 'Due Date', width: 140},
    ];
    const [rows, setRows] = React.useState([]);
    const testRow = [
        {id: 25, ID: 25, Front: 'my word', 'Card Categ.': '테스트분류', Deck: '테스트덱', 'Due Date': '2021-08-29'},
        {id: 26, ID: 25, Front: 'my word', 'Card Categ.': '테스트분류', Deck: '테스트덱', 'Due Date': '2021-08-29'},
        {id: 27, ID: 25, Front: 'my word', 'Card Categ.': '테스트분류', Deck: '테스트덱', 'Due Date': '2021-08-29'},
        {id: 28, ID: 25, Front: 'my word', 'Card Categ.': '테스트분류', Deck: '테스트덱', 'Due Date': '2021-08-29'},
        {id: 29, ID: 25, Front: 'my word', 'Card Categ.': '테스트분류', Deck: '테스트덱', 'Due Date': '2021-08-29'},
        {id: 30, ID: 25, Front: 'my word', 'Card Categ.': '테스트분류', Deck: '테스트덱', 'Due Date': '2021-08-29'},
        {id: 31, ID: 25, Front: 'my word', 'Card Categ.': '테스트분류', Deck: '테스트덱', 'Due Date': '2021-08-29'},
        {id: 32, ID: 25, Front: 'my word', 'Card Categ.': '테스트분류', Deck: '테스트덱', 'Due Date': '2021-08-29'},
    ];

    // call all cards after rendering
    useEffect(() => {}, []);

    return (
        <div>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <div style={{height: '82vh', width: '100%'}} className={stylesOne.root}>
                        <DataGrid columns={cols} rows={testRow} />
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

import React, {useState, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {createTheme, darken, lighten} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/styles';

function getThemePaletteMode(palette) {
    return palette.type || palette.mode;
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
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

export default function StylingRowsGrid() {
    const classes = useStyles();
    const cols = [{field: 'ID'}, {field: 'Front'}, {field: 'Card Carteg.'}, {field: 'Deck'}, {field: 'Due Date'}];
    const [rows, setRows] = React.useState([]);
    const testRow = [
        {FRONT_ID: 25, FRONT_DATA: 'front', CARD_NAME: '테스트분류', DECK_NAME: '테스트덱', DUE_DATE: '2021-08-29'},
    ];

    // call all cards after rendering
    useEffect(() => {}, []);
    return (
        <div style={{height: 400, width: '100%'}} className={classes.root}>
            <DataGrid columns={cols} rows={testRow} />
        </div>
    );
}

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {FixedSizeList} from 'react-window';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 400,
        backgroundColor: theme.palette.background.paper,
        display: 'inline-block',
    },
    wrapper: {
        textAlign: 'center',
    },
}));

function RenderRow(props) {
    // props의 구조는 { data, style, index, isScrolling }으로 되어있다.
    const {index, style, data} = props;
    let [deckList, setDeckList] = useState([]);
    console.log('🚀 ~ file: DeckList.js ~ line 24 ~ RenderRow ~ deckList', deckList);

    useEffect(() => {
        if (deckList.length <= 0) {
            setDeckList(data);
        }
    }, []);

    return (
        <ListItem button style={style} key={index}>
            {deckList.length === 0 ? null : <ListItemText primary={deckList[index].DECK_NAME} />}
        </ListItem>
    );
}

RenderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

export default function VirtualizedList(props) {
    const classes = useStyles();
    let [deckCount, setDeckCount] = useState(0);
    let [deckList, setDeckList] = useState([]);

    useEffect(() => {
        if (deckCount <= 0) {
            console.log('useEffect 덱콜');
            const id = sessionStorage.getItem('primaryKey');
            props.callDecksFromApi(id).then(array => {
                console.log(array);
                setDeckList(array);
                setDeckCount(array !== undefined ? (array.length <= 0 ? 0 : array.length) : 0);
            });
        }
    }, []);

    return (
        <div style={{display: 'inline-block'}}>
            <div className={classes.root}>
                <FixedSizeList height={400} width={600} itemSize={72} itemCount={deckCount} itemData={deckList}>
                    {RenderRow}
                </FixedSizeList>
            </div>
        </div>
    );
}

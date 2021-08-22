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
    console.log('🚀 ~ file: DeckList.js ~ line 23 ~ RenderRow ~ data', data);

    return data.map(curr => {
        return (
            <ListItem button style={style} key={index}>
                <ListItemText primary={curr.DECK_NAME} />
            </ListItem>
        );
    });
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
        const id = sessionStorage.getItem('primaryKey');
        props.callDecksFromApi(id).then(() => {
            setDeckCount(props.getDeckCount());
            setDeckList(props.getDeckList());
        });
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

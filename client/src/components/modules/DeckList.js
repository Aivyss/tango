import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {FixedSizeList} from 'react-window';
import {useHistory} from 'react-router';
import {makeStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import {get} from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 400,
        backgroundColor: theme.palette.background.paper,
        display: 'inline-block',
        margin: 5,
    },
    wrapper: {
        textAlign: 'center',
    },
    centerBox: {
        width: '100%',
        height: '100vh',
        // display: '-webkit-box',
        // display: '-moz-box',
        // display: '-ms-flexbox',
        display: 'flex',
        WebkitBoxAlign: 'center',
        MozBoxAlign: 'center',
        msFlexAlign: 'center',
        alignItems: 'center' /* 수직 정렬 */,

        WebkitBoxPack: 'center',
        MozBoxPack: 'center',
        msFlexPack: 'center',
        justifyContent: 'center' /* 수평 정렬 */,
    },
}));

function RenderRow(props) {
    // props의 구조는 { data, style, index, isScrolling }으로 되어있다.
    const {index, style, data} = props;
    const deckList = data[0];
    const prevProps = data[1];
    const history = useHistory();

    return (
        <ListItem
            button
            style={style}
            key={index}
            onClick={() => {
                console.log('deckList ~ button ~ deckId: ', deckList[index].DECK_ID);
                const deckId = Number(deckList[index].DECK_ID);
                if (prevProps !== null) {
                    prevProps.setTargetDeckId(deckId);
                    prevProps.setDeckInfo(deckId).then(() => {
                        prevProps.setTargetDeck(deckId, deckList[index].DECK_NAME);
                        history.push('/deck-room');
                    });
                }
            }}
        >
            {deckList.length === 0 ? null : <ListItemText primary={deckList[index].DECK_NAME} />}
        </ListItem>
    );
}

RenderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

export default function VirtualizedList(props) {
    const id = localStorage.getItem('primaryKey');
    const classes = useStyles();
    const callDecksFromApi = param => {
        const id = param;
        const url = '/api/decks/callAllDecks?id=' + id;

        return get(url)
            .then(res => {
                console.log('get res=', res.data);
                props.setDeckList(res.data);

                return res.data;
            })
            .catch(() => {
                console.log('failed deck loading');
            });
    };
    const callCardCategoryFromApi = id => {
        const url = '/api/cards/callAllCardCategories?id=' + id;

        get(url).then(res => {
            const data = res.data;
            props.setAllCardCategories(data);
        });
    };

    useEffect(() => {
        console.log('useEffect 덱콜 카드콜');

        callDecksFromApi(id);
        callCardCategoryFromApi(id);
    }, [id]);

    return (
        <div className={classes.centerBox}>
            <div>
                <div className={classes.root}>
                    <Box boxShadow={3}>
                        <FixedSizeList
                            height={400}
                            width={600}
                            itemSize={72}
                            itemCount={props.deckList ? props.deckList.length : 0}
                            itemData={[props.deckList, props]}
                        >
                            {RenderRow}
                        </FixedSizeList>
                    </Box>
                </div>
            </div>
        </div>
    );
}

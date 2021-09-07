import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Box, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import {useHistory} from 'react-router';
import axios, {AxiosResponse} from 'axios';

// * Recoils
import {useRecoilState} from 'recoil';
import {deckNameState, allDeckState, cardKindState, deckInfoState, targetDeckIdState} from '../../_recoil';
import {DeckTable, KindTable} from '../../_recoil/dbs';

// * CSS Styles
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

// * Props interface
interface PropsDeckList {
    deckList: DeckTable[];
    setDeckList(deckList: DeckTable[]): void;
    setAllCardCategories(kindList: KindTable[]): void;
    setDeckInfo(info: {newCard: number; reviewCard: number}): void;
    setTargetDeck(deckId: number): void;
    setTargetDeckName(name: string): void;
}

interface PropsRenderRow {
    setDeckInfo(info: {newCard: number; reviewCard: number}): void;
    setTargetDeck(deckId: number): void;
    setTargetDeckName(name: string): void;
    deckList: DeckTable[];
}

// * Container Component
export default function Container() {
    const [deckId, setDeckId] = useRecoilState(targetDeckIdState);
    const [deckName, setDeckName] = useRecoilState(deckNameState);
    const [deckList, setDeckList] = useRecoilState(allDeckState);
    const [cardKinds, setCardKinds] = useRecoilState(cardKindState);
    const [info, setInfo] = useRecoilState(deckInfoState);

    return (
        <DeckList
            deckList={deckList}
            setDeckList={setDeckList}
            setAllCardCategories={setCardKinds}
            setDeckInfo={setInfo}
            setTargetDeck={setDeckId}
            setTargetDeckName={setDeckName}
        />
    );
}

// * Presentational Components
function RenderRow(props: ListChildComponentProps<PropsRenderRow>) {
    // props의 구조는 { data, style, index, isScrolling }으로 되어있다.
    const {index, style, data} = props;
    const {setDeckInfo, setTargetDeckName, setTargetDeck, deckList} = data;
    const history = useHistory();

    const getDeckInfo = (deckId: string) => {
        const url = '/api/decks/get-deck-info/?deckId=' + deckId;

        return axios
            .get(url)
            .then((res: AxiosResponse<{newCard: number; reviewCard: number}>) => {
                const data = res.data;
                console.log('deckList ~ deckInfo ~ apicall:', data);
                setDeckInfo(data);
                return data;
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <ListItem
            button
            style={style}
            key={index}
            onClick={() => {
                const deckId = deckList[index].DECK_ID;
                if (deckList.length > 0) {
                    getDeckInfo(deckId.toString()).then(() => {
                        setTargetDeck(deckId);
                        setTargetDeckName(deckList[index].DECK_NAME);
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

function DeckList(props: PropsDeckList) {
    const id = localStorage.getItem('primaryKey');
    const classes = useStyles();
    const callDecksFromApi = () => {
        const url = '/api/decks/callAllDecks?id=' + id;

        return axios
            .get(url)
            .then(res => {
                console.log('get res=', res.data);
                props.setDeckList(res.data);

                return res.data;
            })
            .catch(() => {
                console.log('failed deck loading');
            });
    };
    const callCardCategoryFromApi = () => {
        const url = '/api/cards/call-all-card-categories?userId=' + id;

        axios.get(url).then(res => {
            const data = res.data;
            props.setAllCardCategories(data);
        });
    };

    useEffect(() => {
        console.log('useEffect 덱콜 카드콜');

        callDecksFromApi();
        callCardCategoryFromApi();
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
                            itemData={{
                                setDeckInfo: props.setDeckInfo,
                                setTargetDeck: props.setTargetDeck,
                                setTargetDeckName: props.setTargetDeckName,
                                deckList: props.deckList,
                            }}
                        >
                            {RenderRow}
                        </FixedSizeList>
                    </Box>
                </div>
            </div>
        </div>
    );
}

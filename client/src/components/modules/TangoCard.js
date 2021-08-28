import React, {useEffect, useState} from 'react';
import cx from 'clsx';
import {blueGrey} from '@material-ui/core/colors';
import NoSsr from '@material-ui/core/NoSsr';
import GoogleFontLoader from 'react-google-font-loader';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {Column, Row, Item} from '@mui-treasury/components/flex';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Grid, IconButton} from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {DoneAll, Done} from '@material-ui/icons';
import {Reply, ReplyAll} from '@material-ui/icons';
import Visibility from '@material-ui/icons/Visibility';
import SideNav from '../../containers/modules/sidenav/SideNav';
import {post} from 'axios';

const useStyles = makeStyles(() => ({
    root: {
        height: '100vh',
    },
    content: {
        minHeight: '35vh',
        height: '55vh',
        maxHeight: '65vh',
    },
    card: {
        border: '1px solid',
        borderColor: '#cfd8dc',
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    titleFont: {
        fontFamily: "'Kanit', san-serif",
        color: '#37474f',
    },
    header: {
        margin: 0,
        textAlign: 'center',
        fontSize: '1.25rem',
        letterSpacing: '1px',
    },
    ribbon: {
        textAlign: 'center',
        color: 'rgba(0,0,0,0.87)',
        letterSpacing: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        textAlign: 'center',
        margin: '0 auto',
    },
    oneElement: {
        marginLeft: 10,
        marginRight: 10,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        display: 'table',
    },
    grow: {
        flexGrow: 1,
    },
}));

// return interval days
// param1: repetition times, params2:old E-Factor
function calcInterval(n, ef) {
    let returnValue;

    if (n === 1) {
        returnValue = 1;
    } else if (n === 2) {
        returnValue = 2;
    } else if (n > 2) {
        returnValue = calcInterval(n - 1) * ef;
    }

    return returnValue;
}

// return new E-Factor
function calcEFactor(ef, q) {
    let newEF = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));

    if (q < 3) {
        newEF = ef;
    }

    if (newEF < 1.3) {
        newEF = 1.3;
    }

    return newEF;
}

function shuffleFisherYates(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() - (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function evaluateCard(key, isBackSide, studyCards) {
    let temp = isBackSide;
    let q = -1;
    let timeInterval = 0;
    let newEFactor = studyCards[0].E_FACTOR;

    if (isBackSide) {
        switch (key) {
            case 49:
                q = 0;
                break;
            case 50:
                q = 1;
                break;
            case 13:
            case 51:
                q = 3;
                break;
            case 52:
                q = 5;
                break;
            default:
                temp = !isBackSide;
                break;
        }

        if (temp && q !== -1) {
            timeInterval = calcInterval(studyCards[0].REPETITION, studyCards[0].E_FACTOR);

            if (q >= 1) {
                newEFactor = calcEFactor(studyCards[0].E_FACTOR, q);
                studyCards[0].E_FACTOR = newEFactor;
                studyCards[0].REPETITION += 1;
            } else {
                studyCards[0].REPETITION = 0;
                shuffleFisherYates(studyCards);
            }
        }
    }

    temp = !temp;

    return [timeInterval, newEFactor, q, temp];
}

function sendToServer(card, timeInterval, newEFactor) {
    const url = `/api/cards/update-cards-status`;
    const data = {
        frontId: card.FRONT_ID,
        interval: timeInterval,
        eFactor: newEFactor,
        dueDate: card.DUE_DATE,
        repetition: card.REPETITION,
    };
    const config = {
        headers: {
            'content-type': 'application/json',
        },
    };
    return post(url, data, config);
}

export default React.memo(function TangoCardFront(props) {
    const styles = useStyles();
    const studyCards = props.studyCards;
    const [flipped, setFlipped] = useState(false);

    const viewBackside = () => {
        setFlipped(true);
    };
    const handleSideBar = () => {
        props.handleSideNavBar(true);
    };
    const doKeyEvent = e => {
        e.stopPropagation();

        const key = e.keyCode;
        let timeInterval, newEFactor, q, temp;
        if (flipped) {
            [timeInterval, newEFactor, q, temp] = evaluateCard(key, flipped, studyCards);

            if (q >= 1) {
                sendToServer(studyCards[0], timeInterval, newEFactor).then(res => {
                    const bool = res.data;

                    if (bool) {
                        studyCards.splice(0, 1);
                    } else {
                        shuffleFisherYates(studyCards);
                    }

                    props.setStudyCards(studyCards);
                });
            } else {
                props.setStudyCards(studyCards);
            }
        }
        setFlipped(temp);
    };

    useEffect(() => {
        document.addEventListener('keydown', doKeyEvent);

        return function cleanup() {
            document.removeEventListener('keydown', doKeyEvent);
        };
    });

    if (studyCards.length) {
        return (
            <div>
                <div style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                    <NoSsr>
                        <GoogleFontLoader fonts={[{font: 'Kanit', weights: [400, 700]}]} />
                    </NoSsr>
                    <React.Fragment>
                        <CssBaseline />
                        <Container className={styles.root} maxWidth='md'>
                            <Typography style={{height: '85vh', display: 'flex'}}>
                                <Grid container direction='row' justifyContent='center' alignItems='center'>
                                    <Box maxWidth={'100%'} maxHeight={'100%'} minWidth={'75%'}>
                                        <Column p={0} gap={3} className={styles.card}>
                                            <Item>
                                                <h2 className={cx(styles.titleFont, styles.header)}>
                                                    Deck name: {props.targetDeckName}
                                                </h2>
                                            </Item>
                                            <Item
                                                py={1}
                                                bgcolor={'rgb(255, 189, 128)'}
                                                className={cx(styles.titleFont, styles.ribbon)}
                                            >
                                                Remain: {studyCards.length}
                                            </Item>
                                            <Item className={styles.content}>
                                                {flipped ? (
                                                    studyCards[0].BACK_COLS.map((curr, idx) => {
                                                        return (
                                                            <Box
                                                                key={idx}
                                                                px={1}
                                                                mt={1}
                                                                className={cx(styles.titleFont, styles.ribbon)}
                                                            >
                                                                {curr.BACK_DATA}
                                                            </Box>
                                                        );
                                                    })
                                                ) : (
                                                    <Box px={1} mt={1} className={cx(styles.titleFont, styles.ribbon)}>
                                                        {studyCards[0].FRONT_DATA}
                                                    </Box>
                                                )}
                                            </Item>
                                        </Column>
                                    </Box>
                                </Grid>
                            </Typography>
                        </Container>
                    </React.Fragment>
                </div>

                <div>
                    <AppBar position='fixed' color='primary' className={styles.appBar}>
                        <Toolbar>
                            <IconButton
                                onClick={handleSideBar}
                                size='small'
                                edge='start'
                                color='inherit'
                                aria-label='open drawer'
                            >
                                <MenuIcon />
                            </IconButton>
                            {flipped ? (
                                <div className={styles.fabButton}>
                                    <Fab color='secondary' aria-label='1' className={styles.oneElement}>
                                        <ReplyAll />
                                    </Fab>
                                    <Fab color='secondary' aria-label='2' className={styles.oneElement}>
                                        <Reply />
                                    </Fab>
                                    <Fab color='secondary' aria-label='3' className={styles.oneElement}>
                                        <Done />
                                    </Fab>
                                    <Fab color='secondary' aria-label='4' className={styles.oneElement}>
                                        <DoneAll />
                                    </Fab>
                                </div>
                            ) : (
                                <div className={styles.fabButton}>
                                    <Fab
                                        color='secondary'
                                        aria-label='1'
                                        className={styles.oneElement}
                                        onClick={viewBackside}
                                    >
                                        <Visibility />
                                    </Fab>
                                </div>
                            )}
                            <div className={styles.grow} />
                            <IconButton size='small' edge='end' color='inherit'>
                                <MoreVert />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div tabIndex={0} onKeyDown={doKeyEvent}></div>
                </div>
                <SideNav />
            </div>
        );
    } else {
        return (
            <div style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                <NoSsr>
                    <GoogleFontLoader fonts={[{font: 'Kanit', weights: [400, 700]}]} />
                </NoSsr>
                <React.Fragment>
                    <CssBaseline />
                    <Container className={styles.root} maxWidth='md'>
                        <Typography style={{height: '85vh', display: 'flex'}}>
                            <Grid container direction='row' justifyContent='center' alignItems='center'>
                                <Box maxWidth={'100%'} maxHeight={'100%'} minWidth={'75%'}>
                                    <Column p={0} gap={3} className={styles.card}>
                                        <Item>
                                            <h2 className={cx(styles.titleFont, styles.header)}>
                                                Deck name: {props.targetDeckName}
                                            </h2>
                                        </Item>
                                        <Item
                                            py={1}
                                            bgcolor={'rgb(255, 189, 128)'}
                                            className={cx(styles.titleFont, styles.ribbon)}
                                        >
                                            Remain: {studyCards.length}
                                        </Item>
                                        <Item className={styles.content}>
                                            <Container maxWidth='md'></Container>
                                        </Item>
                                    </Column>
                                </Box>
                            </Grid>
                        </Typography>
                    </Container>
                </React.Fragment>
                <SideNav />
            </div>
        );
    }
});

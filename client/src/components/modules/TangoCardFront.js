import React from 'react';
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
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {DoneAll, Done} from '@material-ui/icons';
import {Reply, ReplyAll} from '@material-ui/icons';

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

export default React.memo(function TangoCardFront(props) {
    const styles = useStyles();

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
                                            <h2 className={cx(styles.titleFont, styles.header)}>deckName</h2>
                                        </Item>
                                        <Item
                                            py={1}
                                            bgcolor={'rgb(255, 189, 128)'}
                                            className={cx(styles.titleFont, styles.ribbon)}
                                        >
                                            remain
                                        </Item>
                                        <Item className={styles.content}>
                                            <Box px={1} mt={1} className={cx(styles.titleFont, styles.ribbon)}>
                                                content
                                            </Box>
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
                        <IconButton size='small' edge='start' color='inherit' aria-label='open drawer'>
                            <MenuIcon />
                        </IconButton>
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
                        <div className={styles.grow} />
                        <IconButton size='small' edge='end' color='inherit'>
                            <MoreVert />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    );
});

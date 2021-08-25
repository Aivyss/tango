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
import {Grid} from '@material-ui/core';

const useButtonStyles = makeStyles(() => ({
    root: {
        fontFamily: "'Kanit', san-serif",
        fontWeight: 'bold',
        fontSize: 16,
    },
    text: {
        '&:hover': {
            backgroundColor: blueGrey[50],
        },
    },
    contained: {
        borderRadius: 40,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: blueGrey[50],
        color: blueGrey[700],
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
        },
        '&:focus': {
            boxShadow: 'none',
        },
    },
    containedPrimary: {
        transition:
            '250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: '#ffbd80',
        color: blueGrey[900],
        '&:hover': {
            backgroundColor: '#FF9A3E',
        },
    },
}));

const useStyles = makeStyles(() => ({
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
}));

export default React.memo(function AnkiCard(props) {
    const styles = useStyles();
    const btnStyles = useButtonStyles();
    return (
        <>
            <NoSsr>
                <GoogleFontLoader fonts={[{font: 'Kanit', weights: [400, 700]}]} />
            </NoSsr>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth='sm'>
                    <Typography style={{backgroundColor: '#cfe8fc', height: '100vh', display: 'flex'}}>
                        <Grid container direction='row' justifyContent='center' alignItems='center'>
                            <Box maxWidth={'100%'} maxHeight={'100%'}>
                                <Column p={0} gap={3} className={styles.card}>
                                    <Item>
                                        <h2 className={cx(styles.titleFont, styles.header)}>ระดับใกล้โปร • Turn-Pro</h2>
                                    </Item>
                                    <Item
                                        py={1}
                                        bgcolor={'rgb(255, 189, 128)'}
                                        className={cx(styles.titleFont, styles.ribbon)}
                                    >
                                        เปิดรับสมัครแล้ว ถึง 30 พ.ค. 63
                                    </Item>
                                    <Item>
                                        <Box px={1} mt={1} className={cx(styles.titleFont)}>
                                            컨텐츠부
                                        </Box>
                                    </Item>
                                    <Row wrap gap={1} px={2} pb={2}>
                                        <Item grow>
                                            <Button
                                                classes={btnStyles}
                                                variant={'contained'}
                                                color={'primary'}
                                                fullWidth
                                            >
                                                Button1
                                            </Button>
                                        </Item>
                                        <Item grow>
                                            <Button classes={btnStyles} variant={'contained'} fullWidth>
                                                Button2
                                            </Button>
                                        </Item>
                                        <Item grow>
                                            <Button classes={btnStyles} variant={'contained'} fullWidth>
                                                Button3
                                            </Button>
                                        </Item>
                                        <Item grow>
                                            <Button classes={btnStyles} variant={'contained'} fullWidth>
                                                Button4
                                            </Button>
                                        </Item>
                                    </Row>
                                </Column>
                            </Box>
                        </Grid>
                    </Typography>
                </Container>
            </React.Fragment>
        </>
    );
});

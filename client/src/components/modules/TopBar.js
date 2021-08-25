import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {alpha, makeStyles} from '@material-ui/core/styles';
import Home from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Inbox from '@material-ui/icons/Inbox';
import Add from '@material-ui/icons/Add';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
import MeetingRoom from '@material-ui/icons/MeetingRoom';
import {useHistory} from 'react-router-dom';
import {DnsSharp} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    btnGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function TopBar(props) {
    const classes = useStyles();
    const history = useHistory();

    const openCreateDeckDialog = () => {
        props.openCreateDeckDialog();
    };

    const openCreateCardDialog = () => {
        props.openCreateCardDialog();
    };

    const doLogout = () => {
        sessionStorage.removeItem('primaryKey');
        props.doLogout();
    };

    const goToHome = () => {
        history.push('/');
    };

    const handleCreateCardCategoryDialog = () => {
        props.handleCreateCardCategoryDialog(!props.createCardCategoryDialogIsOpen);
    };

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        onClick={goToHome}
                        edge='start'
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='open drawer'
                    >
                        <Home />
                    </IconButton>
                    <Typography className={classes.title} variant='h6' noWrap>
                        Tango
                    </Typography>
                    <div className={classes.btnGroup}>
                        <ButtonGroup variant='contained' color='tertiary' aria-label='contained primary button group'>
                            <Button onClick={openCreateDeckDialog}>
                                <Add fontSize='small' />
                                <Inbox />
                                Deck
                            </Button>
                            <Button onClick={handleCreateCardCategoryDialog}>
                                <Add fontSize='small' />
                                <DnsSharp />
                                Card Categ.
                            </Button>
                            <Button onClick={openCreateCardDialog}>
                                <Add fontSize='small' />
                                <ViewCarousel />
                                Card
                            </Button>
                            <Button onClick={doLogout}>
                                <MeetingRoom />
                                Logout
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder='Search…'
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

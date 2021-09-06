import React from 'react';
import {Button, ButtonGroup, AppBar, InputBase, Toolbar, IconButton, Typography} from '@material-ui/core';
import {Home, Add, MeetingRoom, DnsSharp, Pageview, Search, ViewCarousel, Inbox, Forum} from '@material-ui/icons';
import {alpha, makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';

//* Recoils
import {useRecoilState} from 'recoil';
import {dDOpenState, cDOpenState, cCDOpenState, isLoginedState, allDeckState, cardKindState} from '../../_recoil';
import {DeckTable, KindTable} from '../../_recoil/dbs';

// * CSS styles
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

// * Props Interface
interface PropsTopBar {
    openCreateDeckDialog(): void;
    openCreateCardDialog(): void;
    handleCreateCardCategoryDialog(bools: boolean): void;
    doLogin(bools: boolean): void;
    doLogout(): void;
    setAllDeck(data: DeckTable[]): void;
    setAllCardCategories(data: KindTable[]): void;
    createCardCategoryDialogIsOpen: boolean;
}

// * Container Component
export default function Container() {
    const [cardDialog, setCardDialog] = useRecoilState(cDOpenState);
    const [cardCategDialog, setCardCategDialog] = useRecoilState(cCDOpenState);
    const [deckDialog, setDeckDialog] = useRecoilState(dDOpenState);
    const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
    const [allDeck, setAllDeck] = useRecoilState(allDeckState);
    const [kindCard, setKindCard] = useRecoilState(cardKindState);

    const openCreateDeckDialog = () => {
        setDeckDialog(true);
    };
    const openCreateCardDialog = () => {
        setCardDialog(true);
    };
    const handleCreateCardCategoryDialog = (bools: boolean) => {
        setCardCategDialog(bools);
    };
    const doLogin = (bools: boolean) => {
        setIsLogined(bools);
    };
    const doLogout = () => {
        setIsLogined(false);
    };
    const setAllDeckFunc = (data: DeckTable[]) => {
        setAllDeck(data);
    };
    const setKindCardFunc = (data: KindTable[]) => {
        setKindCard(data);
    };

    return (
        <TopBar
            openCreateDeckDialog={openCreateDeckDialog}
            openCreateCardDialog={openCreateCardDialog}
            handleCreateCardCategoryDialog={handleCreateCardCategoryDialog}
            doLogin={doLogin}
            doLogout={doLogout}
            setAllDeck={setAllDeckFunc}
            setAllCardCategories={setKindCardFunc}
            createCardCategoryDialogIsOpen={cardCategDialog}
        />
    );
}

// * Presentational Component
function TopBar(props: PropsTopBar) {
    const classes = useStyles();
    const history = useHistory();

    const openCreateDeckDialog = () => {
        props.openCreateDeckDialog();
    };

    const openCreateCardDialog = () => {
        const id = localStorage.getItem('primaryKey');
        const url = '/api/decks/callAllDecks/?id=' + id;
        axios
            .get(url)
            .then((res: AxiosResponse) => {
                console.log('작동첵2');
                const data = res.data;
                props.setAllDeck(data);
            })
            .catch(err => console.log(err))
            .then(() => {
                const url = '/api/cards/call-all-card-categories?userId=' + id;
                axios
                    .get(url)
                    .then((res: AxiosResponse) => {
                        const data = res.data;
                        props.setAllCardCategories(data);
                        props.openCreateCardDialog();
                    })
                    .catch(err => console.log(err))
                    .then(props.openCreateCardDialog);
            });
    };

    const doLogout = () => {
        localStorage.removeItem('primaryKey');
        props.doLogout();
        history.push('/');
    };

    const goToHome = () => {
        history.push('/');
    };

    const goToCardList = () => {
        history.push('/card-list');
    };

    const handleCreateCardCategoryDialog = () => {
        props.handleCreateCardCategoryDialog(!props.createCardCategoryDialogIsOpen);
    };

    const openForumPage = () => {
        history.push('/forum');
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
                        <ButtonGroup variant='contained' color='default' aria-label='contained primary button group'>
                            <Button onClick={goToCardList}>
                                <Pageview fontSize='small' />
                                Card List
                            </Button>
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
                            <Button onClick={openForumPage}>
                                <Forum />
                                Forum
                            </Button>
                            <Button onClick={doLogout}>
                                <MeetingRoom />
                                Logout
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search />
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

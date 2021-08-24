import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {Button} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CreateCardDialog from '../../../containers/modules/CreateCardDialog';
import {makeStyles} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';

const buttonStyles = {margin: 15, display: 'inline-block'};
const buttonWrapperStyles = {width: '100%', textAlign: 'center'};
const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
}));

export default function DeckStatus(props) {
    const [openCreateCardModal, setOpenCreateCardModal] = useState(false);
    const [deckId, setDeckId] = useState(-1);
    const [deckInfo, setDeckInfo] = useState({newCard: 0, reviewCard: 0});
    const classes = useStyles();
    const centerStyles = {
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
    };

    const clickAddCardButton = () => {
        setOpenCreateCardModal(true);
    };

    const modalClose = () => {
        setOpenCreateCardModal(false);
    };

    useEffect(() => {
        setDeckId(props.getDeckId());
        setDeckInfo(props.getDeckInfo());
    }, []);

    return (
        <div style={centerStyles}>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={classes.root}>
                            <Badge badgeContent={deckInfo.newCard} color='primary'>
                                <ViewCarouselIcon fontSize='large' />
                            </Badge>
                            <Badge badgeContent={deckInfo.reviewCard} color='error'>
                                <ViewCarouselIcon fontSize='large' />
                            </Badge>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <React.Fragment>
                            <CssBaseline />
                            <Container maxWidth='sm'>
                                <div style={buttonWrapperStyles}>
                                    <div style={buttonStyles}>
                                        <Button variant='contained' color='primary' onClick={clickAddCardButton}>
                                            Add Card
                                        </Button>
                                    </div>
                                    <div style={buttonStyles}>
                                        <Button variant='contained' color='primary'>
                                            start
                                        </Button>
                                    </div>
                                    <div style={buttonStyles}>
                                        <Button variant='contained' color='secondary'>
                                            cancel
                                        </Button>
                                    </div>
                                </div>
                            </Container>
                        </React.Fragment>
                    </Grid>
                </Grid>
                <CreateCardDialog open={openCreateCardModal} deckId={deckId} setOpen={modalClose} />
            </div>
        </div>
    );
}

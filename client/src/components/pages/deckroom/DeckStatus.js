import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {Button} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CreateCardDialog from '../../modules/CreateCardDialog';

const buttonStyles = {margin: 15, display: 'inline-block'};
const buttonWrapperStyles = {width: '100%', textAlign: 'center'};

export default function DeckStatus(props) {
    const [openCreateCardModal, setOpenCreateCardModal] = useState(false);
    const [deckId, setDeckId] = useState(-1);
    const [deckInfo, setDeckInfo] = useState({});

    const clickAddCardButton = () => {
        setOpenCreateCardModal(true);
    };

    useEffect(() => {
        setDeckId(props.getDeckId());
    }, [deckId]);

    useEffect(() => {
        props.getDeckInfo().then(data => {
            setDeckInfo(data);
        });
    }, [deckInfo]);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    모꼬
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
            <CreateCardDialog open={openCreateCardModal} deckId={deckId} />
        </>
    );
}

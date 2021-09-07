import {Fragment, useState} from 'react';
import {Grid} from '@material-ui/core';
import {Button} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import axios, {AxiosResponse} from 'axios';
import {useHistory} from 'react-router-dom';

// * Recoils
import {useRecoilState} from 'recoil';
import {targetDeckIdState, deckInfoState, studyCardsState, smDOpenState} from '../../../_recoil';
import {IStudyCard} from '../../../_recoil';

// * CSS Styles
const buttonStyles = {margin: 15, display: 'inline-block'};
const buttonWrapperStyles = {width: '100%' as const, textAlign: 'center' as const};
const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
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

// * Container Component
export default function ContainerComp() {
    const [deckInfo, setDeckInfo] = useRecoilState(deckInfoState);
    const [deckId, setDeckId] = useRecoilState(targetDeckIdState);
    const [studyCards, setStudyCards] = useRecoilState(studyCardsState);
    const [studyMode, setStudyMode] = useRecoilState(smDOpenState);

    return (
        <DeckStatus
            deckInfo={deckInfo}
            deckId={deckId!}
            setStudyCards={setStudyCards}
            handleStudyModeDialog={setStudyMode}
        />
    );
}

// * Props Interface
interface PropsDeckStatus {
    deckInfo: {newCard: number; reviewCard: number};
    deckId: number;
    setStudyCards(studyCard: IStudyCard[]): void;
    handleStudyModeDialog(bools: boolean): void;
}

// * Presentational Component
function DeckStatus(props: PropsDeckStatus) {
    const deckInfo = props.deckInfo;
    const deckId = props.deckId;
    const classes = useStyles();
    const history = useHistory();

    const clickStart = () => {
        const url = `/api/decks/call-study-card?deckId=${deckId}`;

        axios
            .get(url)
            .then((res: AxiosResponse<IStudyCard[]>) => {
                const data = res.data;
                props.setStudyCards(data);
                props.handleStudyModeDialog(true);
            })
            .catch(err => console.log(err));
    };

    const clickCancel = () => {
        history.push('/');
    };

    return (
        <div className={classes.centerBox}>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={classes.root}>
                            <Badge badgeContent={deckInfo.newCard.toString()} color='primary'>
                                <ViewCarouselIcon fontSize='large' />
                            </Badge>
                            <Badge badgeContent={deckInfo.reviewCard.toString()} color='error'>
                                <ViewCarouselIcon fontSize='large' />
                            </Badge>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Fragment>
                            <CssBaseline />
                            <Container maxWidth='sm'>
                                <div style={buttonWrapperStyles}>
                                    <div style={buttonStyles}>
                                        <Button variant='contained' color='primary' onClick={clickStart}>
                                            start
                                        </Button>
                                    </div>
                                    <div style={buttonStyles}>
                                        <Button variant='contained' color='secondary' onClick={clickCancel}>
                                            cancel
                                        </Button>
                                    </div>
                                </div>
                            </Container>
                        </Fragment>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function CreateCardDialog(props) {
    const classes = useStyles();
    const deckId = props.getDeckId();
    const [kindCard, setKindCard] = useState([]);

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSave = () => {
        props.setOpen(false);
    };

    useEffect(() => {
        props.getKindOfCard().then(data => {
            setKindCard(data);
        });
    }, []);

    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant='h6' className={classes.title}>
                            新しいカードを作成し、デックに入れます。
                        </Typography>
                        <Button autoFocus color='inherit' onClick={handleSave}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </div>
    );
}

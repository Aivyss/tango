import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import App from '../../App';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function SignupDialog(props) {
    let [open, setOpen] = useState(false);
    console.log('props.open =', props.open);
    let [comp, setComp] = useState();

    const handleClickOpen = () => {};

    const handleClose = () => {
        setComp(App);
        setOpen(false);
    };

    const signup = () => {};

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    return (
        <main>
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-slide-title'
                    aria-describedby='alert-dialog-slide-description'
                >
                    <DialogTitle id='alert-dialog-slide-title'>{'会員登録'}</DialogTitle>
                    <DialogContent></DialogContent>
                    <DialogActions>
                        <Button onClick={signup} color='primary'>
                            会員登録
                        </Button>
                        <Button onClick={handleClose} color='primary'>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div children={comp}></div>
        </main>
    );
}

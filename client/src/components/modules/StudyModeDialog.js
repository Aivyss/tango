import React, {useEffect, useState} from 'react';
import {Dialog} from '@material-ui/core';
import {Grow} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';

import {blueGrey} from '@material-ui/core/colors';
import TangoCardFront from './TangoCardFront';
import classnames from 'classnames';

export default function StudyModeDialog(props) {
    const handleClose = () => {
        props.handleStudyModeDialog(false);
    };

    return (
        <>
            <Dialog fullScreen open={props.studyModeDialogIsOpen} onClose={handleClose} TransitionComponent={Grow}>
                <Button onclick={handleClose}>임시탈출버튼</Button>
                <TangoCardFront />
            </Dialog>
        </>
    );
}

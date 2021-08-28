import React from 'react';
import {Dialog} from '@material-ui/core';
import {Grow} from '@material-ui/core';
import {Button} from '@material-ui/core';
import TangoCard from '../../containers/modules/TangoCard';

export default function StudyModeDialog(props) {
    return (
        <>
            <Dialog fullScreen open={props.studyModeDialogIsOpen} TransitionComponent={Grow}>
                <TangoCard />
            </Dialog>
        </>
    );
}

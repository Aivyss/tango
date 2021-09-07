import React from 'react';
import {Dialog} from '@material-ui/core';
import {Grow} from '@material-ui/core';
import {Button} from '@material-ui/core';
import TangoCard from '../modules/TangoCard';
import SideNav from '../Navs/SideNav';

// * Recoil
import {useRecoilState} from 'recoil';
import {smDOpenState} from '../../_recoil';

// * Container Component
export default function Container() {
    const [studyMode, setStudyMode] = useRecoilState(smDOpenState);

    return <StudyModeDialog studyModeDialogIsOpen={studyMode} />;
}

// * Props Interface
interface PropsStudyModeDialog {
    studyModeDialogIsOpen: boolean;
}

// * Presentational Component
function StudyModeDialog(props: PropsStudyModeDialog) {
    return (
        <>
            <Dialog fullScreen open={props.studyModeDialogIsOpen} TransitionComponent={Grow}>
                <TangoCard />
                <SideNav />
            </Dialog>
        </>
    );
}

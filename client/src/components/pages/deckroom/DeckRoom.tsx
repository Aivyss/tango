import {Route, Switch} from 'react-router';
import DeckStatus from './DeckStatus';
import StudyModeDialog from '../../dialogs/StudyModeDialog';

export default function Container() {
    return <DeckRoom />;
}

function DeckRoom() {
    return (
        <>
            <Switch>
                <Route exact path='/deck-room'>
                    <DeckStatus />
                    <StudyModeDialog />
                </Route>
            </Switch>
        </>
    );
}

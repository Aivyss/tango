import {Route, Switch} from 'react-router';
import DeckStatus from '../../../containers/pages/deckroom/DeckStatus';
import StudyModeDialog from '../../../containers/modules/StudyModeDialog';

export default function DeckRoom() {
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

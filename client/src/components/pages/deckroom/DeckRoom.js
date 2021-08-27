import TangoCard from '../../modules/TangoCard';
import {Route, Switch} from 'react-router';
import DeckStatus from '../../../containers/pages/deckroom/DeckStatus';

export default function DeckRoom() {
    return (
        <>
            <Switch>
                <Route exact path='/deck-room'>
                    <DeckStatus />
                </Route>
                <Route path='/deck-room/cards'>
                    <TangoCard />
                </Route>
            </Switch>
        </>
    );
}

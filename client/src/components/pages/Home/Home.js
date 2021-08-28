import DeckList from '../../../containers/modules/DeckList';
import {Route, Switch} from 'react-router-dom';
import CreateDeckDialog from '../../../containers/modules/CreateDeckDialog';
import TopBar from '../../../containers/modules/TopBar';
import CreateCardDialog from '../../../containers/modules/CreateCardDialog';
import CreateCardCategoryDialog from '../../../containers/modules/CreateCardCategoryDialog';
import DeckRoom from '../deckroom/DeckRoom';
export default function Home(props) {
    return (
        <>
            <TopBar />
            <Switch>
                <Route exact path='/deck-room'>
                    <DeckRoom />
                </Route>
                <Route path='/'>
                    <DeckList />
                </Route>
            </Switch>
            <CreateDeckDialog />
            <CreateCardDialog />
            <CreateCardCategoryDialog />
        </>
    );
}

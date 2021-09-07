import React from 'react';
import DeckList from '../../modules/DeckList';
import {Route, Switch} from 'react-router-dom';
import TopBar from '../../Navs/TopBar';
import CreateDeckDialog from '../../dialogs/CreateDeckDialog';
import CreateCardDialog from '../../dialogs/CreateCardDialog';
import CreateCardCategoryDialog from '../../dialogs/CreateCardCategoryDialog';
import DeckRoom from '../deckroom/DeckRoom';
import CardList from '../cardList/CardList';
import ForumHome from '../forum/ForumHome';

// * Container Component
export default function Container() {
    return <Home />;
}

// * Presentational Component
function Home() {
    return (
        <>
            <TopBar />
            <Switch>
                <Route exact path='/deck-room'>
                    <DeckRoom />
                </Route>
                <Route exact path='/forum'>
                    <ForumHome />
                </Route>
                <Route exact path='/card-list'>
                    <CardList />
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

import React from 'react';
import AnkiCard from '../../modules/AnkiCard';
import {Route, Switch} from 'react-router';
import DeckStatus from './DeckStatus';

export default function DeckRoom() {
    return (
        <>
            <Switch>
                <Route exact path='/deck-room'>
                    <DeckStatus />
                </Route>
                <Route path='/deck-room/cards'>
                    <AnkiCard />
                </Route>
            </Switch>
        </>
    );
}

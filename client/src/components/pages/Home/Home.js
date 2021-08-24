import React, {useEffect, useState} from 'react';
import {Button} from '@material-ui/core';
import DeckList from '../../../containers/modules/DackList';
import {Route, Switch} from 'react-router-dom';
import CreateDeckDialog from '../../../containers/modules/CreateDeckDialog';
import DeckRoom from '../../../components/pages/deckroom/DeckRoom';
import TopBar from '../../../containers/modules/TopBar';

export default function Home(props) {
    return (
        <>
            <TopBar />
            <Switch>
                <Route path='/deck-room' component={DeckRoom} />
                <Route path='/'>
                    <DeckList />
                </Route>
            </Switch>
            <CreateDeckDialog />
        </>
    );
}

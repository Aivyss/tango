import React, {useEffect, useState} from 'react';
import {Button} from '@material-ui/core';
import DeckList from '../../../containers/modules/DackList';
import {Route, Switch} from 'react-router-dom';
import CreateDeckDialog from '../../../containers/modules/CreateDeckDialog';
import DeckRoom from '../../../components/pages/deckroom/DeckRoom';

export default function Home(props) {
    const [openDialog, setOpenDialog] = useState(false);

    const logout = () => {
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('primaryKey');
        props.loginCheck(false); // redux에서 삭제
        props.changeLoginStatus(false); // App 상태변경
    };

    const handleOpen = () => {
        setOpenDialog(!openDialog);
    };

    return (
        <div>
            <Switch>
                <Route path='/deck-room' component={DeckRoom} />
                <Route path='/'>
                    <DeckList />
                    <br />
                    <Button variant='contained' color='primary' onClick={handleOpen}>
                        create Deck
                    </Button>
                    <Button variant='contained' color='primary' onClick={logout}>
                        log out
                    </Button>
                </Route>
            </Switch>
            <CreateDeckDialog open={openDialog} handleOpen={handleOpen} />
        </div>
    );
}

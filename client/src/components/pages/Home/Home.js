import React, {useEffect, useState} from 'react';
import {Button} from '@material-ui/core';
import DeckList from '../../../containers/modules/DackList';
import {Route} from 'react-router-dom';
import CreateDeckDialog from '../../../containers/modules/CreateDeckDialog';

export default function Home(props) {
    const logout = () => {
        console.log('로그아웃 작동');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('primaryKey');
        props.loginCheck(false);
        props.history.push('/');
    };

    const openDialog = () => {
        props.history.push('/create-deck');
    };

    return (
        <div>
            <DeckList />
            <br />
            <Button variant='contained' color='primary' onClick={openDialog}>
                create Deck
            </Button>
            <Button variant='contained' color='primary' onClick={logout}>
                log out
            </Button>
            <Route path='/create-deck' component={CreateDeckDialog} />
        </div>
    );
}

import React, {useEffect, useState} from 'react';
import {Button} from '@material-ui/core';
import DeckList from '../../../containers/modules/DackList';

export default function Home(props) {
    const logout = () => {
        console.log('로그아웃 작동');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('primaryKey');
        props.loginCheck(false);
        props.history.push('/');
    };

    return (
        <div>
            <DeckList />
            <br />
            <Button variant='contained' color='primary'>
                create Deck
            </Button>
            <Button variant='contained' color='primary' onClick={logout}>
                log out
            </Button>
        </div>
    );
}
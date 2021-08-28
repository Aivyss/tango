import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Home, Create, DeleteForever} from '@material-ui/icons';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function SideNav(props) {
    const classes = useStyles();
    const history = useHistory();

    const closeDrawer = event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        props.handleSideNavBar(false);
    };

    const goToHome = () => {
        props.handleSideNavBar(false);
        props.handleStudyModeDialog(false);
        history.push('/');
    };

    return (
        <div>
            <React.Fragment>
                <Drawer open={props.sideNavBarIsOpen} onClose={closeDrawer}>
                    <div
                        className={clsx(classes.list)}
                        role='presentation'
                        onClick={closeDrawer}
                        onKeyDown={closeDrawer}
                    >
                        <List>
                            <ListItem button onClick={goToHome}>
                                <ListItemIcon>
                                    <Home />
                                </ListItemIcon>
                                <ListItemText primary='戻る' />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <DeleteForever />
                                </ListItemIcon>
                                <ListItemText primary='カードの削除' />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Create />
                                </ListItemIcon>
                                <ListItemText primary='カードの編集' />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </React.Fragment>
        </div>
    );
}

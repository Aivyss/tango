import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {AddBox} from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import DeleteIcon from '@material-ui/icons/Delete';
import {TextField} from '@material-ui/core';
import {Container} from '@material-ui/core';
import {Title} from '@material-ui/icons';
import {post, get} from 'axios';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    listRoot: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    listTitle: {
        margin: theme.spacing(4, 0, 2),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function CreateCardCategoryDialog(props) {
    const classes = useStyles();
    const [backFields, setBackFields] = useState([]);
    const [cardName, setCardName] = useState('');
    const [error, setError] = useState(false);

    const handleClose = () => {
        props.handleCreateCardCategoryDialog(false);
    };

    const deleteCol = colId => {
        backFields.splice(colId, 1);
        setBackFields([...backFields]);
    };

    const writeCol = e => {
        e.preventDefault();
        let id = e.target.id;
        console.log(id);
        id = Number(id.split('t-')[1]);
        backFields[id] = e.target.value;
        setBackFields([...backFields]);
    };
    useEffect(() => {
        const strLength = cardName ? cardName.length : 0;
        if (strLength > 0) {
            let url = `/api/cards/checkDuplicateCardName`;
            const userId = sessionStorage.getItem('primaryKey');
            url += `/?userId=${userId}&`;
            url += `cardName=${cardName}`;

            get(url)
                .then(res => {
                    if (res.data !== null && res.data !== undefined && res.data.length > 0) {
                        alert('中腹のカードネームです。');
                        setError(true);
                    } else {
                        setError(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [cardName]);

    const handleSave = () => {
        if (!error) {
            const url = '/api/cards/create-card-category';
            console.log(typeof backFields);
            console.log(backFields);
            const removeNulls = arr => {
                const idx = arr.indexOf(null);
                if (idx !== -1) {
                    arr.splice(idx, 1);
                    removeNulls(arr);
                } else {
                    return arr;
                }
            };
            const userId = sessionStorage.getItem('primaryKey');
            removeNulls(backFields);
            const data = {
                userId: userId,
                cardName: cardName,
                backFields: backFields,
            };
            const config = {
                headers: {
                    'content-type': 'application/json',
                },
            };

            post(url, data, config)
                .then(res => {
                    if (res.data) {
                        console.log('카드유형생성성공');
                        setCardName('');
                        setBackFields([]);
                        setError(false);

                        const url = '/api/cards/callAllCardCategories?id=' + userId;
                        get(url).then(res => {
                            const data = res.data;
                            props.setAllCardCategories(data);
                        });
                    }
                })
                .catch(err => console.log(err));
        }
    };

    const getOneItem = (colName = '', colId) => {
        if (colName !== null) {
            return (
                <ListItem key={colId} id={`i-${colId}`}>
                    <ListItemAvatar>
                        <Avatar>
                            <FormatListNumbered />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItem>
                        <TextField value={colName} placeholder={`Col${colId}`} id={`t-${colId}`} onChange={writeCol} />
                    </ListItem>
                    <ListItemSecondaryAction id={`b-${colId}`}>
                        <IconButton
                            edge='end'
                            aria-label='delete'
                            onClick={() => {
                                deleteCol(Number(colId));
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        }
    };

    const createCol = () => {
        backFields.push('');
        setBackFields([...backFields]);
    };

    const writeName = e => {
        e.preventDefault();
        setCardName(e.target.value);
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={props.createCardCategoryDialogIsOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar} color='secondary'>
                    <Toolbar>
                        <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant='h6' className={classes.title}>
                            新たなカードの分類を作成します。
                        </Typography>
                        <Button autoFocus color='inherit' onClick={handleSave}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>

                <Container maxWidth='sm'>
                    <div className={classes.demo}>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Title />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItem>
                                    <TextField
                                        error={error}
                                        value={cardName}
                                        placeholder='Card Name'
                                        onChange={writeName}
                                    />
                                </ListItem>
                            </ListItem>
                            {backFields.map((colName, index) => {
                                return getOneItem(colName, index);
                            })}
                        </List>
                    </div>
                </Container>

                <Button size='large' color='secondary' onClick={createCol}>
                    <AddBox />
                    後ろのエリアを追加
                </Button>
            </Dialog>
        </div>
    );
}
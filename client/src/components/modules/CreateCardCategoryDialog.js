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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {AddBox} from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import DeleteIcon from '@material-ui/icons/Delete';
import {TextField} from '@material-ui/core';
import {Container} from '@material-ui/core';
import {Title} from '@material-ui/icons';

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
    const [cardTitle, setCardTitle] = useState('');

    const handleClose = () => {
        props.handleCreateCardCategoryDialog(false);
    };

    const handleSave = () => {};

    const deleteCol = colId => {
        backFields.splice(colId, 1);
        setBackFields([...backFields]);
    };

    const writeName = e => {
        let id = e.target.id;
        console.log(id);
        id = Number(id.split('t-')[1]);
        backFields[id] = e.target.value;
        setBackFields([...backFields]);
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
                        <TextField value={colName} placeholder={`Col${colId}`} id={`t-${colId}`} onChange={writeName} />
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

    const writeTitle = e => {
        setCardTitle(e.target.value);
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
                                    <TextField placeholder='Card Title' onChange={writeTitle} />
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

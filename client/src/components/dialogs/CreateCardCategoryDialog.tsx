import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    makeStyles,
    Slide,
    Container,
    TextField,
    Avatar,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
} from '@material-ui/core';
import {AddBox, Close, Delete, Title, FormatListNumbered} from '@material-ui/icons';
import {TransitionProps} from '@material-ui/core/transitions';
import axios from 'axios';
// * DBs
import {KindTable} from '../../_recoil/dbs';
// * recoils
import {useRecoilState} from 'recoil';
import {cCDOpenState, cardKindState} from '../../_recoil';

// * CSS Styles
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
        width: '50ch',
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

// * Props Interface
interface PropsCardCateg {
    handleCreateCardCategoryDialog(bools: boolean): void;
    setAllCardCategories(data: KindTable[]): void;
    createCardCategoryDialogIsOpen: boolean;
}

// * Container Componenrt
export default function ContainerComponent() {
    const [cardCategDialog, setCardCategDialog] = useRecoilState(cCDOpenState);
    const [kindState, setKindState] = useRecoilState(cardKindState);
    const handleCreateCardCategoryDialog = (bools: boolean) => {
        setCardCategDialog(bools);
    };
    const setAllCardCategories = (data: KindTable[]) => {
        setKindState(data);
    };
    return (
        <CreateCardCategoryDialog
            handleCreateCardCategoryDialog={handleCreateCardCategoryDialog}
            setAllCardCategories={setAllCardCategories}
            createCardCategoryDialogIsOpen={cardCategDialog}
        />
    );
}
// * Presentational components
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {children?: React.ReactElement},
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function CreateCardCategoryDialog(props: PropsCardCateg) {
    const classes = useStyles();
    const [backFields, setBackFields] = useState([] as Array<string | null>);
    const [cardName, setCardName] = useState('');
    const [error, setError] = useState(false);

    const handleClose = () => {
        props.handleCreateCardCategoryDialog(false);
    };

    const deleteCol = (colId: number) => {
        backFields.splice(colId, 1);
        setBackFields([...backFields]);
    };

    const writeCol = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const id = Number(e.target.id.split('t-')[1]);
        backFields[id] = e.target.value;
        setBackFields([...backFields]);
    };
    useEffect(() => {
        const strLength = cardName ? cardName.length : 0;
        if (strLength > 0) {
            let url = `/api/cards/checkDuplicateCardName`;
            const userId = localStorage.getItem('primaryKey');
            url += `/?userId=${userId}&`;
            url += `cardName=${cardName}`;

            axios
                .get(url)
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
            const removeNulls = (arr: Array<string | null>) => {
                const idx = arr.indexOf(null);
                if (idx !== -1) {
                    arr.splice(idx, 1);
                    removeNulls(arr);
                } else {
                    return arr;
                }
            };
            const userId = localStorage.getItem('primaryKey');
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

            axios
                .post(url, data, config)
                .then(res => {
                    if (res.data) {
                        console.log('카드유형생성성공');
                        setCardName('');
                        setBackFields([]);
                        setError(false);

                        const url = '/api/cards/call-all-card-categories?userId=' + userId;
                        axios.get(url).then(res => {
                            const data = res.data;
                            props.setAllCardCategories(data);
                        });
                    }
                })
                .catch(err => console.log(err));
        }
    };

    const getOneItem = (colName: string | null = '', colId: number) => {
        if (colName !== null) {
            return (
                <ListItem key={colId} id={`i-${colId}`}>
                    <ListItemAvatar>
                        <Avatar>
                            <FormatListNumbered />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItem>
                        <TextField
                            className={classes.textField}
                            value={colName}
                            placeholder={`Col${colId}`}
                            id={`t-${colId}`}
                            onChange={writeCol}
                        />
                    </ListItem>
                    <ListItemSecondaryAction id={`b-${colId}`}>
                        <IconButton
                            edge='end'
                            aria-label='delete'
                            onClick={() => {
                                deleteCol(Number(colId));
                            }}
                        >
                            <Delete />
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

    const writeName = (e: ChangeEvent<HTMLInputElement>) => {
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
                            <Close />
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
                                        className={classes.textField}
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

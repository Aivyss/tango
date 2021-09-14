import React, {useState, useEffect} from 'react';
import styles from '../../../assets/styles/pages/forum.module.css';
import className from 'classnames';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import Feed from '../../modules/Feed';
import {BoardCategTable} from '../../../_recoil/dbs';
import axios from 'axios';

// * CSS styles
const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            '& > *': {
                marginTop: theme.spacing(2),
            },
        },
        btns: {
            margin: '5px',
        },
    }),
);

// * Container Component
export default function Container() {
    return <ForumHome />;
}

// * Presentational Component
function ForumHome() {
    const classes = useStyles();
    const [targetCateg, setTargetCateg] = useState(-1);
    const [categs, setCategs] = useState([] as BoardCategTable[]);

    useEffect(() => {
        axios.get<BoardCategTable[]>('/forum/getCategs').then(res => {
            setCategs(res.data);
        });
    }, []);

    const handleClickCateg = (categId: number) => {
        setTargetCateg(categId);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <header>
                    <h1>Tango Language Forum</h1>
                </header>
                <section className={styles.content}>
                    <nav className={styles.categ__side}>
                        {categs.map(curr => (
                            <button className={styles.btns} onClick={handleClickCateg(curr.BOARD_PK)}>
                                {curr.CATEG_NAME}
                            </button>
                        ))}
                    </nav>

                    <main className={styles.center__content}>
                        <Button
                            className={classes.btns}
                            variant='contained'
                            color='primary'
                            disableElevation
                            size='large'
                        >
                            Disable elevation
                        </Button>
                        {targetCateg === -1 ? '' : <Feed categ={targetCateg} />}
                    </main>

                    <aside>aside</aside>
                </section>

                <footer>
                    <div>footers</div>
                </footer>
            </div>
        </div>
    );
}

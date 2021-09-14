import React from 'react';
import className from 'classnames';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import styles from '../../assets/styles/modules/feed.module.css';

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

// * Props Interface
interface PropsFeed {
    categ: number;
}

// * Container Component
export default function Container(props: PropsFeed) {
    return <Feed categ={props.categ} />;
}

// * Presentational Component
function Feed(props: PropsFeed) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={styles.dd}>
                <ol className={className(styles.kanban, styles['To-do'])}>
                    <div className={styles.kanban__title}>title1</div>
                    <p className={styles.kanban__content}>컨텐츠에용</p>
                    <p className={styles.kanban__author}>author1</p>
                </ol>
                <ol className={className(styles.kanban, styles['To-do'])}>
                    <div className={styles.kanban__title}>title1</div>
                    <p className={styles.kanban__content}>컨텐츠에용</p>
                    <p className={styles.kanban__author}>author1</p>
                </ol>
                <ol className={className(styles.kanban, styles['To-do'])}>
                    <div className={styles.kanban__title}>title1</div>
                    <p className={styles.kanban__content}>컨텐츠에용</p>
                    <p className={styles.kanban__author}>author1</p>
                </ol>
            </div>
            <div className={classes.root}>
                <Pagination count={10} variant='outlined' color='primary' size='large' />
            </div>
        </React.Fragment>
    );
}

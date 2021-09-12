import React from 'react';
import styles from '../../../assets/styles/forum.module.css';
import className from 'classnames';

export default function ForumHome() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <header>
                    <h1>Tango Language Forum</h1>
                </header>
                <section className={styles.content}>
                    <nav className={styles.categ__side}>
                        <button> col1</button>
                        <button> col2</button>
                        <button> col3</button>
                        <button> col4</button>
                        <button> col5</button>
                    </nav>

                    <main className={styles.center__content}>
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

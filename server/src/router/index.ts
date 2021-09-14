import express from 'express';
import userRoutes from './userRoutes';
import cardRoutes from './cardRoutes';
import deckRoutes from './deckRoutes';
import forumRoutes from './forumRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/decks', deckRoutes);
router.use('/cards', cardRoutes);
router.use('/forum', forumRoutes);

export default router;

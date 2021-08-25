const express = require('express');
const router = express.Router();
const usersRoutes = require('./usersRoutes');
const decksRoutes = require('./decksRoutes');
const cardsRoutes = require('./cardsRoutes');

router.use('/users', usersRoutes);
router.use('/decks', decksRoutes);
router.use('/cards', cardsRoutes);

module.exports = router;

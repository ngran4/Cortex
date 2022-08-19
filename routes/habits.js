const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits');
const isLoggedIn = require('../config/auth');

router.get('/', isLoggedIn, habitsController.index);
router.get('/new', isLoggedIn, habitsController.new);
router.get('/:id', isLoggedIn, habitsController.show);
router.post('/', isLoggedIn, habitsController.create);

router.delete('/:id', isLoggedIn, habitsController.delete);
router.get('/:id/edit', isLoggedIn, habitsController.edit);
router.put('/:id/update', isLoggedIn, habitsController.update);

module.exports = router;
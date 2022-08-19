const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logs');
const isLoggedIn = require('../config/auth');

router.post('/habits/:id/logs', isLoggedIn, logsController.create);

module.exports = router;
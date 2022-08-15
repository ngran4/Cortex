const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logs');

router.post('/habits/:id/logs', logsController.create);

module.exports = router;
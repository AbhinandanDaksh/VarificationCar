const express = require('express');
const router = express.Router();
const { health } = require('../controllers/vehicleController');

router.get('/health', health);

module.exports = router;

/**
 * Route to expose health endpoints.
 */
const express = require('express');
const router = express.Router();


router.get('/health', (req, res) => {
    res.send('service health is ok...');
});

module.exports = router;

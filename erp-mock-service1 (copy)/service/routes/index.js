const express = require('express');

const router = express.Router();

router.use(require('./health'));
router.use(require('./modify-pick-list'));
module.exports = router;

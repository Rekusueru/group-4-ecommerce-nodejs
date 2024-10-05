const express = require('express');
const router = express.Router();
const c = require('../controller/contactcontroller');
router.get('/',c.index);
router.post('/save',c.save);

module.exports =router; 
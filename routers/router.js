const express = require("express");
const router = express.Router();

const { SINGLE_REQUEST } = require('../controllers/tlm');
router.get('/single-req', SINGLE_REQUEST);

module.exports = router;
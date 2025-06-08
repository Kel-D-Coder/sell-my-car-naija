const express = require('express');

const router = express.Router();

const verifyRoute = require('./VerificationRoute');

const base = '/api/v1/verification'


router.use(`${base}`, verifyRoute);

module.exports = router;
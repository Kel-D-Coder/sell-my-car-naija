const express = require('express');
const router = express.Router();

const {VerifyPlate, VinVerify} = require("../controllers/VerifyController");

router.post('/verify-plate', VerifyPlate)
router.post('/verify-vin', VinVerify)

module.exports = router
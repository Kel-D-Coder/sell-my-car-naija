const express = require('express');
const router = express.Router();

const {VerifyPlate, VinVerify, StolenCheck, VehicleHistory} = require("../controllers/VerifyController");

router.post('/verify-plate', VerifyPlate)
router.post('/verify-vin', VinVerify)
// router.post('/stolen-check', StolenCheck)
router.post('/vehicle-history', VehicleHistory);

module.exports = router
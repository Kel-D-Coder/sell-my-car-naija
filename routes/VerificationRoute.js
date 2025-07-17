const express = require('express');
const router = express.Router();

const {VerifyPlate, VinVerify, VehicleHistory, MarketValue} = require("../controllers/VerifyController");

router.post('/verify-plate', VerifyPlate)
router.post('/verify-vin', VinVerify)
router.post('/vehicle-history', VehicleHistory);
router.post('/market-value', MarketValue);

module.exports = router
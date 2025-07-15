const axios= require('axios');
const {plateVerificationScrape, vinVerificationScrape} = require('../utils/scrape');
const http = require('http-status-codes')
const crypto = require('crypto');
const sha1 = require('sha1');

const VerifyPlate = async (req, res) => {

    if (!req.body.vehicle_number) {
        return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({msg: 'Vehicle Number is required'});
    }

    try {
        const response = await axios.post("https://api.prembly.com/identitypass/verification/vehicle",
            {vehicle_number: req.body.vehicle_number}, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.PREMBLY_API_KEY,
                "app_id": process.env.PREMBLY_APP_ID
            }
        })

        const data = await response.data;

        return res.status(http.StatusCodes.OK).json(data);
    } catch (error) {
        console.log(error.message);
        return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Error Occurred"})
    }

   
}

const VinVerify = async (req, res) => {
    const {vin} = req.body;
    console.log(vin)
    if (!vin) return res.status(http.StatusCodes.BAD_REQUEST).json({ error: 'VIN required' });
   try {
       const response = await axios.post("https://api.prembly.com/identitypass/verification/vehicle/vin",
       { vin }, {
           headers: {
               "Content-Type": "application/json",
               "x-api-key": process.env.PREMBLY_API_KEY,
               "app_id": process.env.PREMBLY_APP_ID
           }
       })

       const data = await response.data;

       console.log(data)

       return res.status(http.StatusCodes.OK).json(data);
   } catch (error) {
       console.log(error.message);
    return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error Occurred" })
   }
}

const VehicleHistory = async (req, res) => {
    const {vin} = req.body;

    if (!vin) return res.status(http.StatusCodes.BAD_REQUEST).json({ error: 'VIN required' });
    try {
        const response = await axios.get(`https://api.vehicledatabases.com/htmlreport/${vin}`, {
            headers: {
                "x-AuthKey": "864f609255f911f096100242ac120002"
            }
        })

        const data = await response.data;

        console.log(data)

        return res.status(http.StatusCodes.OK).json(data);
    } catch(error) {
        console.log(error);
        return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Record(s) were not found for this vehicle."});
    }
}

module.exports = { VerifyPlate, VinVerify, VehicleHistory };
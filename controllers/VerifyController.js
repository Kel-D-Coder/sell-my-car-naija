const {plateVerificationScrape, vinVerificationScrape} = require('../utils/scrape');

const VerifyPlate = async (req, res) => {
    const { plateNumber } = req.body;
    const url = 'https://nvis.frsc.gov.ng/VehicleManagement/VerifyPlateNo';
    if (!plateNumber) return res.status(400).json({ error: 'Plate number required' });

    try {
        const result = await plateVerificationScrape(url, plateNumber)

        if (result === null) {
            return res.status(404).json({ errorMsg: 'No data found for the provided plate number' });
        }

        return res.status(200).json(result);

        
    } catch (error) {
        res.status(500).json({ errorMsg: error.message });
        console.log(error);
    }

   
}

const VinVerify = async (req, res) => { 
    const {vin} = req.body;
    // console.log(vin)
    if (!vin) return res.status(400).json({ error: 'VIN required' });
   try {
     const result = await vinVerificationScrape('https://autovin.com.ng/', vin);
   } catch (error) {
    
   }
}

module.exports = {VerifyPlate, VinVerify};
// server.js
const express = require('express');
const puppeteer = require('puppeteer');
const routes = require('./routes/routes');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use('/', routes);


// app.post('/verify-plate', async (req, res) => {
//   const { plateNumber } = req.body;
//   if (!plateNumber) return res.status(400).json({ error: 'Plate number required' });

//   try {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     await page.goto('https://nvis.frsc.gov.ng/VehicleManagement/VerifyPlateNo', {
//       waitUntil: 'networkidle2',
//     });

//     await page.type('.form-control', plateNumber);
//     await Promise.all([
//       page.click('.find-car'), // button ID might change
//       page.waitForNavigation({ waitUntil: 'networkidle0' }),
//     ]);

//     const result = await page.evaluate(() => {
//       const details = document.querySelector('.panel-info');
//       return details ? details.innerText : 'No data found';
//     });

//     await browser.close();
//     return res.json({ result });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Verification failed' });
//   }
// });

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

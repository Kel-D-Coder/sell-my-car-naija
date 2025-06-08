const puppeteer = require('puppeteer');

const agentPage = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    return { page, browser };
}

const plateVerificationScrape = async (url, plateNumber) => {
   try {
       const { page, browser } = await agentPage();

       await page.goto(url, {waitUntil: 'domcontentloaded'});

       await page.type(".form-control", plateNumber)
       // await page.waitForTimeout(2000);

       await Promise.all([
           page.click(".find-car"),
           page.waitForNavigation({ waitUntil: 'networkidle0' })
       ])

       const result = page.evaluate(() => {
           const details = document.querySelector(".panel-info");
           return details ? details.innerHTML : null;
       })


       await browser.close();

       return result;
   } catch (error) {
       throw error;
   }


}

const vinVerificationScrape = async (url, vin) => {
    try {
        const { page, browser } = await agentPage();

        await page.goto(url, {waitUntil: 'networkidle2'});

        await page.waitForSelector('.form-control');

        await page.type('.form-control', vin);

        await Promise.all([
            page.waitForSelector("#checkout-form .custombtn"),
            page.click("#checkout-form .custombtn"),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ])

        await page.waitForSelector("input[name='customer[name]']")
        await page.$eval("input[name='customer[name]']", element => element.value = "kelvin")
        await page.waitForSelector("input[name='customer[email]']")
        await page.$eval("input[name='customer[email]']", element => element.value = "kelvin@gmail.com")

        await page.waitForSelector("input[type='checkbox']")
        await page.click("input[type='checkbox']")

        await page.waitForSelector(".buy-btn")
        await page.click('.buy-btn')

        await page.waitForNavigation({ waitUntil: 'domcontentloaded' })

        // page.frames().forEach(frame => console.log(frame.url()));

        // const frame = page.frames().find(frame => frame.url().includes('https://checkout.flutterwave.com/v3/hosted/pay'));

        const iframe = await page.$("iframe[name='checkout']")
        const iframeContent = await iframe.contentFrame()

        await iframeContent.type("#cardnumber", "4242 4242 4242 4242")

        console.log(iframeContent)



        await iframeContent.waitForSelector("#cardnumber", {timeout: 3000})
        await iframeContent.$eval(".base__label-title", element => console.log(element.textContent))
        await iframeContent.$eval("#cardnumber", element => element.value = "4242 4242 4242 4242")


        await page.waitForSelector("input[label='VALID TILL']")
        await page.$eval("input[label='VALID TILL']", element => element.value = "12/34")

        await page.waitForSelector("#cvv")
        await page.$eval("#cvv", element => element.value = "123")



        // await browser.close();
    } catch (error) {
        throw error;
    }


}

module.exports = {plateVerificationScrape, vinVerificationScrape};
const puppeteer = require('puppeteer');

const agentPage = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    return { page, browser };
}

const plateVerificationScrape = async (url, plateNumber) => {
    let browser, page;
    try {
        ({ page, browser } = await agentPage());

        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await page.type(".form-control", plateNumber);

        await Promise.all([
            page.click(".find-car"),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);

        const result = await page.evaluate(() => {
            const details = document.querySelector(".panel-info");
            return details ? details.innerHTML : null;
        });

        return result;
    } catch (error) {
        throw error;
    } finally {
        if (browser) {
            try { await browser.close(); } catch (e) { /* ignore */ }
        }
    }
}

const vinVerificationScrape = async (url, vin) => {
    let browser, page;
    try {
        ({ page, browser } = await agentPage());

        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('.form-control');
        await page.type('.form-control', vin);

        await Promise.all([
            page.waitForSelector("#checkout-form .custombtn"),
            page.click("#checkout-form .custombtn"),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);

        await page.waitForSelector("input[name='customer[name]']");
        await page.$eval("input[name='customer[name]']", element => element.value = "kelvin");
        await page.waitForSelector("input[name='customer[email]']");
        await page.$eval("input[name='customer[email]']", element => element.value = "kelvin@gmail.com");

        await page.waitForSelector("input[type='checkbox']");
        await page.click("input[type='checkbox']");

        await page.waitForSelector(".buy-btn");
        await page.click('.buy-btn');

        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        const iframe = await page.$("iframe[name='checkout']");
        const iframeContent = await iframe.contentFrame();

        await iframeContent.type("#cardnumber", "4242 4242 4242 4242");
        await iframeContent.waitForSelector("#cardnumber", { timeout: 3000 });
        await iframeContent.$eval(".base__label-title", element => console.log(element.textContent));
        await iframeContent.$eval("#cardnumber", element => element.value = "4242 4242 4242 4242");

        await page.waitForSelector("input[label='VALID TILL']");
        await page.$eval("input[label='VALID TILL']", element => element.value = "12/34");

        await page.waitForSelector("#cvv");
        await page.$eval("#cvv", element => element.value = "123");

        // return result if needed
    } catch (error) {
        throw error;
    } finally {
        if (browser) {
            try { await browser.close(); } catch (e) { /* ignore */ }
        }
    }
}

module.exports = { plateVerificationScrape, vinVerificationScrape };
import * as puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
	browser.close();
})().catch((e: Error) => {
    console.error(e);
    process.exit(1);
});

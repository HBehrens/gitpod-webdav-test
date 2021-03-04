import * as puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

    const page = await browser.newPage();
    const url = 'http://localhost:8000';
    const widths = [
        2560, 	// large 27" cinema displays
        // 1920, 	// large desktop
        // 1600, 	// desktop
        1280, 	// laptop
        // 1024, 	// tablet-landscape
        // 768, 	// tablet-portrait
        // 480, 	// smartphone-landscape
        320 	// smartphone-portrait
    ];

    await page.goto(url, { waitUntil: 'networkidle2' });

    for (const width of widths) {
		await page.setViewport({
			width: width,
			height: 500 // this is minimum height
		});        
        await page.screenshot({ path: `${__dirname}/images/screenshot-${width}.png`, fullPage: true });
    }

    await browser.close();
})().catch((e: Error) => {
    console.error(e);
    process.exit(1);
});

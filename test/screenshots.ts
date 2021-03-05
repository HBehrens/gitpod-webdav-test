import * as puppeteer from 'puppeteer';
import * as mergeImages from 'merge-img';
import * as chokidar from 'chokidar';
import * as pressAnyKey from 'press-any-key';

// console.log(mergeImg);
// process.exit(0);

async function takeScreenshots(browser: puppeteer.Browser, url: string) {
    const page = await browser.newPage();
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

    // const filenames = [] as mergeImages.ImageDescriptor[];
    const mergeImgElements = [];

    for (const width of widths) {
        await page.setViewport({
            width: width,
            height: 500,
        });
        const filename = `${__dirname}/images/screenshot-${width}.png`;
        mergeImgElements.push({ src: filename, offsetX: 1 });
        await page.screenshot({ path: filename, fullPage: true });
    }

    const img = await mergeImages(mergeImgElements);
    img.write(`${__dirname}/images/all.png`);
    console.log("\nscreenshots updated")
}

const keypress = async () => {
    process.stdin.setRawMode(true);
    return new Promise(resolve => process.stdin.once('data', () => {
        process.stdin.setRawMode(false);
        resolve(true);
    }))
}

function handleAsync<T>(p: Promise<T>) {
    p.catch((e: Error) => {
        console.error(e);
        process.exit(1);
    });
}

handleAsync((async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const url = "http://localhost:8000";
    await takeScreenshots(browser, url);

    const watcher = chokidar.watch(`${__dirname}/../src`, {
        ignoreInitial: true,
        //   ignored: /(^|[\/\\])\../, // ignore dotfiles
    });

    watcher.on('all', () => handleAsync(takeScreenshots(browser, url)));

    await pressAnyKey();

    await watcher.close();
    await browser.close();
})());
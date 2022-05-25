const puppeteer = require("puppeteer");
let browser;
let page;

async function init(url) {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 768 });
    await page.goto(url);
}

async function getTasks(num) {
    await page.waitForSelector('div.tasks-card-container.row');

    const arrayTask = await page.evaluate((num) => {
        const elements = document.querySelectorAll('#section-to-print > div.tasks-card-container.row div.card-body');
        let arrayTask = [];
        for (let element of elements) {
            arrayTask.push({ name: element.querySelector('div.flexbox.task-title div').innerHTML, description: element.querySelector('p.card-text').innerHTML });
            if (arrayTask.length >= num) {
                break
            }
        }
        return arrayTask;
    }, num);

    return arrayTask;
}

async function close() {
    await browser.close();
}

module.exports = { init, getTasks, close }
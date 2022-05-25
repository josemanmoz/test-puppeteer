const puppeteer = require("puppeteer");
let browser;
let page;

async function init(url) {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 768 });
    await page.goto(url);
}

async function setLogin(user, password) {
    await page.click('#__next > div > main > div > header > nav > div > ul._3XsmI > li:nth-child(1) > a');
    //esperamos hasta que aparezca boton iniciar sesión
    await page.waitForSelector('#todoist_app > div > div > div._04c9c3ac.f9408a0e._6e9db9aa._47978ba4._6cad1a19.c5b05c6a.be6deb6a > div:nth-child(1) > div > div > form > button');
    //agregamos usuario y password
    await page.type('#labeled-input-1', user);
    await page.type('#labeled-input-3', password);
    await page.click('#todoist_app > div > div > div._04c9c3ac.f9408a0e._6e9db9aa._47978ba4._6cad1a19.c5b05c6a.be6deb6a > div:nth-child(1) > div > div > form > button');
    //esperamos hasta que exista el boton agregar tarea
    try {
        await page.waitForSelector('#agenda_view > div > section > div > ul > li.controller.actions.task_actions.full_width_actions.task_actions__shortcuts_enabled > button');
    } catch (e) {
        console.log("No se cargó boton1");
    }
}

async function addTask(arrayTasks) {
    await page.waitFor(2000);
    await page.click('#agenda_view > div > section > div > ul > li.controller.actions.task_actions.full_width_actions.task_actions__shortcuts_enabled > button');
    await page.waitForSelector('#agenda_view > div > section > div > ul > li > form > div.task_editor__editing_area > div.task_editor__input_fields > div.task_editor__content_field.no-focus-marker > div > div > div.DraftEditor-editorContainer > div > div > div > div > span');

    for (let task of arrayTasks) {
        await page.type('#agenda_view > div > section > div > ul > li > form > div.task_editor__editing_area > div.task_editor__input_fields > div.task_editor__content_field.no-focus-marker > div > div > div.DraftEditor-editorContainer > div > div > div > div > span', task.name);
        await page.type('#agenda_view > div > section > div > ul > li > form > div.task_editor__editing_area > div.task_editor__input_fields > div.f9408a0e._6e9db9aa._6cad1a19 > textarea', task.description);
        await page.click('#agenda_view > div > section > div > ul > li > form > div.task_editor__form_actions > div > button._7a2031d6.a878a9a4._949f7858.f9408a0e._56a651f6 > span');
        await page.waitFor(1000);
    }
}

async function close() {
    await browser.close();
}

module.exports = { init, setLogin, addTask, close }
const puppeteer = require("puppeteer");
let page;
console.log("before");
const browserOpenPromise = puppeteer.launch({
    headless: false,
    slowMo: true,
    defaultViewport: null,
    args: ["--start-maximized"]

});
browserOpenPromise.then(function(browser) {
        //console.log("browser opened");
        // currentely open tab it will give
        const pageArrPromise = browser.pages();
        return pageArrPromise;

    }).then(function(broserPages) {
        page = broserPages[0];
        let gotoPromise = page.goto("https://www.google.com/");
        return gotoPromise;
    }).then(function() {
        // waiting for the element to appear on the page
        let elementwaitpromise = page.waitForSelector("input[type='text']", { visible: true });
        return elementwaitpromise;
    })
    .then(function() {
        // console.log("reached google home page");
        // type any element on that page -> selector
        let keysWillBeSendPromises = page.type("input[type='text']", "pepcoding");
        return keysWillBeSendPromises;

    }).then(function() {
        // page.keyboard is used to press the selector
        let enterWillBePressed = page.keyboard.press("Enter");
        return enterWillBePressed;
    }).then(function() {
        let waitingforElementpromises = page.waitForSelector("h3.LC20lb.MBeuO.DKV0Md", { visible: true });
        return waitingforElementpromises;
    }).then(function() {
        let keysWillBeSendPromises = page.click("h3.LC20lb.MBeuO.DKV0Md");
        return keysWillBeSendPromises;
    })
    .catch(function(err) {
        console.log(err);
    })
console.log("After");
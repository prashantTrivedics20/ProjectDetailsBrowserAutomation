//alert("i am connected ");
const puppeteer = require("puppeteer")
const loginlink = "https://www.hackerrank.com/auth/login";
const codeobj = require("./code");
const email = 'hellotrivedi8@gmail.com';
const password = "Prashant_cs1";
let browserOpen = puppeteer.launch({
    headless: false, // cromiam browser
    args: ["--start-maximized"],
    defaultViewport: null
})

let page;
browserOpen.then(function(browserObj) {
    let browserOpenpromise = browserObj.newPage();
    return browserOpenpromise;
}).then(function(newTab) {
    page = newTab;
    let hackerrankOpenpromise = newTab.goto(loginlink);
    return hackerrankOpenpromise;
}).then(function() {
    let emailIsIntered = page.type("input[id='input-1']", email, { delay: 50 });
    return emailIsIntered;
}).then(function() {
    let passwordIsEntered = page.type("input[type='password']", password, { delay: 50 });
    return passwordIsEntered;
}).then(function() {
    let loginButtonClicked = page.click("button[data-analytics='LoginPassword']", { delay: 50 });
    return loginButtonClicked;
}).then(function() {
    let clickOnAlgopromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page);
    return clickOnAlgopromise;
}).then(function() {
    let getToWarmUp = waitAndClick('input[value="warmup"]', page);
    return getToWarmUp;
}).then(function() {
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 50 });
    return allChallengesPromise;
}).then(function(questionArr) {
    console.log("number of question", questionArr.length);
    let questionWillBeSolved = questionSolver(page, questionArr[0], codeobj.answers[0]);
    return questionWillBeSolved;

})

function waitAndClick(selector, cpage) {
    return new Promise(function(resolve, reject) {
        let waitForModelPromise = cpage.waitForSelector(selector)
        waitForModelPromise.then(function() {
            let clickModel = cpage.click(selector);
            return clickModel;
        }).then(function() {
            resolve();
        }).catch(function() {
            reject();
        })
    });
}

function questionSolver(page, question, answer) {
    return new Promise(function(resove, reject) {
        let questionWillbeClicked = question.click();
        return questionWillbeClicked.then(function() {
            let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return EditorInFocusPromise;
        }).then(function() {
            return waitAndClick('.checkbox-input', page)
        }).then(function() {
            return page.waitForSelector('textarea.custominput', page);
        }).then(function() {
            return page.type('textarea.custominput', answer, { delay: 15 })

        }).then(function() {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function() {
            let AisPressed = page.keyboard.press('A', { delay: 100 });
            return AisPressed;
        }).then(function() {
            let XisPressed = page.keyboard.press('X', { delay: 100 })
            return XisPressed;
        }).then(function() {
            let CtrlistPressed = page.keyboard.up('Control');
            return CtrlistPressed;
        }).then(function() {
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return mainEditorInFocus;
        }).then(function() {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function() {
            let AisPressed = page.keyboard.press('A', { delay: 100 });
            return AisPressed;
        }).then(function() {
            let VisPressed = page.keyboard.press('V', { delay: 100 });
            return VisPressed;
        }).then(function() {
            let CtrlisUNPressed = page.keyboard.up('Control');
            return CtrlisUNPressed;
        }).then(function() {
            return page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', { delay: 50 });

        }).then(function() {
            resove();
        }).catch(function() {
            reject();
        })
    })

}
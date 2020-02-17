 let AllureReporter = require("jasmine-allure-reporter");
 var exec = require("child_process").exec;
let EC = protractor.ExpectedConditions;
var sgpt = require('sg-protractor-tools');

let MainWrapperP = function () {
};

MainWrapperP.prototype = Object.create({}, {
    locateElement: {
        value: function (locator, locatorvalue) {


            switch (locator) {

                case "xpath":
                    browser.wait(EC.visibilityOf(element(by.xpath(locatorvalue))), 2000);
                    element(by.xpath(locatorvalue)).getText().then(console.log);
                    return element(by.xpath(locatorvalue));

                case "id":
                    browser.wait(EC.visibilityOf(element(by.id(locatorvalue))), 2000);
                    element(by.id(locatorvalue)).getText().then(console.log);
                    return element(by.id(locatorvalue));

                case "name":
                    browser.wait(EC.visibilityOf(element(by.name(locatorvalue))), 2000);
                    element(by.name(locatorvalue)).getText().then(console.log);
                    return element(by.name(locatorvalue));

                case "css":
                    browser.wait(EC.visibilityOf(element(by.css(locatorvalue))), 2000);
                    element(by.css(locatorvalue)).getText().then(console.log);
                    return element(by.css(locatorvalue));

                case "className":
                    browser.wait(EC.visibilityOf(element(by.className(locatorvalue))), 2000);
                    element(by.className(locatorvalue)).getText().then(console.log);
                    return element(by.className(locatorvalue));

                case "name":
                    browser.wait(EC.visibilityOf(element(by.name(locatorvalue))), 2000);
                    element(by.name(locatorvalue)).getText().then(console.log);
                    return element(by.name(locatorvalue));

                case "linkText":
                    browser.wait(EC.visibilityOf(element(by.linkText(locatorvalue))), 2000);
                    element(by.linkText(locatorvalue)).getText().then(console.log);
                    return element(by.linkText(locatorvalue));

                case "buttonText":
                    browser.wait(EC.visibilityOf(element(by.buttonText(locatorvalue))), 2000);
                    element(by.buttonText(locatorvalue)).getText().then(console.log);
                    return element(by.buttonText(locatorvalue));

                case "repeater":
                    browser.wait(EC.visibilityOf(element(by.repeater(locatorvalue))), 2000);
                    element(by.repeater(locatorvalue)).getText().then(console.log);
                    return element(by.repeater(locatorvalue));
            }
        }
    },

    getScreenshot: {
        get: function () {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')()
            });
        }
    },

    click: {
        value: function (ele) {
            browser.wait(EC.visibilityOf(ele), 2000);
            browser.wait(EC.elementToBeClickable(ele), 2000);
            ele.click();
            this.getScreenshot;
        }
    },

    input: {
        value: function (ele, val) {
            browser.wait(EC.visibilityOf(ele), 2000);
            ele.sendKeys(val);
            this.getScreenshot;
        }
    },

    selectByIndex: {
        value: function (ele, tagname, index) {
            browser.wait(EC.visibilityOf(ele), 2000);
            browser.wait(EC.elementToBeClickable(ele), 2000);
            let desiredOption = ele.all(by.tagName(tagname)).get(index);
            desiredOption.click();
            this.getScreenshot;
        }
    },

    getTextValue: {
        value: function (ele) {
            browser.wait(EC.visibilityOf(ele), 4000);
            return ele.getText();
            this.getScreenshot;
        }
    },

    selectByValue: {
        value: function (ele, value) {
            browser.wait(EC.visibilityOf(ele), 2000);
            browser.wait(EC.elementToBeClickable(ele), 2000);
            ele.element(by.cssContainingText('option', value)).click();
            this.getScreenshot;
        }
    },

    selectByLabel: {
        value: function (ele, value) {
            browser.wait(EC.visibilityOf(ele), 2000);
            browser.wait(EC.elementToBeClickable(ele), 2000);
            let desiredOption = ele.all(by.css('option[label="' + value + '"]'));
            desiredOption.click();
            this.getScreenshot;
        }
    },

    isDisabled: {
        value: function (ele) {
            browser.wait(EC.visibilityOf(ele), 2000);
            return expect(ele.isEnabled()).toBe(false);
        }
    },

    isEnabled: {
        value: function (ele) {
            browser.wait(EC.visibilityOf(ele), 2000);
            return expect(ele.isEnabled()).toBe(true);
        }
    },

    moveandClickMouse: {
        value: function (ele, posX, posY) {
            sgpt.scroll.scrollTo(ele).then(function () {
                browser.actions().mouseMove(ele, { x: posX, y: posY }).mouseDown().mouseUp().perform();
                // this.getScreenshot;
            });
        }
    },

    scrollToElementMouseClick: {
        value: function (ele) {
            this.moveandClickMouse(ele, 5, 5);
            this.getScreenshot;
        }
    },

    scrollToElement: {
        value: function (ele) {
            browser.controlFlow().execute(function () {
                browser.sleep(1000)
                browser.executeScript('arguments[0].scrollIntoView(true)', ele);
            });
        }
    },

    isElementPresent: {
        value: function (ele) {
            browser.wait(EC.visibilityOf(ele), 2000);
            this.scrollToElement(ele);
            return expect(ele.isPresent()).toBe(true);
        }
    },

    isDisplayed: {
        value: function (ele) {
            browser.wait(EC.visibilityOf(ele), 2000);
            // this.scrollToElement(ele);
            return expect(ele.isDisplayed()).toEqual(true);
        }
    },

    NotDisplayed: {
        value: function (ele) {
            // browser.wait(EC.visibilityOf(ele), 2000);
            // this.scrollToElement(ele);
            return expect(!ele.isDisplayed()).toEqual(false);
            // browser.wait(EC.invisibilityOf(ele), 2000)
        }
    },

    verifyTitle: {
        value: function (ExpectedTitle) {
            browser.getTitle().then(function (ActualTitle) {
                console.log(ActualTitle);
                // this.reportCheckPoint("Title of the page: ", ActualTitle, ExpectedTitle);
                expect(ActualTitle).toEqual(ExpectedTitle);
            });
        }
    }
});

module.exports = MainWrapperP;
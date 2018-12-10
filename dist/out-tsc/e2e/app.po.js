import { browser, by, element } from 'protractor';
var AppPage = /** @class */ (function () {
    function AppPage() {
    }
    AppPage.prototype.navigateTo = function () {
        browser.waitForAngularEnabled(false);
        browser.get('/');
        return browser.driver.sleep(1000);
    };
    AppPage.prototype.getHeader = function () {
        return element(by.css('mat-toolbar')).getText();
    };
    AppPage.prototype.getButton = function () {
        return element(by.id('send'));
    };
    AppPage.prototype.getBalance = function () {
        return element(by.id('balance')).getText();
    };
    AppPage.prototype.clickSelect = function () {
        return element(by.id('address-selector')).click();
    };
    AppPage.prototype.setAddress = function (index) {
        return element.all(by.tagName('mat-option')).filter((function (el, i) {
            return index === i;
        })).click();
    };
    AppPage.prototype.setToAddress = function (address) {
        return element(by.id('receiver')).sendKeys(address);
    };
    AppPage.prototype.setAmount = function (amount) {
        return element(by.id('amount')).sendKeys(amount);
    };
    AppPage.prototype.clickSend = function () {
        return this.getButton().click();
    };
    return AppPage;
}());
export { AppPage };
//# sourceMappingURL=app.po.js.map
import { AppPage } from './app.po';
describe('angular-truffle-box App', function () {
    var page;
    beforeEach(function () {
        page = new AppPage();
    });
    it('should display welcome message', function () {
        page.navigateTo();
        expect(page.getHeader()).toContain('Angular Truffle Box');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map
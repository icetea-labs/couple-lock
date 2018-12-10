import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalService } from './';
var CreateStatusComponent = /** @class */ (function () {
    function CreateStatusComponent(modalService) {
        this.modalService = modalService;
    }
    CreateStatusComponent.prototype.ngOnInit = function () {
        this.bodyText = 'This text can be updated in modal 1';
    };
    CreateStatusComponent.prototype.openModel = function (id) {
        this.modalService.open(id);
    };
    var _a;
    CreateStatusComponent = tslib_1.__decorate([
        Component({
            selector: 'app-create-status',
            templateUrl: './create-status.component.html',
            styleUrls: ['./create-status.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof ModalService !== "undefined" && ModalService) === "function" ? _a : Object])
    ], CreateStatusComponent);
    return CreateStatusComponent;
}());
export { CreateStatusComponent };
//# sourceMappingURL=create-status.component.js.map
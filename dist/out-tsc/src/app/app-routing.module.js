import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { PromiseComponent } from './promise/promise.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { MetaSenderComponent } from './meta/meta-sender/meta-sender.component';
var routes = [
    { path: 'home', component: HomeComponent },
    { path: 'view', component: ViewComponent },
    { path: 'promise', component: PromiseComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            declarations: [],
            imports: [
                [RouterModule.forRoot(routes)],
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { PromiseComponent } from './promise/promise.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { MetaSenderComponent } from './meta/meta-sender/meta-sender.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'view', component: ViewComponent},
    {path: 'promise', component: PromiseComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    // {path: 'test', component: MetaSenderComponent}
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],
  ],

  exports: [ RouterModule ]
})
export class AppRoutingModule { }

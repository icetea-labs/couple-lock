import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {MetaModule} from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatSnackBarModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { PromiseComponent } from './promise/promise.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { CreateStatusComponent } from './home/create-status/create-status.component';
import { ModalService } from './service/modal.service';
import { EthcontractService } from './service/ethcontract.service';
import { TestSenderComponent } from './meta/test-sender/test-sender.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewComponent,
    PromiseComponent,
    LoginComponent,
    CreateStatusComponent,
    TestSenderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MetaModule,
    AppRoutingModule,
  ],
  providers: [
    ModalService,
    EthcontractService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

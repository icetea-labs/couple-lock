import { Injectable } from '@angular/core';
import { $ } from 'protractor';
import { setTimeout } from 'timers';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: any[] = [];
  private id = 'check-value';

  constructor() { }

  add(modal: any) {
    this.modals.push(modal);
  }

  openThis(id: string) {
    let modal: any = this.modals.filter( x => x.id === id)[0];
    console.log(modal);
    modal.open();
  }
}

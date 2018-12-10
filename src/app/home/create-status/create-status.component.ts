import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-create-status',
  templateUrl: './create-status.component.html',
  styleUrls: ['./create-status.component.css']
})
export class CreateStatusComponent implements OnInit, OnDestroy {

  private bodyText: string;
  private modalContent = false;

  constructor(
    private modalService: ModalService,
    ) {}

  ngOnInit() {
    this.bodyText = 'Success';
  }

  ngOnDestroy() {
    this.ngOnDestroy()
  }

  openModal(id: string) {
    this.modalService.openThis(id);
  }

  close() {
    this.modalContent = true;
  }

  open() {
    this.modalContent = false;
  }
}

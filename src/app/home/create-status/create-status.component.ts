import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { $ } from 'protractor';
import { MatSnackBar } from '@angular/material';

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
    private matSnackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.bodyText = 'Success';
  }

  setStatus(status) {
    this.matSnackBar.open(status, null,{duration: 1000});
  }
  ngOnDestroy() {
    this.ngOnDestroy()
  }

  open() {
    this.setStatus('Success');
  }
}

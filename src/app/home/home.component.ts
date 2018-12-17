import { Component, OnInit } from '@angular/core';
import { Viewing } from '../../index/view-board';
import { HomeService } from '../service/home.service';
import { PView } from '../../index/mocks-view-board';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Views: Viewing[];
  Views1 = PView;

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit() {
  }

  getPView(): void {
  }

}

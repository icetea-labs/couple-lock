import { Component, OnInit } from '@angular/core';
import { EthcontractService } from '../../service/ethcontract.service';

@Component({
  selector: 'app-test-sender',
  templateUrl: './test-sender.component.html',
  styleUrls: ['./test-sender.component.scss']
})
export class TestSenderComponent implements OnInit {

  title = 'your first DApp in Angular';
  accounts: any;
  transferFrom = '0x0';
  balance = '0 ETH';
  transferTo = '';
  amount = 0;
  remarks = '';

  constructor(
    private ethcontractService: EthcontractService,
  ) { }

  ngOnInit() {
    this.initAndDisplayContract();
  }

  // Init and display contract
  initAndDisplayContract = () => {
    // Get acount Information: Transfer
    this.ethcontractService.getAccoutInfo().then(function (acctInfo: any) {
      this.transferFrom = acctInfo.fromAccount;
      this.balance = acctInfo.balance;
      console.log(acctInfo.fromAccount);
      console.log(acctInfo.balance);
    }).catch(function (err) {
      console.log(err);
    });
  }

  // Transfer money
  transferEther(event) {
    this.ethcontractService.transferEther(
      this.transferFrom,
      this.transferTo,
      this.amount,
      this.remarks,
    ).then(function () {
      this.initAndDisplayContract();
    }).catch(function (err) {
      console.log(err);
     this.initAndDisplayContract();
    });
  }

}

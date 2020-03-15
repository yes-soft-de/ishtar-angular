import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PendingTransactionService} from '../../service/pending-transaction.service';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.scss']
})
export class CancelOrderComponent implements OnInit {
  token: string;
  constructor(private activatedRoute: ActivatedRoute,
              private pendingTransactionService: PendingTransactionService) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(
      urlSegments => {
        this.pendingTransactionService.cancelPendingTransaction(`${urlSegments.get('token')}`).subscribe(
          success => {
            console.log(`Success Canceling the Order, Payment didn't get Processed!`);
          }
        );
      }
    );
  }

}

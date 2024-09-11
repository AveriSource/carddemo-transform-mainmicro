import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcctdat } from '../acctdat.model';

@Component({
  selector: 'jhi-acctdat-detail',
  templateUrl: './acctdat-detail.component.html',
})
export class AcctdatDetailComponent implements OnInit {
  acctdat: IAcctdat | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ acctdat }) => {
      this.acctdat = acctdat;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

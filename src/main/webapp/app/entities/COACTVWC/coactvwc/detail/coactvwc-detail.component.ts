import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICoactvwc } from '../coactvwc.model';

@Component({
  selector: 'jhi-coactvwc-detail',
  templateUrl: './coactvwc-detail.component.html',
})
export class CoactvwcDetailComponent implements OnInit {
  coactvwc: ICoactvwc | null = null;
  accountNumber: number | null = null;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coactvwc }) => {
      this.coactvwc = coactvwc;
      this.accountNumber = coactvwc.acctdat.acctId;
    });
  }

  previousState(): void {
    window.history.back();
  }

  viewAccount(): void {
    this.router.navigate(['/coactvwc', this.accountNumber, 'view']);
  }
}

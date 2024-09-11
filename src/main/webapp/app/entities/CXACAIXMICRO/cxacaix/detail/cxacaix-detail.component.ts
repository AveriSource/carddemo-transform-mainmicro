import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICxacaix } from '../cxacaix.model';

@Component({
  selector: 'jhi-cxacaix-detail',
  templateUrl: './cxacaix-detail.component.html',
})
export class CxacaixDetailComponent implements OnInit {
  cxacaix: ICxacaix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cxacaix }) => {
      this.cxacaix = cxacaix;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICoactvwc } from '../coactvwc.model';

@Component({
  selector: 'jhi-coactvwc-detail',
  templateUrl: './coactvwc-detail.component.html',
})
export class CoactvwcDetailComponent implements OnInit {
  coactvwc: ICoactvwc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coactvwc }) => {
      this.coactvwc = coactvwc;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

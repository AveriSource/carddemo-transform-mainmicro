import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustdat } from '../custdat.model';

@Component({
  selector: 'jhi-custdat-detail',
  templateUrl: './custdat-detail.component.html',
})
export class CustdatDetailComponent implements OnInit {
  custdat: ICustdat | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ custdat }) => {
      this.custdat = custdat;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

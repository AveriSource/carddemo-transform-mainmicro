import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICxacaix } from '../cxacaix.model';

import { ASC, DESC, ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { CxacaixService } from '../service/cxacaix.service';
import { CxacaixDeleteDialogComponent } from '../delete/cxacaix-delete-dialog.component';
import { ParseLinks } from 'app/core/util/parse-links.service';

@Component({
  selector: 'jhi-cxacaix',
  templateUrl: './cxacaix.component.html',
})
export class CxacaixComponent implements OnInit {
  cxacaixes: ICxacaix[];
  isLoading = false;
  itemsPerPage: number;
  links: { [key: string]: number };
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(protected cxacaixService: CxacaixService, protected modalService: NgbModal, protected parseLinks: ParseLinks) {
    this.cxacaixes = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.isLoading = true;

    this.cxacaixService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<ICxacaix[]>) => {
          this.isLoading = false;
          this.paginateCxacaixes(res.body, res.headers);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  reset(): void {
    this.page = 0;
    this.cxacaixes = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICxacaix): number {
    return item.id!;
  }

  delete(cxacaix: ICxacaix): void {
    const modalRef = this.modalService.open(CxacaixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cxacaix = cxacaix;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.reset();
      }
    });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCxacaixes(data: ICxacaix[] | null, headers: HttpHeaders): void {
    this.links = this.parseLinks.parse(headers.get('link') ?? '');
    if (data) {
      for (const d of data) {
        this.cxacaixes.push(d);
      }
    }
  }
}

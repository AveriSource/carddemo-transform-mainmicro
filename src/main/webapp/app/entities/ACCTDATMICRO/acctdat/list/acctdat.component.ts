import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAcctdat } from '../acctdat.model';

import { ASC, DESC, ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { AcctdatService } from '../service/acctdat.service';
import { AcctdatDeleteDialogComponent } from '../delete/acctdat-delete-dialog.component';
import { ParseLinks } from 'app/core/util/parse-links.service';

@Component({
  selector: 'jhi-acctdat',
  templateUrl: './acctdat.component.html',
})
export class AcctdatComponent implements OnInit {
  acctdats: IAcctdat[];
  isLoading = false;
  itemsPerPage: number;
  links: { [key: string]: number };
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(protected acctdatService: AcctdatService, protected modalService: NgbModal, protected parseLinks: ParseLinks) {
    this.acctdats = [];
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

    this.acctdatService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IAcctdat[]>) => {
          this.isLoading = false;
          this.paginateAcctdats(res.body, res.headers);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  reset(): void {
    this.page = 0;
    this.acctdats = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAcctdat): number {
    return item.id!;
  }

  delete(acctdat: IAcctdat): void {
    const modalRef = this.modalService.open(AcctdatDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.acctdat = acctdat;
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

  protected paginateAcctdats(data: IAcctdat[] | null, headers: HttpHeaders): void {
    this.links = this.parseLinks.parse(headers.get('link') ?? '');
    if (data) {
      for (const d of data) {
        this.acctdats.push(d);
      }
    }
  }
}

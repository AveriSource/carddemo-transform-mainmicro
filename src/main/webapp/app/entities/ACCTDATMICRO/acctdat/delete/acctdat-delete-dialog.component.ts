import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAcctdat } from '../acctdat.model';
import { AcctdatService } from '../service/acctdat.service';

@Component({
  templateUrl: './acctdat-delete-dialog.component.html',
})
export class AcctdatDeleteDialogComponent {
  acctdat?: IAcctdat;

  constructor(protected acctdatService: AcctdatService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.acctdatService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}

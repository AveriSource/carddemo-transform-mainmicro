import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustdat } from '../custdat.model';
import { CustdatService } from '../service/custdat.service';

@Component({
  templateUrl: './custdat-delete-dialog.component.html',
})
export class CustdatDeleteDialogComponent {
  custdat?: ICustdat;

  constructor(protected custdatService: CustdatService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.custdatService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}

import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICxacaix } from '../cxacaix.model';
import { CxacaixService } from '../service/cxacaix.service';

@Component({
  templateUrl: './cxacaix-delete-dialog.component.html',
})
export class CxacaixDeleteDialogComponent {
  cxacaix?: ICxacaix;

  constructor(protected cxacaixService: CxacaixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cxacaixService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}

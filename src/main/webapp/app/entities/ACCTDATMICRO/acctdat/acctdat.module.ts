import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AcctdatComponent } from './list/acctdat.component';
import { AcctdatDetailComponent } from './detail/acctdat-detail.component';
import { AcctdatUpdateComponent } from './update/acctdat-update.component';
import { AcctdatDeleteDialogComponent } from './delete/acctdat-delete-dialog.component';
import { AcctdatRoutingModule } from './route/acctdat-routing.module';

@NgModule({
  imports: [SharedModule, AcctdatRoutingModule],
  declarations: [AcctdatComponent, AcctdatDetailComponent, AcctdatUpdateComponent, AcctdatDeleteDialogComponent],
  entryComponents: [AcctdatDeleteDialogComponent],
})
export class AcctdatmicroAcctdatModule {}

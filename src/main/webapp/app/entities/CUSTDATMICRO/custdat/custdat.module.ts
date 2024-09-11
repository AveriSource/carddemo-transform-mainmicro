import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CustdatComponent } from './list/custdat.component';
import { CustdatDetailComponent } from './detail/custdat-detail.component';
import { CustdatUpdateComponent } from './update/custdat-update.component';
import { CustdatDeleteDialogComponent } from './delete/custdat-delete-dialog.component';
import { CustdatRoutingModule } from './route/custdat-routing.module';

@NgModule({
  imports: [SharedModule, CustdatRoutingModule],
  declarations: [CustdatComponent, CustdatDetailComponent, CustdatUpdateComponent, CustdatDeleteDialogComponent],
  entryComponents: [CustdatDeleteDialogComponent],
})
export class CustdatmicroCustdatModule {}

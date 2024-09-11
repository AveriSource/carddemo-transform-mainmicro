import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CxacaixComponent } from './list/cxacaix.component';
import { CxacaixDetailComponent } from './detail/cxacaix-detail.component';
import { CxacaixUpdateComponent } from './update/cxacaix-update.component';
import { CxacaixDeleteDialogComponent } from './delete/cxacaix-delete-dialog.component';
import { CxacaixRoutingModule } from './route/cxacaix-routing.module';

@NgModule({
  imports: [SharedModule, CxacaixRoutingModule],
  declarations: [CxacaixComponent, CxacaixDetailComponent, CxacaixUpdateComponent, CxacaixDeleteDialogComponent],
  entryComponents: [CxacaixDeleteDialogComponent],
})
export class CxacaixmicroCxacaixModule {}

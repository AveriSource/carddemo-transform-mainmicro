import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CoactvwcComponent } from './list/coactvwc.component';
import { CoactvwcDetailComponent } from './detail/coactvwc-detail.component';
import { CoactvwcRoutingModule } from './route/coactvwc-routing.module';

@NgModule({
  imports: [SharedModule, CoactvwcRoutingModule],
  declarations: [CoactvwcComponent, CoactvwcDetailComponent],
  entryComponents: [],
})
export class CoactvwcModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CoactvwcComponent } from '../list/coactvwc.component';
import { CoactvwcDetailComponent } from '../detail/coactvwc-detail.component';
import { CoactvwcUpdateComponent } from '../update/coactvwc-update.component';
import { CoactvwcRoutingResolveService } from './coactvwc-routing-resolve.service';

const coactvwcRoute: Routes = [
  {
    path: '',
    component: CoactvwcComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CoactvwcDetailComponent,
    resolve: {
      coactvwc: CoactvwcRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CoactvwcUpdateComponent,
    resolve: {
      coactvwc: CoactvwcRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(coactvwcRoute)],
  exports: [RouterModule],
})
export class CoactvwcRoutingModule {}

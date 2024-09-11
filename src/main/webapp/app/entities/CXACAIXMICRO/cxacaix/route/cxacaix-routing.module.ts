import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CxacaixComponent } from '../list/cxacaix.component';
import { CxacaixDetailComponent } from '../detail/cxacaix-detail.component';
import { CxacaixUpdateComponent } from '../update/cxacaix-update.component';
import { CxacaixRoutingResolveService } from './cxacaix-routing-resolve.service';

const cxacaixRoute: Routes = [
  {
    path: '',
    component: CxacaixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CxacaixDetailComponent,
    resolve: {
      cxacaix: CxacaixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CxacaixUpdateComponent,
    resolve: {
      cxacaix: CxacaixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CxacaixUpdateComponent,
    resolve: {
      cxacaix: CxacaixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cxacaixRoute)],
  exports: [RouterModule],
})
export class CxacaixRoutingModule {}

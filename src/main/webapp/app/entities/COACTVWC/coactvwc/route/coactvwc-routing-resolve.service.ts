import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICoactvwc, Coactvwc } from '../coactvwc.model';
import { CoactvwcService } from '../service/coactvwc.service';

@Injectable({ providedIn: 'root' })
export class CoactvwcRoutingResolveService implements Resolve<ICoactvwc> {
  constructor(protected service: CoactvwcService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICoactvwc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((coactvwc: HttpResponse<Coactvwc>) => {
          if (coactvwc.body) {
            return of(coactvwc.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Coactvwc());
  }
}

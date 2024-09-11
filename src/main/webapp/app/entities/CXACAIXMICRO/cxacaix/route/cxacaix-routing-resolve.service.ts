import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICxacaix, Cxacaix } from '../cxacaix.model';
import { CxacaixService } from '../service/cxacaix.service';

@Injectable({ providedIn: 'root' })
export class CxacaixRoutingResolveService implements Resolve<ICxacaix> {
  constructor(protected service: CxacaixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICxacaix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cxacaix: HttpResponse<Cxacaix>) => {
          if (cxacaix.body) {
            return of(cxacaix.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cxacaix());
  }
}

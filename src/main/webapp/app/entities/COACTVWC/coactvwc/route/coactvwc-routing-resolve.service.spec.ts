jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICoactvwc, Coactvwc } from '../coactvwc.model';
import { CoactvwcService } from '../service/coactvwc.service';

import { CoactvwcRoutingResolveService } from './coactvwc-routing-resolve.service';

describe('Service Tests', () => {
  describe('Coactvwc routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CoactvwcRoutingResolveService;
    let service: CoactvwcService;
    let resultCoactvwc: ICoactvwc | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CoactvwcRoutingResolveService);
      service = TestBed.inject(CoactvwcService);
      resultCoactvwc = undefined;
    });

    describe('resolve', () => {
      it('should return ICoactvwc returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { acctdat: { id }, custdat: { id } } })));
        mockActivatedRouteSnapshot.params = { acctdat: { id: 123 }, custdat: { id: 456 } };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCoactvwc = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCoactvwc).toEqual({ acctdat: { id: 123 }, custdat: { id: 456 } });
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Coactvwc })));
        mockActivatedRouteSnapshot.params = { acctdat: { id: 123 }, custdat: { id: 456 } };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCoactvwc = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCoactvwc).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

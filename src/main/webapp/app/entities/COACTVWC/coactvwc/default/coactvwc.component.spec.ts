import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CoactvwcService } from '../service/coactvwc.service';

import { CoactvwcComponent } from './coactvwc.component';

describe('Component Tests', () => {
  describe('Coactvwc Management Component', () => {
    let comp: CoactvwcComponent;
    let fixture: ComponentFixture<CoactvwcComponent>;
    let service: CoactvwcService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CoactvwcComponent],
      })
        .overrideTemplate(CoactvwcComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CoactvwcComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CoactvwcService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'queryAcctdats').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.queryAcctdats).toHaveBeenCalled();
      expect(comp.acctdats[0]).toEqual(expect.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.queryAcctdats).toHaveBeenCalled();
      expect(comp.acctdats[0]).toEqual(expect.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.queryAcctdats).toHaveBeenCalledWith(expect.objectContaining({ sort: ['id,asc'] }));
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.queryAcctdats).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,asc', 'id'] }));
    });

    it('should re-initialize the page', () => {
      // WHEN
      comp.loadPage(1);
      comp.reset();

      // THEN
      expect(comp.page).toEqual(0);
      expect(service.queryAcctdats).toHaveBeenCalledTimes(2);
      expect(comp.acctdats[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});

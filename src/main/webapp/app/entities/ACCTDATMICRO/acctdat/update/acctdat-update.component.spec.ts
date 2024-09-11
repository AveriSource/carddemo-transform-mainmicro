jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AcctdatService } from '../service/acctdat.service';
import { IAcctdat, Acctdat } from '../acctdat.model';

import { AcctdatUpdateComponent } from './acctdat-update.component';

describe('Component Tests', () => {
  describe('Acctdat Management Update Component', () => {
    let comp: AcctdatUpdateComponent;
    let fixture: ComponentFixture<AcctdatUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let acctdatService: AcctdatService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AcctdatUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(AcctdatUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AcctdatUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      acctdatService = TestBed.inject(AcctdatService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const acctdat: IAcctdat = { id: 456 };

        activatedRoute.data = of({ acctdat });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(acctdat));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Acctdat>>();
        const acctdat = { id: 123 };
        jest.spyOn(acctdatService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ acctdat });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: acctdat }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(acctdatService.update).toHaveBeenCalledWith(acctdat);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Acctdat>>();
        const acctdat = new Acctdat();
        jest.spyOn(acctdatService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ acctdat });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: acctdat }));
        saveSubject.complete();

        // THEN
        expect(acctdatService.create).toHaveBeenCalledWith(acctdat);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Acctdat>>();
        const acctdat = { id: 123 };
        jest.spyOn(acctdatService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ acctdat });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(acctdatService.update).toHaveBeenCalledWith(acctdat);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});

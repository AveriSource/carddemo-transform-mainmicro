jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CxacaixService } from '../service/cxacaix.service';
import { ICxacaix, Cxacaix } from '../cxacaix.model';

import { CxacaixUpdateComponent } from './cxacaix-update.component';

describe('Component Tests', () => {
  describe('Cxacaix Management Update Component', () => {
    let comp: CxacaixUpdateComponent;
    let fixture: ComponentFixture<CxacaixUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cxacaixService: CxacaixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CxacaixUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CxacaixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CxacaixUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cxacaixService = TestBed.inject(CxacaixService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cxacaix: ICxacaix = { id: 456 };

        activatedRoute.data = of({ cxacaix });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cxacaix));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Cxacaix>>();
        const cxacaix = { id: 123 };
        jest.spyOn(cxacaixService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cxacaix });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cxacaix }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cxacaixService.update).toHaveBeenCalledWith(cxacaix);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Cxacaix>>();
        const cxacaix = new Cxacaix();
        jest.spyOn(cxacaixService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cxacaix });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cxacaix }));
        saveSubject.complete();

        // THEN
        expect(cxacaixService.create).toHaveBeenCalledWith(cxacaix);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Cxacaix>>();
        const cxacaix = { id: 123 };
        jest.spyOn(cxacaixService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cxacaix });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cxacaixService.update).toHaveBeenCalledWith(cxacaix);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});

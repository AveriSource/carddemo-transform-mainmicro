jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CoactvwcService } from '../service/coactvwc.service';
import { ICoactvwc, Coactvwc } from '../coactvwc.model';

import { CoactvwcUpdateComponent } from './coactvwc-update.component';

describe('Component Tests', () => {
  describe('Coactvwc Management Update Component', () => {
    let comp: CoactvwcUpdateComponent;
    let fixture: ComponentFixture<CoactvwcUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let coactvwcService: CoactvwcService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CoactvwcUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CoactvwcUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CoactvwcUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      coactvwcService = TestBed.inject(CoactvwcService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const coactvwc: ICoactvwc = { acctdat: { id: 456 }, custdat: { id: 456 } };

        activatedRoute.data = of({ coactvwc });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(coactvwc));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Coactvwc>>();
        const coactvwc = { acctdat: { id: 123 }, custdat: { id: 456 } };
        jest.spyOn(coactvwcService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ coactvwc });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: coactvwc }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(coactvwcService.update).toHaveBeenCalledWith(coactvwc);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Coactvwc>>();
        const coactvwc = { acctdat: { id: 123 }, custdat: { id: 456 } };
        jest.spyOn(coactvwcService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ coactvwc });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(coactvwcService.update).toHaveBeenCalledWith(coactvwc);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});

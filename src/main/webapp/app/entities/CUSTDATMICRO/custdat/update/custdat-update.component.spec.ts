jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CustdatService } from '../service/custdat.service';
import { ICustdat, Custdat } from '../custdat.model';

import { CustdatUpdateComponent } from './custdat-update.component';

describe('Component Tests', () => {
  describe('Custdat Management Update Component', () => {
    let comp: CustdatUpdateComponent;
    let fixture: ComponentFixture<CustdatUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let custdatService: CustdatService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CustdatUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CustdatUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustdatUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      custdatService = TestBed.inject(CustdatService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const custdat: ICustdat = { id: 456 };

        activatedRoute.data = of({ custdat });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(custdat));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Custdat>>();
        const custdat = { id: 123 };
        jest.spyOn(custdatService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ custdat });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: custdat }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(custdatService.update).toHaveBeenCalledWith(custdat);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Custdat>>();
        const custdat = new Custdat();
        jest.spyOn(custdatService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ custdat });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: custdat }));
        saveSubject.complete();

        // THEN
        expect(custdatService.create).toHaveBeenCalledWith(custdat);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Custdat>>();
        const custdat = { id: 123 };
        jest.spyOn(custdatService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ custdat });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(custdatService.update).toHaveBeenCalledWith(custdat);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});

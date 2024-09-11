import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CxacaixDetailComponent } from './cxacaix-detail.component';

describe('Component Tests', () => {
  describe('Cxacaix Management Detail Component', () => {
    let comp: CxacaixDetailComponent;
    let fixture: ComponentFixture<CxacaixDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CxacaixDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cxacaix: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CxacaixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CxacaixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cxacaix on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cxacaix).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});

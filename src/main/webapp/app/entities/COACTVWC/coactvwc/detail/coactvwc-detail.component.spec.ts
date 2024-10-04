import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoactvwcDetailComponent } from './coactvwc-detail.component';

describe('Component Tests', () => {
  describe('Coactvwc Management Detail Component', () => {
    let comp: CoactvwcDetailComponent;
    let fixture: ComponentFixture<CoactvwcDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CoactvwcDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ coactvwc: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CoactvwcDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CoactvwcDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load coactvwc on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.coactvwc).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});

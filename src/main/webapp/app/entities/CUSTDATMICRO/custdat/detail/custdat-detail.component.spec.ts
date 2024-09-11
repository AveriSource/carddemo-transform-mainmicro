import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CustdatDetailComponent } from './custdat-detail.component';

describe('Component Tests', () => {
  describe('Custdat Management Detail Component', () => {
    let comp: CustdatDetailComponent;
    let fixture: ComponentFixture<CustdatDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CustdatDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ custdat: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CustdatDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustdatDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load custdat on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.custdat).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});

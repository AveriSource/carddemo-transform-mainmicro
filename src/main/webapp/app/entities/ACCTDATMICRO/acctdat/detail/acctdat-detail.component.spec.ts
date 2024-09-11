import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AcctdatDetailComponent } from './acctdat-detail.component';

describe('Component Tests', () => {
  describe('Acctdat Management Detail Component', () => {
    let comp: AcctdatDetailComponent;
    let fixture: ComponentFixture<AcctdatDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [AcctdatDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ acctdat: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(AcctdatDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AcctdatDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load acctdat on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.acctdat).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});

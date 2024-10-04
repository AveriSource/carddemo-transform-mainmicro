import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICoactvwc, Coactvwc } from '../coactvwc.model';
import { CoactvwcService } from '../service/coactvwc.service';

@Component({
  selector: 'jhi-coactvwc-update',
  templateUrl: './coactvwc-update.component.html',
})
export class CoactvwcUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    coactvwcId: [],
    acctId: [null, [Validators.required, Validators.max(11)]],
    acctActiveStatus: [null, [Validators.maxLength(1)]],
    acctCurrBal: [null, [Validators.max(12)]],
    acctCreditLimit: [null, [Validators.max(12)]],
    acctCashCreditLimit: [null, [Validators.max(12)]],
    acctOpenDate: [null, [Validators.maxLength(10)]],
    acctExpiraionDate: [null, [Validators.maxLength(10)]],
    acctReissueDate: [null, [Validators.maxLength(10)]],
    acctCurrCycCredit: [null, [Validators.max(12)]],
    acctCurrCycDebit: [null, [Validators.max(12)]],
    acctAddrZip: [null, [Validators.maxLength(10)]],
    acctGroupId: [null, [Validators.maxLength(10)]],
    filler: [null, [Validators.maxLength(178)]],
  });

  constructor(protected coactvwcService: CoactvwcService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coactvwc }) => {
      this.updateForm(coactvwc);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const coactvwc = this.createFromForm();
    if (coactvwc.acctdat!.id !== undefined) {
      this.subscribeToSaveResponse(this.coactvwcService.update(coactvwc));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICoactvwc>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(coactvwc: ICoactvwc): void {
    this.editForm.patchValue({
      accdat: {
        id: coactvwc.acctdat!.id,
        acctdatId: coactvwc.acctdat!.acctdatId,
        acctId: coactvwc.acctdat!.acctId,
        acctActiveStatus: coactvwc.acctdat!.acctActiveStatus,
        acctCurrBal: coactvwc.acctdat!.acctCurrBal,
        acctCreditLimit: coactvwc.acctdat!.acctCreditLimit,
        acctCashCreditLimit: coactvwc.acctdat!.acctCashCreditLimit,
        acctOpenDate: coactvwc.acctdat!.acctOpenDate,
        acctExpiraionDate: coactvwc.acctdat!.acctExpiraionDate,
        acctReissueDate: coactvwc.acctdat!.acctReissueDate,
        acctCurrCycCredit: coactvwc.acctdat!.acctCurrCycCredit,
        acctCurrCycDebit: coactvwc.acctdat!.acctCurrCycDebit,
        acctAddrZip: coactvwc.acctdat!.acctAddrZip,
        acctGroupId: coactvwc.acctdat!.acctGroupId,
        filler: coactvwc.acctdat!.filler,
      },
    });
  }

  protected createFromForm(): ICoactvwc {
    return {
      ...new Coactvwc(),
      acctdat: {
        id: this.editForm.get(['id'])!.value,
        acctdatId: this.editForm.get(['acctdatId'])!.value,
        acctId: this.editForm.get(['acctId'])!.value,
        acctActiveStatus: this.editForm.get(['acctActiveStatus'])!.value,
        acctCurrBal: this.editForm.get(['acctCurrBal'])!.value,
        acctCreditLimit: this.editForm.get(['acctCreditLimit'])!.value,
        acctCashCreditLimit: this.editForm.get(['acctCashCreditLimit'])!.value,
        acctOpenDate: this.editForm.get(['acctOpenDate'])!.value,
        acctExpiraionDate: this.editForm.get(['acctExpiraionDate'])!.value,
        acctReissueDate: this.editForm.get(['acctReissueDate'])!.value,
        acctCurrCycCredit: this.editForm.get(['acctCurrCycCredit'])!.value,
        acctCurrCycDebit: this.editForm.get(['acctCurrCycDebit'])!.value,
        acctAddrZip: this.editForm.get(['acctAddrZip'])!.value,
        acctGroupId: this.editForm.get(['acctGroupId'])!.value,
        filler: this.editForm.get(['filler'])!.value,
      },
    };
  }
}

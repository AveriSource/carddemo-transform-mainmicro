import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IAcctdat, Acctdat } from '../acctdat.model';
import { AcctdatService } from '../service/acctdat.service';

@Component({
  selector: 'jhi-acctdat-update',
  templateUrl: './acctdat-update.component.html',
})
export class AcctdatUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    acctdatId: [],
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

  constructor(protected acctdatService: AcctdatService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ acctdat }) => {
      this.updateForm(acctdat);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const acctdat = this.createFromForm();
    if (acctdat.id !== undefined) {
      this.subscribeToSaveResponse(this.acctdatService.update(acctdat));
    } else {
      this.subscribeToSaveResponse(this.acctdatService.create(acctdat));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcctdat>>): void {
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

  protected updateForm(acctdat: IAcctdat): void {
    this.editForm.patchValue({
      id: acctdat.id,
      acctdatId: acctdat.acctdatId,
      acctId: acctdat.acctId,
      acctActiveStatus: acctdat.acctActiveStatus,
      acctCurrBal: acctdat.acctCurrBal,
      acctCreditLimit: acctdat.acctCreditLimit,
      acctCashCreditLimit: acctdat.acctCashCreditLimit,
      acctOpenDate: acctdat.acctOpenDate,
      acctExpiraionDate: acctdat.acctExpiraionDate,
      acctReissueDate: acctdat.acctReissueDate,
      acctCurrCycCredit: acctdat.acctCurrCycCredit,
      acctCurrCycDebit: acctdat.acctCurrCycDebit,
      acctAddrZip: acctdat.acctAddrZip,
      acctGroupId: acctdat.acctGroupId,
      filler: acctdat.filler,
    });
  }

  protected createFromForm(): IAcctdat {
    return {
      ...new Acctdat(),
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
    };
  }
}

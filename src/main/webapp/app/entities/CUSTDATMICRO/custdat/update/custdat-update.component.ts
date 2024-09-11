import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICustdat, Custdat } from '../custdat.model';
import { CustdatService } from '../service/custdat.service';

@Component({
  selector: 'jhi-custdat-update',
  templateUrl: './custdat-update.component.html',
})
export class CustdatUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    custdatId: [],
    custId: [null, [Validators.max(9)]],
    custFirstName: [null, [Validators.maxLength(25)]],
    custMiddleName: [null, [Validators.maxLength(25)]],
    custLastName: [null, [Validators.maxLength(25)]],
    custAddrLine1: [null, [Validators.maxLength(50)]],
    custAddrLine2: [null, [Validators.maxLength(50)]],
    custAddrLine3: [null, [Validators.maxLength(50)]],
    custAddrStateCd: [null, [Validators.maxLength(2)]],
    custAddrCountryCd: [null, [Validators.maxLength(3)]],
    custAddrZip: [null, [Validators.maxLength(10)]],
    custPhoneNum1: [null, [Validators.maxLength(15)]],
    custPhoneNum2: [null, [Validators.maxLength(15)]],
    custSsn: [null, [Validators.max(9)]],
    custGovtIssuedId: [null, [Validators.maxLength(20)]],
    custDobYyyyMmDd: [null, [Validators.maxLength(10)]],
    custEftAccountId: [null, [Validators.maxLength(10)]],
    custPriCardHolderInd: [null, [Validators.maxLength(1)]],
    custFicoCreditScore: [null, [Validators.max(3)]],
    filler: [null, [Validators.maxLength(168)]],
  });

  constructor(protected custdatService: CustdatService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ custdat }) => {
      this.updateForm(custdat);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const custdat = this.createFromForm();
    if (custdat.id !== undefined) {
      this.subscribeToSaveResponse(this.custdatService.update(custdat));
    } else {
      this.subscribeToSaveResponse(this.custdatService.create(custdat));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustdat>>): void {
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

  protected updateForm(custdat: ICustdat): void {
    this.editForm.patchValue({
      id: custdat.id,
      custdatId: custdat.custdatId,
      custId: custdat.custId,
      custFirstName: custdat.custFirstName,
      custMiddleName: custdat.custMiddleName,
      custLastName: custdat.custLastName,
      custAddrLine1: custdat.custAddrLine1,
      custAddrLine2: custdat.custAddrLine2,
      custAddrLine3: custdat.custAddrLine3,
      custAddrStateCd: custdat.custAddrStateCd,
      custAddrCountryCd: custdat.custAddrCountryCd,
      custAddrZip: custdat.custAddrZip,
      custPhoneNum1: custdat.custPhoneNum1,
      custPhoneNum2: custdat.custPhoneNum2,
      custSsn: custdat.custSsn,
      custGovtIssuedId: custdat.custGovtIssuedId,
      custDobYyyyMmDd: custdat.custDobYyyyMmDd,
      custEftAccountId: custdat.custEftAccountId,
      custPriCardHolderInd: custdat.custPriCardHolderInd,
      custFicoCreditScore: custdat.custFicoCreditScore,
      filler: custdat.filler,
    });
  }

  protected createFromForm(): ICustdat {
    return {
      ...new Custdat(),
      id: this.editForm.get(['id'])!.value,
      custdatId: this.editForm.get(['custdatId'])!.value,
      custId: this.editForm.get(['custId'])!.value,
      custFirstName: this.editForm.get(['custFirstName'])!.value,
      custMiddleName: this.editForm.get(['custMiddleName'])!.value,
      custLastName: this.editForm.get(['custLastName'])!.value,
      custAddrLine1: this.editForm.get(['custAddrLine1'])!.value,
      custAddrLine2: this.editForm.get(['custAddrLine2'])!.value,
      custAddrLine3: this.editForm.get(['custAddrLine3'])!.value,
      custAddrStateCd: this.editForm.get(['custAddrStateCd'])!.value,
      custAddrCountryCd: this.editForm.get(['custAddrCountryCd'])!.value,
      custAddrZip: this.editForm.get(['custAddrZip'])!.value,
      custPhoneNum1: this.editForm.get(['custPhoneNum1'])!.value,
      custPhoneNum2: this.editForm.get(['custPhoneNum2'])!.value,
      custSsn: this.editForm.get(['custSsn'])!.value,
      custGovtIssuedId: this.editForm.get(['custGovtIssuedId'])!.value,
      custDobYyyyMmDd: this.editForm.get(['custDobYyyyMmDd'])!.value,
      custEftAccountId: this.editForm.get(['custEftAccountId'])!.value,
      custPriCardHolderInd: this.editForm.get(['custPriCardHolderInd'])!.value,
      custFicoCreditScore: this.editForm.get(['custFicoCreditScore'])!.value,
      filler: this.editForm.get(['filler'])!.value,
    };
  }
}

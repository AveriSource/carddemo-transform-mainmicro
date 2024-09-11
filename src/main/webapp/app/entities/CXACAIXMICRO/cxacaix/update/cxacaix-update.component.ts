import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICxacaix, Cxacaix } from '../cxacaix.model';
import { CxacaixService } from '../service/cxacaix.service';

@Component({
  selector: 'jhi-cxacaix-update',
  templateUrl: './cxacaix-update.component.html',
})
export class CxacaixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cxacaixId: [],
    xrefCardNum: [null, [Validators.maxLength(16)]],
    xrefCustId: [null, [Validators.max(9)]],
    xrefAcctId: [null, [Validators.max(11)]],
    filler: [null, [Validators.maxLength(14)]],
  });

  constructor(protected cxacaixService: CxacaixService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cxacaix }) => {
      this.updateForm(cxacaix);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cxacaix = this.createFromForm();
    if (cxacaix.id !== undefined) {
      this.subscribeToSaveResponse(this.cxacaixService.update(cxacaix));
    } else {
      this.subscribeToSaveResponse(this.cxacaixService.create(cxacaix));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICxacaix>>): void {
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

  protected updateForm(cxacaix: ICxacaix): void {
    this.editForm.patchValue({
      id: cxacaix.id,
      cxacaixId: cxacaix.cxacaixId,
      xrefCardNum: cxacaix.xrefCardNum,
      xrefCustId: cxacaix.xrefCustId,
      xrefAcctId: cxacaix.xrefAcctId,
      filler: cxacaix.filler,
    });
  }

  protected createFromForm(): ICxacaix {
    return {
      ...new Cxacaix(),
      id: this.editForm.get(['id'])!.value,
      cxacaixId: this.editForm.get(['cxacaixId'])!.value,
      xrefCardNum: this.editForm.get(['xrefCardNum'])!.value,
      xrefCustId: this.editForm.get(['xrefCustId'])!.value,
      xrefAcctId: this.editForm.get(['xrefAcctId'])!.value,
      filler: this.editForm.get(['filler'])!.value,
    };
  }
}

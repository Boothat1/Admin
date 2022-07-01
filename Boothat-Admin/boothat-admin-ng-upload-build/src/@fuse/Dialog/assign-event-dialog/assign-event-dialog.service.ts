import { Injectable } from '@angular/core';
import { ApiEndPointUrl } from '@fuse/utils/systemEnums'
import { HttpClient } from '@angular/common/http';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';
import { CommonService } from '@fuse/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AssignEventDialogService {

  constructor(
    private _httpClient: HttpClient,
    private _fuseProgressBarService: FuseProgressBarService,
    private _matSnackBar: MatSnackBar,
    private _commonService:CommonService
  ) { }

  assignEventToDistributor(payload) {
    this._fuseProgressBarService.show()
    return new Promise((resolve, reject) => {

      this._httpClient.post(ApiEndPointUrl + 'event/assign/distributor', payload, this._commonService.getHeader()).subscribe((result: any) => {
        if (result.status == 200) {
          resolve(result)
        }
        this._fuseProgressBarService.hide()
        this._matSnackBar.open(result.message, 'OK', {
          verticalPosition: 'bottom',
          duration: 2000
        })
      }, reject)
    })
  }

  editAssignedEvent(payload) {
    this._fuseProgressBarService.show()
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'distributor/getbyid/editassignedevent', payload, this._commonService.getHeader()).subscribe((result: any) => {
        if (result.status == 200) {
          resolve(result)
        }
        this._fuseProgressBarService.hide()
        this._matSnackBar.open(result.message, 'OK', {
          verticalPosition: 'bottom',
          duration: 2000
        })
      }, reject)
    })
  }
}

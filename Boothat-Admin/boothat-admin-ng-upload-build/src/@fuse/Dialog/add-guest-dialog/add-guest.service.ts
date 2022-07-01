import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiEndPointUrl } from '@fuse/utils/systemEnums';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CommonService } from '@fuse/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AddGuestService {

  constructor(
    private _http: HttpClient,
    private _matSnackBar: MatSnackBar,
    private _fuseProgressBarService: FuseProgressBarService,
    private _commonService:CommonService
  ) { }

  addGuest(data) {

    let formData = new FormData()
    formData.append("name", data.name)
    formData.append("position", data.position)
    formData.append("image", data.image)

    this._fuseProgressBarService.show()
    return new Promise((resolve, reject) => {
      this._http.post(ApiEndPointUrl + 'event/add/guest', formData, this._commonService.getHeader('formData')).subscribe((result: any) => {
        this._fuseProgressBarService.hide()
        if (result.status = 200) {
          resolve(result)
        }
        this._matSnackBar.open(result.message, 'OK', {
          verticalPosition: "bottom",
          duration: 2000
        })
      }, reject)
    })
  }

  editGuest(data, id) {
   
    let formData = new FormData()
    formData.append("guestId", id)
    formData.append("name", data.name)
    formData.append("position", data.position)
    formData.append("image", data.image)

    this._fuseProgressBarService.show()
    return new Promise((resolve, reject) => {
      this._http.post(ApiEndPointUrl + 'event/edit/guest', formData, this._commonService.getHeader('formData')).subscribe((result: any) => {
        this._fuseProgressBarService.hide()
        if (result.status = 200) {
          resolve(result)
        }
        this._matSnackBar.open(result.message, 'OK', {
          verticalPosition: "bottom",
          duration: 2000
        })
      }, reject)
    })
  }
}



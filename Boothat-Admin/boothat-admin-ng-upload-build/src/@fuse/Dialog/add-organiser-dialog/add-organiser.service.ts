import { Injectable } from '@angular/core';
import { ApiEndPointUrl } from '@fuse/utils/systemEnums';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';
import { CommonService } from '@fuse/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AddOrganiserService {
  organiser
  constructor(
    private _httpClient: HttpClient,
    private _fuseProgressBarService: FuseProgressBarService,
    private _matSnackBar: MatSnackBar,
    private _commonService:CommonService
  ) { }

  addOrganiser(data) {
    let formData = new FormData();
    formData.append("name", data.name)
    formData.append("profilePic", data.profileImage)
    formData.append("webSite", data.website)
    formData.append("mobile", data.mobile)

    return new Promise((resolve, reject) => {
      this._fuseProgressBarService.show()
      this._httpClient.post(ApiEndPointUrl + 'event/add/organiser', formData, this._commonService.getHeader('formData'))
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
          this._matSnackBar.open(result.message, 'OK', {
            duration: 2000,
            verticalPosition: "bottom"
          })
          this._fuseProgressBarService.hide()
        }, reject)
    })
  }

  getOrganiserById(id) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'event/getbyid/organiser', { organiserId: id }, this._commonService.getHeader())
        .subscribe((result: any) => {
          if (result.status == 200) {
            this.organiser = result.data
            resolve(result)
          }
        }, reject)
    })
  }

  editOrganiser(data, id) {
    let formData = new FormData();
    formData.append("name", data.name)
    formData.append("profilePic", data.profileImage)
    formData.append("webSite", data.website)
    formData.append("mobile", data.mobile)
    formData.append("organiserId", id)

    return new Promise((resolve, reject) => {
      this._fuseProgressBarService.show()
      this._httpClient.post(ApiEndPointUrl + 'event/edit/organiser', formData, this._commonService.getHeader('formData'))
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
          this._matSnackBar.open(result.message, 'OK', {
            duration: 2000,
            verticalPosition: "bottom"
          })
          this._fuseProgressBarService.hide()
        }, reject)
    })
  }

}

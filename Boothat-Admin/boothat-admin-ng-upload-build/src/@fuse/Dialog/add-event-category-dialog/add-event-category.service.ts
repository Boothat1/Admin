import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiEndPointUrl } from '@fuse/utils/systemEnums';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CommonService } from '@fuse/services/common.service';


@Injectable({
  providedIn: 'root'
})
export class AddEventCategoryService {

  constructor(
    private _http: HttpClient,
    private _matSnackBar: MatSnackBar,
    private _fuseProgressBarService: FuseProgressBarService,
    private _commonService: CommonService
  ) { }

  addCategory(data) {

    // const payload = {
    //   title: data.typeName,
    //   icon: data.icon
    // }

    let formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("icon", data.icon)

    this._fuseProgressBarService.show()
    return new Promise((resolve, reject) => {
      this._http.post(ApiEndPointUrl + 'event/add/category', formData, this._commonService.getHeader('formData')).subscribe((result: any) => {
        this._fuseProgressBarService.hide()
        if (result.status == 200) {
          resolve(result)
        }
        this._matSnackBar.open(result.message, 'OK', {
          verticalPosition: "bottom",
          duration: 2000
        })
      }, err => {
        this._fuseProgressBarService.hide()
        reject(err)
      })
    })
  }
  editCategory(data, id) {
    // const payload = {
    //   eventTypeId: id,
    //   title: data.typeName,
    //   icon: data.icon
    // }
    let formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("icon", data.icon)
    formData.append("categoryId", id)

    this._fuseProgressBarService.show()
    return new Promise((resolve, reject) => {
      this._http.post(ApiEndPointUrl + 'event/edit/category', formData, this._commonService.getHeader('formData')).subscribe((result: any) => {
        this._fuseProgressBarService.hide()
        if (result.status == 200) {
          resolve(result)
        }
        this._matSnackBar.open(result.message, 'OK', {
          verticalPosition: "bottom",
          duration: 2000
        })
      }, err => {
        this._fuseProgressBarService.hide()
        reject(err)
      })
    })
  }
}



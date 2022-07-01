import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiEndPointUrl } from '@fuse/utils/systemEnums';
import { MatSnackBar } from '@angular/material';
import { CommonService } from '@fuse/services/common.service';


@Injectable({
  providedIn: 'root'
})
export class AddTicketTypeService {

  constructor(
    private _fuseProgressBarService:FuseProgressBarService,
    private _http:HttpClient,
    private _matSnackBar:MatSnackBar,
    private _commonService:CommonService
  ) { }

  addTicketType(data) {

    const formData  =new FormData();
    formData.append('title',data.typeName)
    formData.append('description',data.desc)
    formData.append('icon',data.icon)


    this._fuseProgressBarService.show()
    return new Promise((resolve, reject) => {
      this._http.post(ApiEndPointUrl + 'tickets/add/type', formData, this._commonService.getHeader()).subscribe((result: any) => {
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

  editTicketType(data, id) {
    
    const formData  =new FormData();
    formData.append('title',data.typeName)
    formData.append('description',data.desc)
    formData.append('icon',data.icon)
    formData.append('typeId',id)

    this._fuseProgressBarService.show()
    return new Promise((resolve, reject) => {
      this._http.put(ApiEndPointUrl + 'tickets/updateadd/type', formData, this._commonService.getHeader()).subscribe((result: any) => {
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

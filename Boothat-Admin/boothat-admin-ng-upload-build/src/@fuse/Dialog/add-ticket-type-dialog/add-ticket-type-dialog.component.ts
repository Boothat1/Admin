import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddTicketTypeService } from './add-ticket-type.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-ticket-type-dialog.component.html',
  styleUrls: ['./add-ticket-type-dialog.component.scss']
})
export class AddTicketTypeDialogComponent implements OnInit {

  previewUrl;
  isImageValid = true;
  form: FormGroup
  imageFile
  @ViewChild('fileUpload', { static: true }) fileUpload: ElementRef

  constructor(
    private _fb: FormBuilder,
    public matDialogRef: MatDialogRef<AddTicketTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _addTicketTypeService:AddTicketTypeService
  ) { }

  ngOnInit() {
    if (this._data.ticketType) {
      this.createFrom(this._data.ticketType)
    } else {
      this.createFrom()
    }
  }

   onSubmit() {
   
    if (this._data.ticketType)
      this._addTicketTypeService.editTicketType(this.form.value, this._data.ticketType.id).then(() => {
        this.matDialogRef.close(true)
      })
    else
      this._addTicketTypeService.addTicketType(this.form.value).then(() => {
        this.matDialogRef.close(true)
      })
  }

  createFrom(data?) {
    this.form = this._fb.group({
      "typeName": [data ? data.title : '', Validators.required],
      "icon": [data ? data.icon : ''],
      "desc": [data ? data.description : '']
    })
    if(data)
    this.previewUrl = data.icon
  }

  removeImage() {
    this.fileUpload.nativeElement.value = ''
    this.previewUrl = ''
    this.form.get('icon').setValue('')
  }

  readUrl(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('image type is ', file.type)
      if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/jpg') {
        this.isImageValid = true;
      } else {
        this.isImageValid = false;
      }
      if (this.isImageValid) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.previewUrl = reader.result;
        }
        this.form.get('icon').setValue(file)
      }
    }
  }

}

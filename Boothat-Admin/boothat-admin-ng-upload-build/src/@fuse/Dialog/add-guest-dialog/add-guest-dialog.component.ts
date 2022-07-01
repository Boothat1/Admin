import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CommonService } from '@fuse/services/common.service';
import {AddGuestService } from './add-guest.service';
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-guest-dialog.component.html',
  styleUrls: ['./add-guest-dialog.component.scss']
})
export class AddGuestDialogComponent implements OnInit {

  previewUrl;
  imageFile;
  isImageValid = true;
  form: FormGroup
  @ViewChild('fileUpload', { static: true }) fileUpload: ElementRef

  constructor(
    private _fb: FormBuilder,
    public matDialogRef: MatDialogRef<AddGuestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    
    private sanitizer: DomSanitizer,
    private _matDialog:MatDialog,
    private _addGuestService:AddGuestService
  ) { }
  ngOnInit() {
    if (this._data.guest)
      this.createForm(this._data.guest)
    else
      this.createForm()
  }

  createForm(data?) {
    this.form = this._fb.group({
      "name": [data ? data.name : '', Validators.required],
      "position": [data ? data.position : ''],
      "image": [data ? data.image : '']
    })
    this.previewUrl =this.form.value.image
  }

   onSubmit() {
    if (this._data.guest)
      this._addGuestService.editGuest(this.form.value, this._data.guest.id).then(() => {
        this.matDialogRef.close(true)
      })
    else
      this._addGuestService.addGuest(this.form.value).then(() => {
        this.matDialogRef.close(true)
      })
  }

  removeImage() {
    this.fileUpload.nativeElement.value = ''
    this.previewUrl = ''
    this.form.get('image').setValue('')
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
          this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result.toString())
          console.log(this.previewUrl)
        }
        this.imageFile = file
        this.form.get('image').setValue(file)
      }
    }
  }

 

}

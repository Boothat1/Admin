import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CommonService } from '@fuse/services/common.service';
import { AddEventCategoryService } from './add-event-category.service';
import { DomSanitizer } from "@angular/platform-browser";
import { ConfirmationDialogComponent } from '@fuse/Dialog/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-event-category-dialog.component.html',
  styleUrls: ['./add-event-category-dialog.component.scss']
})
export class AddEventCategoryDialogComponent implements OnInit {

  previewUrl;
  imageFile;
  isImageValid = true;
  form: FormGroup
  @ViewChild('fileUpload', { static: true }) fileUpload: ElementRef

  constructor(
    private _fb: FormBuilder,
    public matDialogRef: MatDialogRef<AddEventCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _commonService: CommonService,
    private _addEventCategoryService: AddEventCategoryService,
    private sanitizer: DomSanitizer,
    private _matDialog:MatDialog
  ) { }
  ngOnInit() {
    if (this._data.eventCategory)
      this.createForm(this._data.eventCategory)
    else
      this.createForm()
  }

  createForm(data?) {
    this.form = this._fb.group({
      "title": [data ? data.title : '', Validators.required],
      "description": [data ? data.description : ''],
      "icon": [data ? data.icon : '']
    })
    this.previewUrl =this.form.value.icon
  }

   onSubmit() {
    if (this._data.eventCategory)
      this._addEventCategoryService.editCategory(this.form.value, this._data.eventCategory.id).then(() => {
        this.matDialogRef.close(true)
      })
    else
      this._addEventCategoryService.addCategory(this.form.value).then(() => {
        this.matDialogRef.close(true)
      })
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
      if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type=='image/svg+xml' || file.type=='image/vnd.microsoft.icon') {
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
        this.form.get('icon').setValue(file)
      }
    }
  }

 

}

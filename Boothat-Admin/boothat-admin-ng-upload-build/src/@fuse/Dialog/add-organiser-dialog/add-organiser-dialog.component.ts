import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { AddOrganiserService } from './add-organiser.service';
import { CropperComponent } from '@fuse/Dialog/cropper/cropper.component';

@Component({
  selector: 'app-add-organiser-dialog',
  templateUrl: './add-organiser-dialog.component.html',
  styleUrls: ['./add-organiser-dialog.component.scss']
})
export class AddOrganiserDialogComponent implements OnInit {
  croppedImageBase64
  imageFile;
  isImageValid = true;
  form: FormGroup
  @ViewChild('fileUpload', { static: true }) fileUpload: ElementRef

  constructor(
    private _fb: FormBuilder,
    public matDialogRef: MatDialogRef<AddOrganiserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _matDialog: MatDialog,
    private _addOrganiserService:AddOrganiserService
  ) {
    if (this._data.organiser)
      this.createForm(this._data.organiser)
    else
      this.createForm()
  }

  ngOnInit() {
  }

  createForm(data?) {
    this.form = this._fb.group({
      "name": [data ? data.name : '', Validators.required],
      "website": [data ? data.webSite : ''],
      "mobile": [data ? data.mobile : ''],
      "profileImage": [data ? data.profileImage : '']
    })
    if(data)
    this.croppedImageBase64 = data.profileImage
  }

  async onSubmit() {
    console.log('submitted')
 
    if (this._data.organiser)
      this._addOrganiserService.editOrganiser(this.form.value, this._data.organiser.id).then(() => {
        this.matDialogRef.close(true)
      })
    else
      this._addOrganiserService.addOrganiser(this.form.value).then(() => {
        this.matDialogRef.close(true)
      })
  }

  removeImage() {
    this.fileUpload.nativeElement.value = ''
    this.croppedImageBase64 = ''
    this.form.get('profileImage').setValue('')
  }

  readUrl(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('image type is ', file.type)
      if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/svg+xml' || file.type == 'image/vnd.microsoft.icon') {
        this.isImageValid = true;
      } else {
        this.isImageValid = false;
      }
      if (this.isImageValid) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          // this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result.toString())
          // console.log(this.previewUrl)
          this.openCropper(event)
        }
        this.imageFile = file
      }
    }
  }

  openCropper(event) {
    console.log(event)
    this._matDialog.open(CropperComponent, {
        // height: '80vh',
        width: '50vw',
        data: { imageEventToCrop: event, ratio: 1 / 1 }
    }).afterClosed().subscribe((dialogData: any) => {
        if (dialogData) {
            this.croppedImageBase64 = dialogData.croppedImageBase64;
            this.form.get('profileImage').setValue(dialogData.croppedImageFile);
        } else {
            this.fileUpload.nativeElement.value = ''
        }
    });
}

}

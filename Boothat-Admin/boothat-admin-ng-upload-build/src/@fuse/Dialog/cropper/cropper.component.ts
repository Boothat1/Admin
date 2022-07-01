import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit {
  fileName;
  imageChangedEvent: any = '';
  imageFileToCrop;
  croppedImageBase64: any = '';
  croppedImageFile;
  sliderVal
  ratio = 1 / 1;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CropperComponent>
  ) {
    if (this.data.imageEventToCrop) {
      this.imageChangedEvent = this.data.imageEventToCrop;
      this.fileName = this.data.imageEventToCrop.target.files[0].name
    }

    if (this.data.imageFile) {
      this.imageFileToCrop = this.data.imageFile
      this.fileName = this.data.imageFile.name
    }


    this.ratio = this.data.ratio


  }


  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageBase64 = event.base64;
console.log(this.croppedImageBase64)
    let imageBlob = base64ToFile(event.base64)

    this.croppedImageFile = new File([imageBlob], this.fileName)
  }

  // imageLoaded(image: HTMLImageElement) {
  //   // show cropper
  // }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  ngOnInit() {
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

  onCropClick(): void {
    this.dialogRef.close({ croppedImageBase64: this.croppedImageBase64, croppedImageFile: this.croppedImageFile });
  }
}

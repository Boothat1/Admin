import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CropperComponent } from '@fuse/Dialog/cropper/cropper.component';
import { DeleteDailogComponent } from '@fuse/Dialog/delete-dailog/delete-dailog.component';
import { CommonService } from '@fuse/services/common.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  croppedImageBase64: any = '';
  addBanner = this.fb.group({
    title:[''],
    startDate:[''],
    endDate:[''],
    image:['']
  })
  dobMax = new Date();
  paramsId: any;
  bannerDetails: any;
  constructor(public commonService:CommonService,
              private _matDialog:MatDialog,
              private fb: FormBuilder,
              private snackBar:MatSnackBar,
              private router:Router,
              private activatedRoutes:ActivatedRoute) {
                this.activatedRoutes.queryParams.subscribe((result:any)=>{
                  console.log(result);
                  if(result.id){
                    this.paramsId = result.id
                    this.bannerDetail(this.paramsId)
                  }
                })
               }

  ngOnInit() {
  }
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    console.log("files",files)
    // this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);
          // this.addOfferForm.get('file').setValue(file);
          this.openCropper(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
  openCropper(file) {
    this._matDialog.open(CropperComponent, {
      // height: '80vh',
      width: '50vw',
      data: { imageFile: file, ratio: 5 / 2 }
    }).afterClosed().subscribe((dialogData: any) => {
      if (dialogData) {
        this.croppedImageBase64 = dialogData.croppedImageBase64;
        this.addBanner.get('image').setValue(dialogData.croppedImageFile);
      }
    });
  }
  onRemoveImage() {
    this.croppedImageBase64 = ''
  }

  // ------------------
  takeProfileImg(event) {
    console.log(event.target.files[0]);

  }
  submit(){
    console.log(this.addBanner.value);   
    let formData = new FormData()
    formData.append('title',this.addBanner.get('title').value)
    formData.append('startDate',this.convert(this.addBanner.get('startDate').value))
    formData.append('endDate',this.convert(this.addBanner.get('endDate').value))
    formData.append('image',this.addBanner.get('image').value)
    this.commonService.addBanners(formData).then((result:any)=>{
      console.log(result);
      if(result.status == 200){
        this.snackBar.open(result.message,"Okay",{duration:2000})
        this.router.navigate(['promote']);
      }      
    })
  }
  bannerDetail(id){
    this.commonService.bannerDetail(id).then((result:any)=>{
      console.log(result);
      if(result.status == 200){
        this.bannerDetails =  result.data.Banner        
        this.addBanner.get('title').setValue(this.bannerDetails.title)
        this.addBanner.get('startDate').setValue(this.bannerDetails.startDate)
        this.addBanner.get('endDate').setValue(this.bannerDetails.endDate)
        this.croppedImageBase64 =  this.bannerDetails.imageUrl
      }     
    })
  }
  deleteBanner(id){
    this._matDialog.open(DeleteDailogComponent,{
      height: '120px',
      width: '420px'
    }).afterClosed().subscribe((result:any)=>{
      if(result.delete){
        this.commonService.bannerDelete(id).then((result: any) => {
          if(result.status == 200){
            this.snackBar.open(result.message, 'okay', { duration: 2000 })
            this.router.navigate(['/promote'])
          }
        })
      }
    })
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
}

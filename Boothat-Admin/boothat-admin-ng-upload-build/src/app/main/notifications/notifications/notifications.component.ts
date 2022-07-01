import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AddEventCategoryDialogComponent } from '@fuse/Dialog/add-event-category-dialog/add-event-category-dialog.component';
import { CropperComponent } from '@fuse/Dialog/cropper/cropper.component';
import { SellerDailogComponent } from '@fuse/Dialog/seller-dailog/seller-dailog.component';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { ELEMENT_DATA } from 'app/main/dashboard/project/data.';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifyTo :any = '1';
  selectedIds:any = ''
  notificationsData: any = this.notificationService.tableData.notifications;
  searchText: any = '';
  config: any = {
    currentPage : 1,
    itemsPerPage : 5,
    totalItems : this.notificationService.tableData.recordCount,
  };
  @ViewChild('search', { static: true }) 
  search: ElementRef;
  croppedImageBase64: any = '';
  enum = Enums
  form = this.fb.group({
    // userType:[this.notifyTo,Validators.required],
    title: ['', Validators.required],
    message: ['', Validators.required],
  })
  timeFilterEnum: any;
  toSendNotification: any = [];
  allChecked: any;
  constructor(private _matDialog: MatDialog,
    public notificationService: NotificationsService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private _fuseProgressBarService:FuseProgressBarService
  ) {
    console.log(this.notificationsData);
    
  }

  ngOnInit() {

  }

  pageChanged(pageNumber) {
    this.fetchDataInTable(pageNumber, this.searchText, this.timeFilterEnum)
  }

  clearSearch() {
    this.search.nativeElement.value = "";
    this.search.nativeElement.focus()
    this.searchText = '';
    this.filterData('')
  }
  TimePeriodFilter(e) {
    this.timeFilterEnum = e.value
    this.fetchDataInTable(this.config.currentPage, this.searchText, this.timeFilterEnum)
  }
  filterData(input) {
    // console.log(input.value);
    this.fetchDataInTable(1, input.value, this.timeFilterEnum);
  }
  
  fetchDataInTable(pageNumber?, searchText?, searchDate?) {
    this._fuseProgressBarService.show()
    this.commonService.getNotifications(pageNumber, searchText, searchDate).then((result: any) => {
      console.log(result);
      if (result.status == 200) {
        this._fuseProgressBarService.hide()
        this.notificationsData = result.data.notifications;
        this.config.currentPage = result.data.pageIndex;
        this.config.totalItems = result.data.recordCount;
      }

    })
  }

  getNotifyType(event) {
    console.log(event);
    this.notifyTo = event.value;
    console.log("on change this.notifyTo",this.notifyTo);
    
  }

  remove(i: any): void {
    const index = this.toSendNotification.indexOf(i);

    if (index >= 0) {
      this.toSendNotification.splice(index, 1);
    }
  }
  submit(){
        this.toSendNotification.forEach(element => {
          this.selectedIds =  this.selectedIds.concat(element.id+',') 
        });
      
      // console.log("all selected",this.selectedIds);
      this.form.value.selectedIds = this.selectedIds.slice(0,-1);
      this.form.value.userType = +this.notifyTo;
      // console.log("form s value on submit",this.form);
      console.log("form s value on submit",this.form.value);3
        // console.log("this.notifyTo",this.notifyTo);
        console.log("this.selectedIds",this.selectedIds);
        
        this.commonService.sendNotification(this.form.value).then((result:any)=>{
          if(result.status == 200){
            this.form.get('title').setValue('')
            this.form.get('message').setValue('');

            this.toSendNotification = []
            this.selectedIds = ''
            this.snackBar.open(result.message,"Okay",{duration:2000})
            this.fetchDataInTable()
       
          }
        })
  }
  selectSeller() {
    this._matDialog.open(SellerDailogComponent, {
      width: '360px',
      minHeight: '500px',
      autoFocus: false,
      data:{
        notifyType:this.notifyTo
      }
    }).afterClosed().subscribe((result: any)=>{
      console.log("notificaions in ts file of notification",result);

      if(result){
        // if(result.Allchecked){
        //  const tempArr = [{id:0,user_name:"All"}]
        //   this.toSendNotification = tempArr;
        //    this.allChecked = result.Allchecked ;
        // }
        // else{
          this.toSendNotification = result.notificationData;
        // }
       
       
      }
     
    })
  }
}

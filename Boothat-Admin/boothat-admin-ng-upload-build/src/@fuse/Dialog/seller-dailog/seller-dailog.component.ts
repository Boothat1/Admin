import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '@fuse/services/common.service';
import { FuseUtils } from '@fuse/utils';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-seller-dailog',
  templateUrl: './seller-dailog.component.html',
  styleUrls: ['./seller-dailog.component.scss']
})
export class SellerDailogComponent implements OnInit {
  @ViewChild('search', { static: true })
  search: ElementRef;
  searchText: any = '';
  dialogRef: any;
  notifyType: any;
  totalCount: any;
  notificationData: any = [];
  selectAll :any= {id:0,user_name:'All',Allchecked:false}
  constructor(public dialog: MatDialog,
    public matDailogRef: MatDialogRef<SellerDailogComponent>,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public options) {
    this.notifyType = options.notifyType

    this.getCount()
    
  }

  ngOnInit() {
    // const matDialogConfig = new MatDialogConfig()

  } 
  clearSearch() {
    this.search.nativeElement.value = "";
    this.search.nativeElement.focus()
    this.searchText = '';
    this.filterData('')
    
  }
  close() {
    this.notificationData =  this.notificationData.filter((element:any)=>{
      return element.checked === true
    })   
    const payload =  {
      Allchecked:this.selectAll.Allchecked,
      notificationData:this.notificationData
    } 
    this.matDailogRef.close(payload);
  }

filterData(input) {
   this.selectAll.notificationData =  FuseUtils.filterArrayByString(this.selectAll.notificationData, input);
    // if (this.notifyType == '1') {
    //   this.getSeller(1,input.value)
    // }else{
    //   this.getUser(1,input.value)
    // }
  }
  confirmDailog() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '120px',
      width: '420px',
    });
  }



  updateAllComplete(){
    this.selectAll.Allchecked = this.selectAll.notificationData.every(t=>{return t.checked ===true}) 
  }
  someComplete(){
    if (this.selectAll.notificationData == null) {
      return false;
    }
    return this.selectAll.notificationData.filter(t => t.checked).length > 0 && !this.selectAll.Allchecked;
  }
  checkAll(i,event){
    i.Allchecked = event.checked;
    i.notificationData.forEach(t => (t.checked = event.checked));
  }
  selectNotifyedTo(i,event){
    i['checked'] = event.checked;
  }

  async getCount() {
    if (this.notifyType == '2') {
      await this.commonService.getMerchants().then((result: any) => {
        if (result.status == 200)
          this.totalCount = result.data.recordCount;
      })
      this.getSeller(1,'','',this.totalCount)
    }
    else {
      await this.commonService.getUser().then((result: any) => {
        if (result.status == 200)
          this.totalCount = result.data.recordCount;
      })
      this.getUser(1,'','',this.totalCount)
    }
  }
  getSeller(pageNumber?,search?, timeFilter?,pageSize?) {
    this.commonService.getMerchants(pageNumber, search, timeFilter, pageSize).then((result: any) => {
      // console.log(result.data.recordCount);
      if (result.status == 200){
        console.log(result.data.users);
        this.notificationData = result.data.users;
        this.notificationData.forEach((element:any, index:number)=>{
          this.notificationData[index].checked = false;
        })
        this.selectAll.notificationData  =  this.notificationData
        // this.notificationData.unshift(this.selectAll)
        console.log("notificationData",this.selectAll);
      }
        

    })
  }
  getUser(pageNumber?,search?, timeFilter?,pageSize?) {
    this.commonService.getUser(pageNumber, search, timeFilter, pageSize).then((result: any) => {
      if (result.status == 200){
        // console.log(result.data.users);
        this.notificationData = result.data.users;
        this.notificationData.forEach((element:any, index:number)=>{
          this.notificationData[index].checked = false;
        })
        this.selectAll.notificationData  =  this.notificationData
        // this.notificationData.unshift(this.selectAll)
        // console.log(this.notificationData);
        console.log("notificationData",this.selectAll);

      }

    })
  }
}

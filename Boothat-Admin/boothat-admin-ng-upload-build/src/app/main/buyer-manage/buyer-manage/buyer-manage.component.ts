import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@fuse/Dialog/confirmation-dialog/confirmation-dialog.component';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { ELEMENT_DATA } from 'app/main/dashboard/project/data.';
import { BuyerManageService } from '../buyer-manage.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CommonService } from '@fuse/services/common.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-buyer-manage',
  templateUrl: './buyer-manage.component.html',
  styleUrls: ['./buyer-manage.component.scss']
})
export class BuyerManageComponent implements OnInit{
  config: any = {
    currentPage:1,
    itemsPerPage:pageSize,
    totalItems:this.buyerManageService.users.recordCount
  };
  @ViewChild('search', { static: true })
  search: ElementRef;
  displayedColumns: string[] = ['sr','images','username','joinDate','mobile','city','action'];
  dataSource = this.buyerManageService.users.users;
  Enums =Enums;
  searchText:any;
  timeFilter: any;
  userStatus: number;
  constructor(public dialog: MatDialog,
              private buyerManageService: BuyerManageService,
              private _fuseProgressBarService: FuseProgressBarService,
              private _commonService:CommonService,
              private snackBar: MatSnackBar
              ){ 

  }
  ngOnInit() {
  }
  // openUserDailog(element): void {
  //   let dialogRef = this.dialog.open(UserDailogComponent, {
  //     height: '620px',
  //     width: '420px',
  //     data: {
  //       'dailogData':element
  //     }
  //   });
  //   console.log("1111111111111",element)
  // }
  confirmDailog(){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '120px',
      width: '420px',
    });
  }
  clearSearch(){
    this.search.nativeElement.value = "";
    this.search.nativeElement.focus()
    this.searchText ='';
    this.filterData('')
   
  }
  filterData(input){
    this.fetchTableData(1, input.value, this.timeFilter)
  }
  pageChanged(pageNumber){
    this.fetchTableData(pageNumber)
    // this.config.currentPage = pageNumber
  }

  saveIdForDetailPage(id){
      //this.detailService.idForDetailPage.next(id)
  }

  TimePeriodFilter(event){
    console.log(event);
    
    this.timeFilter = event.value;
    this.fetchTableData(1, this.searchText, this.timeFilter)
  }

  fetchTableData(pageNumber?, searchText?, timeFilter?){
    this._fuseProgressBarService.show()
    // console.log(this.searchText);
    
    this._commonService.getUser(pageNumber, searchText, timeFilter).then((result: any) => {
      console.log(result);
      if (result.status == 200) {
        this.dataSource = result.data.users
        this.config.currentPage = result.data.pageIndex;
        this.config.totalItems = result.data.recordCount;
        this._fuseProgressBarService.hide()
        
      }
      this._fuseProgressBarService.hide()
    })
  }

  UpdateSingleUser(id,status){  
    this._commonService.updateStatus(id,status? 0:1,1).then((result:any)=>{
      console.log(result);   
        if(result.status == 200){
          this.snackBar.open(result.data.message,"Okay",{duration: 2000});
          this.fetchTableData(this.config.currentPage)
        }else{
          this.snackBar.open(result.message,"Okay",{duration: 2000});
        }
    })
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ConfirmationDialogComponent } from '@fuse/Dialog/confirmation-dialog/confirmation-dialog.component';
import { DeleteDailogComponent } from '@fuse/Dialog/delete-dailog/delete-dailog.component';
import { CommonService } from '@fuse/services/common.service';
import { Enums, pageSize } from '@fuse/utils/systemEnums';
import { prod_data } from 'app/main/dashboard/project/data.';
import { BannersService } from './banners.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({height: '0px', minHeight: '0'})),
  //     state('expanded', style({height: '*'})),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ],

})

// export class TableExpandableRowsExample {
  // dataSource = ELEMENT_DATA;
  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  // expandedElement: PeriodicElement | null;
// }



export class BannersComponent implements OnInit {
 
  
 
  // displayedColumns: string[] = ['position', 'name', 'weight', 'action'];
  // dataSource: MatTableDataSource<Element>;
  // expandedElement: any;


  constructor(private _commonService:CommonService,
    private _fuseProgressBarService:FuseProgressBarService,
    private bannerService:BannersService,
    private router:Router
    ) { 
      console.log('hrllo there');
      
      // this.dataSource = new MatTableDataSource();
      this.router.navigate(['/promote'])
  }

  ngOnInit() {
    console.log('hrllo there');
    // this.dataSource.data = data;
  }

  pageChanged(pageNumber:number) {
    this.fetchTableData(pageNumber)
  }
  fetchTableData(pageNumber?, searchText?, timeFilter?){
    this._fuseProgressBarService.show()
    // console.log(this.searchText);
    
    this._commonService.getBanners(pageNumber, searchText, timeFilter).then((result: any) => {
      console.log(result);
      if (result.status == 200) {
        // this.dataSource = result.data.banners
        // this.config.currentPage = result.data.pageIndex;
        // this.config.totalItems = result.data.recordCount;
        this._fuseProgressBarService.hide()
      }
      this._fuseProgressBarService.hide()
    })
  }
  // clearSearch(){
  //   this.search.nativeElement.value = "";
  //   this.search.nativeElement.focus()
  //   this.filterData('')
  //   this.searchText ='';
  // } 
  // filterData(input){
  //   this.fetchTableData(1, input.value, this.timeFilter)
  // }
  // TimePeriodFilter(event){
  //   this.timeFilter = event.value
  //   this.fetchTableData(1, this.searchText, this.timeFilter)
  // }
  enableDisableBanner(id,status){
    // let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    //   height: '120px',
    //   width: '420px',
    //   data:{
    //     status: status,
    //     module:'banner'
    //   }
    // }).afterClosed().subscribe((result:any)=>{
      
    //   console.log(result.delete);
    //   if(result.delete){
    //     this._fuseProgressBarService.show()
    //     this._commonService.enableDisableBanner(id,status).then((result:any)=>{
    //       console.log(result);
    //       if(result.status ==200){
    //         this.fetchTableData(this.config.currentPage,this.searchText, this.timeFilter)
    //         this.snackbar.open(result.data.message,"Okay",{duration:2000})
    //         this._fuseProgressBarService.hide()
    //       }
    //       this._fuseProgressBarService.hide()
    //     })
    //   }
    
    // })
  }
}


// export interface Element {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const data: Element[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
// ];
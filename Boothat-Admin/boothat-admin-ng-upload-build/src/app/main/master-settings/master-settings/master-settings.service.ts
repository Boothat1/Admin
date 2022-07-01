import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '@fuse/services/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterSettingsService implements Resolve<any> {
  SubCategories: any;
  categories: any;
  totalItems: any;
  subCateTotalItems: any;
  cateTotalItems: any;
  subCatecurrentPage: any;
  cateCurrentPage: any;
  tabOneData: any;
  
  constructor(private _commonService:CommonService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve,reject)=>{
      Promise.all([
        // this.getSubCategory(),this.getCategory(),this.getFirstPage()
      ]).then(
        () => {
         
          resolve('');

        }).catch(() => {

          reject('');
          
        });
    })
  }

//   getSubCategory(){
//    return this._commonService.getSubcategory().then((result:any)=>{
//       console.log("sub cate",result.data);
//       this.SubCategories = result.data.data;
//       this.subCateTotalItems = result.data.totalRecords;
//       this.subCatecurrentPage = result.data.pageIndex;
//     })
//   }  
//   getCategory(){
//    return this._commonService.getCategory().then((result:any)=>{
//      console.log("category",result.data);
//      this.categories = result.data.categories.data;
//      this.cateTotalItems = result.data.categories.totalRecords;
//      this.cateCurrentPage = result.data.pageIndex;
     
//    })
//   }
//   getFirstPage(){
//    return this._commonService.getPages(1).then((result:any)=>{
//       console.log(result.data.page[0]);
//       this.tabOneData = result.data.page[0]
//     })
// }
//  return getPages(pageId){
//     return this._commonService.getPages(pageId).then((result:any)=>{
//       console.log("pages",result.data.page[0]);    
//     })
//   }
}

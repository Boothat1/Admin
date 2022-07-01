import { Injectable } from '@angular/core';
import { ApiEndPointUrl, MyHeaders, ReqHeader, pageSize } from '@fuse/utils/systemEnums';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private _httpClient: HttpClient,
    private location: Location
  ) { }

  getDashboard(timeFilter?,category?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getDashboard',{
        timeFilter:timeFilter? timeFilter:'',
        categoryId:category?category :''
      } ,MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status == 200)
          resolve(result)
        else
          reject(result)
      })
    })
  }

  getUser(pageNumber?, search?, timeFilter?, pageDataCount?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/users-profile', {
        pageIndex: pageNumber ? pageNumber : 1,
        searchKey: search ? search : '',
        pageSize: pageDataCount ? pageDataCount : pageSize,
        timeFilter: timeFilter ? timeFilter : ''
      },
        MyHeaders.getMyHeaders().reqHeadersJSON)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }
  getBanners(pageNumber?, search?, timeFilter?, bannerType?, reqStatus?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getAllBanners', {
        pageIndex: pageNumber ? pageNumber : 1,
        searchKey: search ? search : '',
        pageSize: 6,
        timeFilter: timeFilter ? timeFilter : '',
        bannerType: bannerType ? bannerType : 2,
        reqStatus: reqStatus ? reqStatus : 3
      },
        MyHeaders.getMyHeaders().reqHeadersJSON)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }
  getAllExclusiveBooth(pageNumber?, search?, timeFilter?, reqStatus?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getAllExclusiveBooth', {
        pageIndex: pageNumber ? pageNumber : 1,
        searchKey: search ? search : '',
        pageSize: 10,
        timeFilter: timeFilter ? timeFilter : '',
        reqStatus: reqStatus ? reqStatus : 3
      },
        MyHeaders.getMyHeaders().reqHeadersJSON)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }

  getAllTrendingProduct(pageNumber?, search?, timeFilter?, reqStatus?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getAllTrendingProduct', {
        pageIndex: pageNumber ? pageNumber : 1,
        searchKey: search ? search : '',
        pageSize: 10,
        timeFilter: timeFilter ? timeFilter : '',
        reqStatus: reqStatus ? reqStatus : 3
      },
        MyHeaders.getMyHeaders().reqHeadersJSON)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }

  changePromoteRequestStatus(id?, reqStatus?, promoteType?, promotePlan?, rejectRemarks?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/changePromoteRequestStatus', {
        id: id,
        reqStatus: reqStatus,
        promoteType: promoteType,
        promotePlan: promotePlan,
        rejectRemarks: rejectRemarks ? rejectRemarks : ''
      },
        MyHeaders.getMyHeaders().reqHeadersJSON)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }
  getPromoCodes(pageNumber?, search?, timeFilter?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/get-all-Promo', {
        pageIndex: pageNumber ? pageNumber : 1,
        searchKey: search ? search : '',
        pageSize: pageSize,
        timeFilter: timeFilter ? timeFilter : ''
      },
        MyHeaders.getMyHeaders().reqHeadersJSON)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }
  getNotifications(pageNumber?, search?, timeFilter?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getAllNotification', {
        pageIndex: pageNumber ? pageNumber : 1,
        searchKey: search ? search : '',
        pageSize: 5,
        timeFilter: timeFilter ? timeFilter : ''
      },
        MyHeaders.getMyHeaders().reqHeadersJSON)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }
  addBanners(data) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/addBanners', data,
        MyHeaders.getMyHeaders().reqHeadersFormData)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }
  enableDisableBanner(id, status) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/enableDisableBanner', { bannerId: id, action: status },
        MyHeaders.getMyHeaders().reqHeadersJSON)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }
  enableDisableBooth(id, status) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/enableDisableBooth', { id: id, action: status },
        MyHeaders.getMyHeaders().reqHeadersJSON)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }
  bannerDetail(id) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getBannerById', { id: id },
        MyHeaders.getMyHeaders().reqHeadersJSON)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }
  bannerDelete(id) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/delete-banner', { id: id },
        MyHeaders.getMyHeaders().reqHeadersJSON)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }
  getProducts(pageNumber?, tabNumber?, merchantId?, search?, timeFilter?, categoryId?, ApprovalStatus?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getAllProducts', {
        merchantId: merchantId ? merchantId : '',
        pageIndex: pageNumber ? pageNumber : 1,
        searchKey: search ? search : '',
        pageSize: pageSize,
        timeFilter: timeFilter ? timeFilter : '',
        tabNumber: tabNumber ? tabNumber : 0,
        categoryId: categoryId ? categoryId : '',
        approvalStatus: ApprovalStatus ? ApprovalStatus : ''
      },
        MyHeaders.getMyHeaders().reqHeadersJSON)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }
  getAllBooth(pageNumber?, tabNumber?, search?, timeFilter?, ApprovalStatus?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getAllBooth', {

        pageIndex: pageNumber ? pageNumber : 1,
        searchKey: search ? search : '',
        pageSize: pageSize,
        timeFilter: timeFilter ? timeFilter : '',
        tabNumber: tabNumber ? tabNumber : 0,
        approvalStatus: ApprovalStatus ? ApprovalStatus : ''
      },
        MyHeaders.getMyHeaders().reqHeadersJSON)
        .subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
        })
    })
  }

  getAllOrderList(pageNumber?, tabNumber?, search?, timeFilter?,) {

    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getAllOrderList', {
        pageIndex: pageNumber,
        searchKey: search ? search : '',
        pageSize: pageSize,
        timeFilter: timeFilter ? timeFilter : '',
        listType: tabNumber ? tabNumber : 0
      }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })

  }
  getOrderDetails(orderId) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getOrderDetails', {
        orderId: orderId
      }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }

  changeOrderStatus(orderId,status,msg) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/changeOrderStatus', {
        id: orderId,
        deliveryStatus : status,
        address : msg
      }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }

  changePassword(data) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/change-password', data, MyHeaders.getMyHeaders().reqHeadersFormData).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }

  addContent(tab, title, desc,language?) {
    return new Promise((resolve, reject) => {
      this._httpClient.put(ApiEndPointUrl + 'admin/edit-content', {
        tabNumber: tab ? tab : 1,
        contentType: title,
        description: desc,
        local_language:language?language :'1'
      }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }
  getContentByTabnumber(tabNumber,language?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getContentByTabnumber', 
      { tabNumber: tabNumber ,local_language:language?language: '1'}, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }
  getProductCategory() {
    return new Promise((resolve, reject) => {
      this._httpClient.get(ApiEndPointUrl + 'admin/getProductCategory', MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }

  getCurrency() {
    return new Promise((resolve, reject) => {
      this._httpClient.get(ApiEndPointUrl + 'admin/getCurrency', MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }
  getPromotePlanPackage(promoteType) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getPromotePlanPackage', { promoteType: promoteType ? promoteType : 0 }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }

  addPramotePlanPackage(payload) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/addPromotePlanPackage', payload, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }
  resetUser(id, pass) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/user-reset-password', { id: id, password: pass }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }
  resetMerchant(id, pass) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/merchant-reset-password', { id: id, password: pass }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }
  editMerchant(data) {
    return new Promise((resolve, reject) => {
      this._httpClient.put(ApiEndPointUrl + 'admin/edit-merchant', data, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }
  addPromo(data) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/add-Promo', data, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }
  updatePromo(data) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/edit-Promo  ', data, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }
  PromoDetail(id) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getPromoById', { id: id }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }
  deletePromo(id) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/delete-Promo', { id: id }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }
  getSingleProduct(id) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getProductDetails', { productId: id }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status == 200)
          resolve(result)
        console.log("response", result);

      })
    })
  }
  changeProductApproveStatus(id, status) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/changeProductApproveStatus', { productId: id, productApproveStatus: status }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status == 200)
          resolve(result)
        console.log("response", result);

      })
    })
  }
  getSingleUser(id?,pageNumber?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/users-Details', { id: id ,pageIndex:pageNumber,pageSize:pageSize}, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status == 200)
          resolve(result)
        console.log("response", result);

      })
    })
  }
  public updateStatus(id, status, userType) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/enableDisableAccess',
        {
          userId: id,
          action: status,
          userType: userType
        },
        MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
          console.log("response", result);

        })
    })
  }
  public updateProductStatus(id, status, reason?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/changeProductApproveStatus',
        {
          productApproveStatus: status,
          productId: id,
          rejectRemarks: reason ? reason : ''
        },
        MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
          console.log("response", result);

        })
    })
  }
  public changeApprovalBooth(id, status, reason?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/changeApprovalBooth',
        {
          action: status,
          id: id,
          rejectRemarks: reason ? reason : ''
        },
        MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
          console.log("response", result);

        })
    })
  }

  public changeProductActiveStatus(id, status) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/changeProductActiveStatus',
        {
          action: status,
          productId: id,
        },
        MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
          console.log("response", result);

        })
    })
  }

  public changePromoActiveStatus(id, status) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/enableDisablePromo',
        {
          action: status,
          id: id,
        },
        MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
          console.log("response", result);

        })
    })
  }
  updateSingleMerchant(id, status) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/users-Details', { id: id, status: status }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status == 200)
          resolve(result)
        console.log("response", result);

      })
    })
  }
  getMerchants(pageNumber?, search?, searchDate?, pageSizeTotal?) {
    // console.log("in the api",orderBy);  
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/merchant-profile', {
        pageIndex: pageNumber,
        searchKey: search ? search : '',
        pageSize: pageSizeTotal ? pageSizeTotal : pageSize,
        timeFilter: searchDate ? searchDate : '',
      }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }



  getSingleMerchant(id) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/merchant-details', { id: id }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }
  getAllOrderListMerchant(id,pageNumber?){
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getAllOrderListMerchant', 
                          { merchantId: id ,
                            pageNumber : pageNumber? pageNumber:1,
                            pageSize:pageSize}, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }
  userDelete(id, type) {
    return new Promise((resolve, reject) => {
      this._httpClient.put(ApiEndPointUrl + 'admin/delete-user', { userId: id, userType: type }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }


  // productComparisonChart(){
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.post(ApiEndPointUrl + 'admin/productComparisonChart', 
  //                         { }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
  //       if (result.status)
  //         resolve(result)
  //     })
  //   })
  // }

  // pieChart(){
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.post(ApiEndPointUrl + 'admin/pieChart', 
  //                         { }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
  //       if (result.status)
  //         resolve(result)
  //     })
  //   })
  // }
  getAllComplaintList(pageNumber?,search?,timeFilter?){
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getAllComplaintList', 
                          { 
                            pageNumber : pageNumber? pageNumber:1,
                            pageSize:pageSize,
                            searchKey: search ? search : '',
                            timeFilter: timeFilter ? timeFilter : '',
                          }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
        if (result.status)
          resolve(result)
      })
    })
  }

  GetAllReturnRequest(pageNumber?,search?,approvalStatus?){
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getAllReturnRequestList', 
                          { 
                            pageNumber : pageNumber? pageNumber:1,
                            pageSize:pageSize,
                            searchKey: search ? search : '',
                            approvalStatus: approvalStatus ,
                          }, MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {

        if (result.status)
          resolve(result)
      })
    })
  }

  public ChangeReturnRequestStatus(id, status, reason?) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/changeReturnStatus',
        {
          returnStatus: status,
          id: id,
          rejectRemark: reason ? reason : ''
        },
        MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
          console.log("response", result);

        })
    })
  }

  public sendNotification(payload) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/sendNotification',
        payload,
        MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
          console.log("response", result);
        })
    })
  }

  getAllTransactionList(pageIndex?,userType?,searchKey?,timeFilter?){
    return new Promise((resolve, reject) => {
      this._httpClient.post(ApiEndPointUrl + 'admin/getAllTransactionList',
        {pageIndex : pageIndex ? pageIndex : 1,
         userType : userType? userType : 2,
         searchKey : searchKey? searchKey : '',
         timeFilter : timeFilter? timeFilter:''
        } ,
        MyHeaders.getMyHeaders().reqHeadersJSON).subscribe((result: any) => {
          if (result.status == 200)
            resolve(result)
          else
            reject(result)
          console.log("response", result);
        })
    })
  }































  goBack() {
    this.location.back();
  }
  getHeader(headerType?: 'formData') {
    if (headerType === 'formData') {
      return {
        headers: new HttpHeaders({
          'Authorization': localStorage.getItem('userToken')
        })
      }
    } else
      return {
        headers: new HttpHeaders({
          'Authorization': localStorage.getItem('userToken'),
          'Content-Type': 'application/json'
        })
      }

  }
}

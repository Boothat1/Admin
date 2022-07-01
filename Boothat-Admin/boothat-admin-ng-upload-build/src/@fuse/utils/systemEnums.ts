import { HttpHeaders } from '@angular/common/http';

export const ApiEndPointUrl = 'http://18.216.219.104:3002/api/v1/'; 
// export const ApiEndPointUrl =  'http://18.216.219.104:3001/api/v1/'  
export const DefaultFilter = {
  
  "pageIndex": 1,
  "pageSize": 10,
  "search": "",
  "startDate": 0,
  "endDate": 0,
  "eventStatus": 1
}

export const pageSize = 10;

export class MyHeaders {
  static getMyHeaders() {
    return {
      reqHeadersJSON: {
        headers: new HttpHeaders({
          'Authorization': localStorage.getItem('userToken') === null || localStorage.getItem('userToken') === undefined ? '' : localStorage.getItem('userToken'),
          'Content-Type': 'application/json'
        })
      },
      reqHeadersFormData: {
        headers: new HttpHeaders({
          'Authorization': localStorage.getItem('userToken')
        })
      }
    }
  }
}

export const ReqHeader = {
  reqHeadersJSON: {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('userToken') === null || localStorage.getItem('userToken') === undefined ? '' : localStorage.getItem('userToken'),
      'Content-Type': 'application/json'
    })
  },
  reqHeadersFormData: {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('userToken') 
    })
  }
}

// pattern validation
export enum Pattern {
  Email = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
  number = '^[+]91[0-9]*$',
  promoCode = '^[/.*\S.*/A-Z0-9]*',
  MobileMinLength = 10,
  MobileMaxLength = 12,
  Password = '^(?=.*?[A-Z])(?=.*?[0-9]).{6,}$',

}

export const Enums = {
  GENDER: {
    1: 'Male',
    2: 'Female',
    3:'Other'
  },

  FILTER: {
    1: "This Day",
    2: "This Week",
    3: "This Month",
  },
  MERCHANT_TYPE:{
    '':'All Merchant',
    2:'Redeemers',
    1:'Sellers'
  },

  ORDER_STATUS: {
    1: "PLACED",
    2: "SIGNED",
    3: "PROCESSED",
    4: "SHIPPED",
    5: "OUT FOR DELIVERY",
    6:"DELIVERED"
  },
  subscribeType: {
    1:'Montly',
    2:'Yearly'
  },
  TIME_FILTER: {
    0:"All",
    1: "Daily",
    2: "Weekly",
    3: "Monthly",
    4:"Quaterly",
    5:"Half Yearly",
    6:"Yearly"
  },
  promoType1:{
    1:"Single Time Use",
    2:"Multiple Time Use" 
  },
  promoType2:{
    1:"Discount",
    2:"Fixed Price" 
  },
  RETURN_REQUEST:{
    '':"All",
    1:"PENDING",
    2:"APPROVED",
    3:"REJECTED",
  },
  ORDER_HISTORY_STATUS:{
    1:'All',
    2:'Delivered',
    3:'Canceled'
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDailogComponent } from '@fuse/Dialog/delete-dailog/delete-dailog.component';
import { CommonService } from '@fuse/services/common.service';
// import { DetailService } from 'app/main/buyer-manage/buyer-manage/detail/buyerDetail.service';
import { SellerDetailService } from '../seller-detail.service';

@Component({
  selector: 'app-detail-overview',
  templateUrl: './detail-overview.component.html',
  styleUrls: ['./detail-overview.component.scss']
})
export class DetailOverviewComponent implements OnInit {
  isPassFormVisibile: boolean = false;
  pasStatus:boolean = true;

  form = this.fb.group({
    id:[''],
    password:['',Validators.required],
    confirm_password:['',Validators.required]
  })
  changeMobileForm = this.fb.group({
    userId:['',Validators.required],
    number:['',Validators.required]
  })
  detailOverview = this.fb.group({
    ratings:[''],
    followers:[''],
    products_selling:[''],
    first_name:[''],
    last_name:[''],
    username:[''],
    email:[''],
    country:[''],
    alter_email:[''],
    alter_phone:[''],
    shop_handle:[''],
    market_place:[''],
    whatapp_number:[''],
    instagram_link:[''],
    website_link:[''],
    description:[''],
    mobile:['']
  })
  pass: any;
  paramsId: any;
  singleMerchant: any;
  editInfoType: any  = '1';
  merchatMobile:any ="";
  constructor(public commonService: CommonService,
              public fb:FormBuilder,
              public detailService: SellerDetailService,
              private snackbar:MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private dailog:MatDialog
          ) {
            // this.activatedRoute.queryParams.subscribe((result:any)=>{
            //   console.log(result);
            //   this.paramsId = result.id
            //   if(this.paramsId){
            //     // this.detailService.getSingleMerchant(this.paramsId)
                
                
            //   }
            // })
           
           }

  ngOnInit() {
    
  }
  
  submit(){
    this.pass = this.form.get('password').value
    if(!this.form.valid || this.pasStatus===false){
      this.snackbar.open("Form is invalid" ,"Okay",{duration: 2000 })
    }else{
      this.commonService.resetMerchant(this.paramsId,this.pass).then((result:any)=>{
        console.log(result);
        if(result.status == 200){
          this.snackbar.open(result.message ,"Okay",{duration: 2000 })
          this.form.reset()
          this.isPassFormVisibile = false
        }   
      })
    }
  }
  selectEditInfo(event){
    console.log("selected vlaue",event.value);
    this.editInfoType = event.value
  }


  softDelete(id){
    this.dailog.open(DeleteDailogComponent,{
      minHeight:'120px',
      width:'420px',
    }).afterClosed().subscribe((result: any) => {
      if(result.delete){
        this.commonService.userDelete(id,2).then((result: any) => {
          if(result.status == 200){
            this.snackbar.open(result.data.message,"Okay",{duration:2000})
            this.router.navigate(['/seller-manage'])
          }
        })
      }
    })
   
}


  validatePassword(){
    this.pasStatus = (this.form.get('confirm_password').value == this.form.get('password').value) || this.form.get('confirm_password').value=='' || this.form.get('password').value==''
    ;
  }
  // getSingleMerchant(id): Promise<any> {
  //   console.log("seller-manage-detail-overview-component");
  //   return this.commonService.getSingleMerchant(id).then((result:any)=>{
  //     console.log(result); 
  //     if(result.status == 200){
  //       this.singleMerchant = result.data
  //       console.log("single merchant",this.singleMerchant);
  //       this.changeMobileForm.get('number').setValue(this.singleMerchant.user.phone);
  //     }   
  //   })
  // }
  editMerchent(number){
    this.changeMobileForm.get('userId').setValue(this.paramsId)
    console.log(this.changeMobileForm.value);
    
    
      this.commonService.editMerchant(this.changeMobileForm.value).then((result:any)=>{
        console.log(result);
        if(result.status ==200){
          this.snackbar.open(result.message,"Okay",{duration:2000});
          this.isPassFormVisibile = false
        }
      })
    }
    
  
}

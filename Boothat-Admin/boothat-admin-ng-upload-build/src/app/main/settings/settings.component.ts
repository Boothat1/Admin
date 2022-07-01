import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingService } from './setting.service';
import { CommonService } from '@fuse/services/common.service';
import { MatSnackBar } from '@angular/material';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'user-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})


export class UserSettingsComponent implements OnInit {
  showPortal = false;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  pasStatus:boolean  = true;
  changePassForm = this.changePass.group({
    oldPassword:['',Validators.required],
    newPassword:['',Validators.required],
    confirmPassword:['',Validators.required],
  })
  public settingForm: FormGroup
  rupees: string;
  points: string;
  // public files: NgxFileDropEntry[] = [];
  constructor(
    public _settingService: SettingService,
    public changePass:FormBuilder,
    public _commonService:CommonService,
    public _snackbar:MatSnackBar
  ) {
   this.rupees =  localStorage.getItem('rupees')
    this.points = localStorage.getItem('points')
   }
    
  ngOnInit() {
    
    
  }
  validatePassword(){
    this.pasStatus = (this.changePassForm.get('confirmPassword').value == this.changePassForm.get('newPassword').value) || this.changePassForm.get('confirmPassword').value=='' || this.changePassForm.get('newPassword').value==''
    ;
  }
  changePassword(){
    console.log(this.changePassForm.value);
    const payload = {
      oldPassword: this.changePassForm.get('oldPassword').value,
      newPassword: this.changePassForm.get('newPassword').value
    }
    this._commonService.changePassword(payload).then((result:any)=>{
      if(result.status==200){
        this._snackbar.open(result.data,'okay',{duration:1000})
        this.changePassForm.reset()
      }
      else{
        this._snackbar.open(result.data,'okay',{duration:1000})
      }
      console.log("want to change password",result);
    })
  }
  // updateAppPoints(val){
  //   console.log("hello there",val);
    
  //   // if(!this.rupees)
  //   // this._snackbar.open('please fill rupees input first')
  //   // else if(!this.points)
  //   // this._snackbar.open('please fill points input first')
  //   if(this.points!=undefined && this.rupees!=undefined){
  //     this._commonService.updateAppPoints({rupees:this.rupees,points:this.points}).then((result:any)=>{
  //       if(result.status == 200){
  //         this._snackbar.open(result.message,'okay',{duration:2000})
  //         localStorage.setItem('points',this.points)
  //         localStorage.setItem('rupees',this.rupees)
  //       }      
  //     })
  //   }
  // }
  
}

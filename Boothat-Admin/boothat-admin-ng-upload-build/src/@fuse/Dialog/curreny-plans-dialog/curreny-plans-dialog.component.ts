import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from '@fuse/services/common.service';

@Component({
  selector: 'app-curreny-plans-dialog',
  templateUrl: './curreny-plans-dialog.component.html',
  styleUrls: ['./curreny-plans-dialog.component.scss']
})
export class CurrenyPlansDialogComponent implements OnInit {
  form  = this.fb.group({
    promoteType:[this.data.promoteType,Validators.required],
    sevenDay:[this.data.element.sevenDay,Validators.required],
    fourteenDay:[this.data.element.fourteenDay,Validators.required],
    thirtyDay:[this.data.element.thirtyDay,Validators.required],
    id:[this.data.element.id,Validators.required]
  })
  allCurrency: any;
  constructor(private fb:FormBuilder,
   private commonService:CommonService,
   @Inject(MAT_DIALOG_DATA) public data: any,) { 
    console.log("selected currrency",data);
    // this.form.get('currency_code').setValue(data.element.currency_code);
    // this.form.get('currency_name').setValue(data.element.currency_name);
    
    console.log("this.form.value",this.form.value);
  }

  ngOnInit() {
  }
  // selectedCurreny(data){
    
    
  // }
}

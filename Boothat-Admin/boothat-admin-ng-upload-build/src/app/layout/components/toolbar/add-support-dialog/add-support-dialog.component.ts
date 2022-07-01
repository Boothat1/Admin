import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Pattern } from '@fuse/utils/systemEnums';

@Component({
  selector: 'app-add-support-dialog',
  templateUrl: './add-support-dialog.component.html',
  styleUrls: ['./add-support-dialog.component.scss']
})
export class AddSupportDialogComponent implements OnInit {
  whatsAppNumber: any;
  pattern = Pattern
  constructor(
    public dialogRef: MatDialogRef<AddSupportDialogComponent>,
    private fb: FormBuilder
  ) {
    this.whatsAppNumber = localStorage.getItem('adminSupportNumber')
  }
  changeSupportForm: FormGroup;
  ngOnInit() {
    this.changeSupportForm = this.fb.group({
      whatsAppNumber: ['', [Validators.required]],
    })
    console.log(this.whatsAppNumber);
    
    this.changeSupportForm.get('whatsAppNumber').setValue(this.whatsAppNumber)
  }


}

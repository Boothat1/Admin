import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private fb: FormBuilder
  ) { }

  changePassForm: FormGroup;

  ngOnInit() {
    this.changePassForm =this.fb.group({
      oldPass:['',Validators.required],
      newPass:['',Validators.required],
      confirmPass:['',Validators.required]
    })
  }

  onChangePass(){
    console.log(this.changePassForm.value);

  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-profile-dialog',
  templateUrl: './change-profile-dialog.component.html',
  styleUrls: ['./change-profile-dialog.component.scss']
})
export class ChangeProfileDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChangeProfileDialogComponent>,
    private fb: FormBuilder
  ) { }
  
  changeProfileForm: FormGroup;
  ngOnInit() {
    this.changeProfileForm = this.fb.group({
      newName: ['', Validators.required],

    })
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-plant-dailog',
  templateUrl: './add-plant-dailog.component.html',
  styleUrls: ['./add-plant-dailog.component.scss']
})
export class AddPlantDailogComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<AddPlantDailogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    
  }
  closeDialog(){
    this.matDialogRef.close()
  }
}



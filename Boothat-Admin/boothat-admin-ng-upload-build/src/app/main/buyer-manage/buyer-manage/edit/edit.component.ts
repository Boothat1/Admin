import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { DeleteDailogComponent } from '@fuse/Dialog/delete-dailog/delete-dailog.component';
import { CommonService } from '@fuse/services/common.service';
import { Enums } from '@fuse/utils/systemEnums';
import { BuyerDetailService } from '../detail/buyerDetail.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  pasStatus: boolean = true;
  isPassFormVisibile: boolean = false;
  Enums = Enums
  singleUser: any;
  form = this.fb.group({
    id: '',
    password: ['', Validators.required],
    confirm_password: ['', Validators.required]
  })

  paramsId: any;
  pass: any;
  constructor(public commonService: CommonService,
    public detailsService: BuyerDetailService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private _fuseProgressBarService: FuseProgressBarService,
    private dailog: MatDialog
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("paramid", params.id);
      this.paramsId = params.id
      this.detailsService.getSingleUser(this.paramsId)
    })
  }
  ngOnInit() {

  }
  
  softDelete() {
    this.dailog.open(DeleteDailogComponent,{
      minHeight:'120px',
      width:'420px',
    }).afterClosed().subscribe((result: any) => {
      if (result.delete) {
        this._fuseProgressBarService.show()
        this.commonService.userDelete(this.paramsId, 1).then((result: any) => {
          if (result.status = 200) {
            this.snackbar.open(result.data.message, "Okay", { duration: 2000 })
            this.router.navigate(['/buyer-manage'])
            this._fuseProgressBarService.hide()
          }
        })
      }
    })

  }
  submit() {
    // this.form.get('id').setValue(this.singleUser.id)
    this.pass = this.form.get('password').value
    // this.form.removeControl('confirm_password')
    this._fuseProgressBarService.show()
    if (!this.form.valid || this.pasStatus == false) {
      this.snackbar.open('Form is Invalid', "Okay", { duration: 2000 })
      this._fuseProgressBarService.hide()
    } else {
      this.commonService.resetUser(this.paramsId, this.pass).then((result: any) => {
        console.log(result);
        if (result.status == 200) {
          this.snackbar.open(result.message, "Okay", { duration: 2000 })
          this.form.reset()
          this.isPassFormVisibile = false
          this._fuseProgressBarService.hide()
          // this.router.navigate(['/buyer-manage'])
        }
      })
    }

  }

  validatePassword() {
    this.pasStatus = (this.form.get('confirm_password').value == this.form.get('password').value) || this.form.get('confirm_password').value == '' || this.form.get('password').value == ''
      ;
  }
}

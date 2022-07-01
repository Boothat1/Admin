import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDailogComponent } from '@fuse/Dialog/delete-dailog/delete-dailog.component';
import { CommonService } from '@fuse/services/common.service';
import { Enums, Pattern } from '@fuse/utils/systemEnums';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements AfterViewInit {
  promoForm = this.fb.group({
    useType: ['', Validators.required],
    promoType: ['1', Validators.required],
    promoCode: ['', Validators.required],
    discount: ['', Validators.required],
  })

  pattern = Pattern
  benfitType = Enums.promoType1;
  discountType = Enums.promoType2;
  dobMax = new Date();
  paramId: any;
  editPromoData: any;
  @ViewChild('back', { static: true }) back: ElementRef;
  constructor(public _commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private _matDialog: MatDialog) {
     
      
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.id)
        console.log(params);
      this.paramId = params.id;
      this.editPromo(params.id)
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log("eeeeeeeeeeds",this.back);
  }



  submit() {

    this.promoForm.get('promoCode').setValue(this.promoForm.get('promoCode').value.toUpperCase())
    console.log(this.promoForm.get('promoCode').value);
    if (this.paramId) {
      const payload = this.promoForm.value
      payload.id = this.paramId;

      this._commonService.updatePromo(payload).then((result: any) => {
        if (result.status == 200) {
          this.snackbar.open(result.message, 'Okay', { duration: 2000 });
          this.router.navigate(['/promo-code'])
        } else {
          this.snackbar.open(result.message, 'Okay', { duration: 2000 });
        }
      })
    } else {
      this._commonService.addPromo(this.promoForm.value).then((result: any) => {
        if (result.status == 200) {
          this.snackbar.open(result.message, 'Okay', { duration: 2000 });
          this.router.navigate(['/promo-code'])
        } else {
          this.snackbar.open(result.message, 'Okay', { duration: 2000 });
        }
      })
    }

  }
  deletePromo(id) {
    this._matDialog.open(DeleteDailogComponent, {
      minHeight: '120px',
      width: '420px'
    }).afterClosed().subscribe((result: any) => {
      if (result.delete) {
        this._commonService.deletePromo(id).then((result: any) => {
          if (result.status == 200) {
            this.snackbar.open(result.message, "Okay", { duration: 2000 })
            this.router.navigate(['/promo-code'])
          } else {
            this.snackbar.open(result.message, "Okay", { duration: 2000 })
          }
        })
      }
    })
  }
  editPromo(id) {
    this._commonService.PromoDetail(id).then((result: any) => {
      console.log("edit data offer", result);
      if (result.status == 200) {
        this.editPromoData = result.data.Promo;
        this.promoForm.get('promoCode').setValue(this.editPromoData.promoCode)
        this.promoForm.get('useType').setValue(this.editPromoData.useType)
        this.promoForm.get('discount').setValue(this.editPromoData.discount)
        this.promoForm.get('promoType').setValue(this.editPromoData.promoType)
        console.log(this.editPromoData.benefitType);
      }
    })
  }

  // this flag is taken because input not returning the dot(.) value just after the numbers
  wasLastDot = false;
  percentageOnly(e) {
    if (this.promoForm.get('promoType').value === '1') {


      var oldValue: string = e.target.value;

      var newChar = String.fromCharCode(!e.charCode ? e.which : e.charCode);


      var str = "";

      if (newChar == ".") {
        if (oldValue.includes(".")) {
          //e.preventDefault();
          return false;
        }
        this.wasLastDot = true;
        return true;
      } else {
        if (this.wasLastDot) {
          str = oldValue + "." + newChar;
        } else {
          str = oldValue + newChar;
        }
        this.wasLastDot = false;
      }

      var totalLength = str.length;
      var dotPosition = str.indexOf(".");
      if (dotPosition < totalLength - 3) {
        return false;
      }

      var resultNum = Number(str);


      if (resultNum >= 0 && resultNum <= 100) {
        return true;
      }
      // e.preventDefault();
      return false;
    }
  }


  alphaNumberOnly(e) {  // Accept only alpha numerics, not special characters
    var regex = new RegExp(`^[A-Za-z0-9 ]+$`);
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if(e.charCode ==32){
      return false
    }
    if (regex.test(str)) {
      return true;
    }
    e.preventDefault();
    return false;
  }
  onPaste(e) {
    e.preventDefault();
    return false;
  }
}

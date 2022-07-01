import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { CommonService } from "@fuse/services/common.service";
import { Enums } from "@fuse/utils/systemEnums";
import { result } from "lodash";
import { OrderDetailService } from "./order-detail.service";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
  dataSource: any = [];
  displayedColumns: string[] = [
    "sr",
    "name",
    "category",
    "quantity",
    "singlePrice",
    "kwd",
  ];
  orderDetails: any;
  enum = Enums;
  orderStatus: number;
  nextStatus: any;
  statusMsg: string;
  paramId: any;
  constructor(
    private _commonService: CommonService,
    private activateRoute: ActivatedRoute,
    private router : Router,
    private snackBar: MatSnackBar,
    private _fuseProgressBarService: FuseProgressBarService,
    private orderDetailService:OrderDetailService
  ) {
    this.activateRoute.queryParams.subscribe((result) => {
      console.log("activated route id", result.id);
      this.paramId = result.id;
      if (result.id) {
        this.getDetail(result.id);
      }
    });
  }

  ngOnInit() {}

  orderStatusChange(event) {
    console.log("orderStatusChange", event);
  }
  getDetail(orderId) {
    return this._commonService.getOrderDetails(orderId).then((result: any) => {
      if (result.status == 200) {
        console.log("getOrderDetails=>", result.data);

        this.orderDetails = result.data;
        this.dataSource = this.orderDetails.product;
        this.orderStatus = this.orderDetails.order.deliveryStatus.toString();
        this.nextStatus = (
          this.orderDetails.order.deliveryStatus + 1
        ).toString();
        console.log("this.orderStatus", this.orderStatus);
      }
    });
  }

  updateOrderStatus(status, id) {
    console.log("updatedOrderStatus", parseInt(status.value));
    if (!this.statusMsg) {
      this.snackBar.open("Address is required", "Okay", { duration: 2000 });
    } else {
      this._fuseProgressBarService.show();
      this._commonService
        .changeOrderStatus(id, parseInt(status.value), this.statusMsg)
        .then((result: any) => {
          if (result.status == 200) {
            this.getDetail(this.paramId);
            this.statusMsg = "";
          }
          this._fuseProgressBarService.hide();
          this.snackBar.open(result.message, "Okay", { duration: 2000 });
        });
    }
  }

  goToDetail(obj){
    this.router.navigate(['/orders/product-detail'])
    this.orderDetailService.productObj.next(obj)
  }
}

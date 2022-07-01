import { Component, OnInit } from '@angular/core';
import { CommonService } from '@fuse/services/common.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(public commonService:CommonService) { }

  ngOnInit() {
  }

}

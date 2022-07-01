import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distributor-list-dialog',
  templateUrl: './distributor-list-dialog.component.html',
  styleUrls: ['./distributor-list-dialog.component.scss']
})
export class DistributorListDialogComponent implements OnInit {

  dataSource
  displayedColumns: string[] = ['name'];

  constructor(
    private _httpClient: HttpClient,
    public matDialogRef: MatDialogRef<DistributorListDialogComponent>,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
    console.log('--', this._data.distributors)
    this.dataSource = new MatTableDataSource(this._data.distributors);
  }

  ngOnInit() {
    // console.log(this._data.events)
  }

  onDistributorClick(id) {
    if (id) {
      this.matDialogRef.close()
      this._router.navigate(['/distributors/edit', id])
    }
  }


}

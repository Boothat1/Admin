import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AssignEventDialogService } from './assign-event-dialog.service';

@Component({
  selector: 'app-assign-event-dialog',
  templateUrl: './assign-event-dialog.component.html',
  styleUrls: ['./assign-event-dialog.component.scss']
})
export class AssignEventDialogComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    public matDialogRef: MatDialogRef<AssignEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _assignEventDialogService: AssignEventDialogService
  ) {
  }

  form: FormGroup
  get eventTypeList() {
    return this.form.controls["eventTypeList"] as FormArray;
  }

  ngOnInit() {

    this.form = this._fb.group({
      eventTypeList: this._fb.array([])
    })

    this._data.ticketType.forEach(item => {
      (this.form.controls["eventTypeList"] as FormArray).push(this.createFormRow())
    });

    console.log('assigned type', this._data.assignedTicketTypes)
    console.log('all type', this._data.ticketType)

    // if edit then set values in form
    if (this._data.assignedTicketTypes) {
      this._data.assignedTicketTypes.forEach(item => {

        let index = this._data.ticketType.findIndex(ele => { return ele.id == item.id });
        console.log('ind', index);
        if (index != -1) {
          (this.form.controls["eventTypeList"] as FormArray).controls[index].get('commission').setValue(item.commission);
          (this.form.controls["eventTypeList"] as FormArray).controls[index].get('limit').setValue(item.limit);
        }
      })
    }

  }

  onSubmit() {
    console.log('this._data.ticketType', this._data.ticketType)
    if (this._data.assignedTicketTypes) {
      //edit assigned event
      let ticketInfo = []
      this.form.value.eventTypeList.map((item, index) => {
        
        if(item.commission==''){
          item.commission=0
        }
        if(item.limit==''){
          item.limit=0
        }
          item.ticketTypeId = this._data.ticketType[index].id
          ticketInfo.push(item)
      })

      let payload = {
        distributorId: this._data.distributorId,
        eventId: this._data.eventId.toString(),
        ticketInfo: ticketInfo
      }
      this._assignEventDialogService.editAssignedEvent(payload).then(() => {
        this.matDialogRef.close(true)
      }).catch(() => {
        this.matDialogRef.close(false)
      })

    } else {
      //assign new event
      let ticketInfo = []
      this.form.value.eventTypeList.map((item, index) => {
        if (item.commission || item.limit) {
          item.ticketTypeId = this._data.ticketType[index].id
          ticketInfo.push(item)
        }
      })

      let payload = {
        distributorId: this._data.distributorId,
        eventId: this._data.eventId.toString(),
        ticketInfo: ticketInfo
      }
      this._assignEventDialogService.assignEventToDistributor(payload).then(() => {
        this.matDialogRef.close(true)
      }).catch(() => {
        this.matDialogRef.close(false)
      })
    }
  }


  onUnAssign() {
    let payload = {
      distributorId: this._data.distributorId,
      eventId: this._data.eventId.toString(),
      isAssign: 0
    }

    if (this._data.assignedTicketTypes) {
      this._assignEventDialogService.editAssignedEvent(payload).then(() => {
        this.matDialogRef.close(true)
      }).catch(() => {
        this.matDialogRef.close(false)
      })
    }
  }

  createFormRow() {
    return this._fb.group({
      commission: [''],
      limit: ['']
    })
  }

}

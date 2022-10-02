import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-staff-note',
  templateUrl: './staff-note.component.html',
  styleUrls: ['./staff-note.component.css']
})
export class StaffNoteComponent implements OnInit, OnDestroy {

  staffNoteForm: FormGroup;
  userId: any;
  staffNoteList: any = [];
  showDelete = false;
  index = 0;
  isList = false;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly el: ElementRef,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<StaffNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userId = JSON.parse(localStorage.getItem('users')).userId;
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.data.isList) {
      this.isList = this.data.isList;
      this.loadStaffNote(this.data.customerId);
    } else {
      if (this.data.row !== undefined) {
        this.customerService.loadStaffNoteById(this.data.customerId, this.data.row.id);
        this.subscriptions.add(this.customerService.getStaffNoteById().pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.setForm(response.data);
          }));
      }
    }
  }

  loadStaffNote(customerId: any) {
    this.customerService.loadStaffNoteList(customerId);
    this.subscriptions.add(this.customerService.getStaffNoteList().pipe(skipWhile((item: any) => !item))
      .subscribe((staffNote: any) => {
        if (staffNote.length > 0) {
          this.showDelete = true;
          this.staffNoteList = staffNote;
          this.setForm(staffNote[0]);
        }
      }));
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  setForm(event: any) {
    this.staffNoteForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      noteDate: [event !== undefined ? new Date(event.noteDate) : new Date()],
      note: [event !== undefined ? event.note : '',Validators.required],
      userId: [event !== undefined ? event.userId : this.userId],
      customerId: [event !== undefined ? event.customerId : this.data.customerId],
    });
  }
  next() {
    if (this.showDelete) {
      if (this.index < this.staffNoteList.length - 1) {
        this.index++;
        this.setForm(this.staffNoteList[this.index]);
      } else {
        this.index = 0;
        this.setForm(this.staffNoteList[this.index]);
      }
    }
  }

  prev() {
    if (this.showDelete) {
      if (this.index === 0) {
        this.index = this.staffNoteList.length - 1;
        this.setForm(this.staffNoteList[this.index]);
      } else {
        this.index--;
        this.setForm(this.staffNoteList[this.index]);
      }
    }
  }
  newEvent() {
    this.showDelete = false;
    this.setForm(undefined);
  }

  delete() {
    this.subscriptions.add(this.customerService.deleteStaffNoteById(this.data.customerId, this.staffNoteForm.value.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.dialogRef.close(true);
      }));
  }
  save() {
    if (this.staffNoteForm.valid) {
      this.staffNoteForm.value.noteDate = new Date(this.staffNoteForm.value.noteDate).getTime();
      if (this.data.row && this.data.row.id) {
        this.subscriptions.add(this.customerService.updateStaffNote(this.data.customerId, this.data.row.id, this.staffNoteForm.value).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close(true);
          }));
      } else {
        this.subscriptions.add(this.customerService.saveStaffNote(this.data.customerId, this.staffNoteForm.value).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close(true);
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.staffNoteForm.controls)) {
      if (this.staffNoteForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  get f() { return this.staffNoteForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}

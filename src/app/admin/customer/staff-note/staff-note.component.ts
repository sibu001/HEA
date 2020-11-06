import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';

@Component({
  selector: 'app-staff-note',
  templateUrl: './staff-note.component.html',
  styleUrls: ['./staff-note.component.css']
})
export class StaffNoteComponent implements OnInit {

  staffNoteForm: FormGroup;
  userId: any;
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
    if (this.data.row !== undefined) {
      this.customerService.loadStaffNoteById(this.data.customerId, this.data.row.id);
      this.subscriptions.add(this.customerService.getStaffNoteById().pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.setForm(response.data);
        }));
    }
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  setForm(event: any) {
    if (event !== undefined) {
      event.noteDate = this.datePipe.transform(event.noteDate, 'dd/MM/yyyy');
    }
    this.staffNoteForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      noteDate: [event !== undefined ? event.noteDate : new Date()],
      note: [event !== undefined ? event.note : ''],
      userId: [event !== undefined ? event.userId : this.userId],
      customerId: [event !== undefined ? event.customerId : this.data.customerId],
    });
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

}

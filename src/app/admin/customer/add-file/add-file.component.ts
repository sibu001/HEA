import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit, OnDestroy {

  customerFileForm: FormGroup;
  userId: any;
  customerFileList: any = [];
  showDelete = false;
  index = 0;
  isList = false;
  fileObject: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly el: ElementRef,
    public dialogRef: MatDialogRef<AddFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userId = JSON.parse(localStorage.getItem('users')).userId;
  }

  ngOnInit() {
    this.setForm(undefined);
    this.isList = this.data.isList;
    this.loadCustomerFile(this.data.customerId);
  }

  loadCustomerFile(customerId: any) {
    this.subscriptions.add(this.customerService.loadCustomerFileList(customerId).pipe(skipWhile((item: any) => !item))
      .subscribe((customerFile: any) => {
        if (customerFile.customerManagement.customerFileList.list.length > 0) {
          this.showDelete = true;
          this.customerFileList = customerFile.customerManagement.customerFileList.list;
          this.setForm(customerFile.customerManagement.customerFileList.list[0]);
        } else {
          this.setForm(undefined);
          const element: HTMLElement = document.querySelectorAll('#fileInput')[0] as HTMLElement;
          element.click();
        }
      }));
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  handle(files: any) {
    if (files.length > 0) {
      this.fileObject = files[0];
      this.customerFileForm.controls['fileName'].setValue(files[0].name);
      this.customerFileForm.controls['size'].setValue(files[0].size);
    }
  }
  setForm(event: any) {
    if (event) {
      event.originalFileName = event.fileName;
      const newArray = event.fileName.split('/');
      event.fileName = newArray[newArray.length - 1];
    }
    this.customerFileForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      timestamp: [event !== undefined ? new Date(event.timestamp) : new Date()],
      fileName: [event !== undefined ? event.fileName : '', Validators.required],
      originalFileName: [event !== undefined ? event.originalFileName : ''],
      size: [event !== undefined ? event.size : ''],
      description: [event !== undefined ? event.description : ''],
    });
  }
  next() {
    if (this.showDelete) {
      if (this.index < this.customerFileList.length - 1) {
        this.index++;
        this.setForm(this.customerFileList[this.index]);
      } else {
        this.index = 0;
        this.setForm(this.customerFileList[this.index]);
      }
    }
  }

  prev() {
    if (this.showDelete) {
      if (this.index === 0) {
        this.index = this.customerFileList.length - 1;
        this.setForm(this.customerFileList[this.index]);
      } else {
        this.index--;
        this.setForm(this.customerFileList[this.index]);
      }
    }
  }
  newEvent() {
    this.showDelete = false;
    this.customerFileList = [];
    this.setForm(undefined);
    const element: HTMLElement = document.querySelectorAll('#fileInput')[0] as HTMLElement;
    element.click();
  }

  delete() {
    this.subscriptions.add(this.customerService.deleteCustomerFileById(this.data.customerId, this.customerFileForm.controls.fileName.value).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.dialogRef.close(true);
      }));
  }

  download() {
    const url = window.location.origin + '/' + this.customerFileForm.controls.originalFileName.value + '?preview=false&fileName=Test.txt';
    window.open(url, '_blank');
  }

  view() {
    const url = window.location.origin + '/' + this.customerFileForm.controls.originalFileName.value + '?preview=true&fileName=Test.txt';
    window.open(url, '_blank');
  }
  save() {
    if (this.customerFileForm.valid) {
      if (this.data.row && this.customerFileList.length > 0) {
        this.subscriptions.add(this.customerService.updateCustomerFile(this.data.customerId, this.data.row.id,
          { 'fileName': this.customerFileForm.controls.fileName.value, 'description': this.customerFileForm.controls.description.value }).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close(true);
          }));
      } else {
        let description = '';
        if (this.customerFileForm.controls.description.value) {
          description = '?description=' + this.customerFileForm.controls.description.value;
        }
        this.subscriptions.add(this.customerService.saveCustomerFile(this.data.customerId, this.fileObject, description).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close(true);
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.customerFileForm.controls)) {
      if (this.customerFileForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  get f() { return this.customerFileForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}

import { DatePipe } from '@angular/common';
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
  showDownload = false;
  showNew = false;
  showView = false;
  errorMessage: any;
  index = 0;
  isList = false;
  fileObject: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly el: ElementRef,
    private readonly datePipe: DatePipe,
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
          this.showDownload = true;
          this.showView = true;
          this.showNew = true;
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
    this.dialogRef.close(true);
  }

  handle(files: any) {
    this.showDelete = false;
    this.showDownload = false;
    this.showView = false;
    this.showNew = false;
    this.customerFileList = [];
    this.setForm(undefined);
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
      timestamp: [event && event.timestamp ? this.datePipe.transform(new Date(event.timestamp), 'MM/dd/yyyy') : this.datePipe.transform(new Date(), 'MM/dd/yyyy')],
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
    const element: HTMLElement = document.querySelectorAll('#fileInput')[0] as HTMLElement;
    element.click();
  }

  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.subscriptions.add(this.customerService.deleteCustomerFileById(this.data.customerId, this.customerFileForm.controls.fileName.value).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.dialogRef.close(true);
        }));
    }
  }

  download() {
    const url = window.location.origin + '/hea-web/' + this.customerFileForm.controls.originalFileName.value + '?preview=false&fileName=' + this.customerFileForm.controls.fileName.value;
    window.open(url, '_blank');
  }

  view() {
    const url = window.location.origin + '/hea-web/' + this.customerFileForm.controls.originalFileName.value + '?preview=true&fileName=' + this.customerFileForm.controls.fileName.value;
    window.open(url, '_blank');
  }
  save() {
    if (this.customerFileForm.valid) {
      if (this.data.row && this.customerFileList.length > 0) {
        this.subscriptions.add(this.customerService.updateCustomerFile(this.data.customerId, this.data.row.id,
          { 'fileName': this.customerFileForm.controls.fileName.value, 'description': this.customerFileForm.controls.description.value }).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            // this.dialogRef.close(true);
            if (response.customerManagement.customerFile.errorMessage) {
              this.errorMessage = response.customerManagement.customerFile.errorMessage;
            } else {
              this.loadCustomerFile(this.data.customerId);
            }
          }));
      } else {
        let description = '';
        if (this.customerFileForm.controls.description.value) {
          description = '?description=' + this.customerFileForm.controls.description.value;
        }
        this.subscriptions.add(this.customerService.saveCustomerFile(this.data.customerId, this.fileObject, description).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            if (response.customerManagement.customerFile.errorMessage) {
              this.errorMessage = response.customerManagement.customerFile.errorMessage;
            } else {
              this.loadCustomerFile(this.data.customerId);
            }
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

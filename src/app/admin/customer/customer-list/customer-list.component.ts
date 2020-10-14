import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from 'src/app/common/table/table.component';
import { Page } from 'src/app/models/page';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public keys: any;

  public dataSource: any;
  public CustomerData = {
    content: [],
    totalElements: 0,
  };

  @ViewChild(TableComponent) tableCmp: TableComponent;

  public searchForm: FormGroup = this.fb.group({
    auditId: [''],
    customerGroup: [''],
    customerName: [''],
    customerPlace: [''],
    customerEmail: [''],
    program: [''],
    customerView: ['-1', Validators.required],
    status: [''],
    alertCode: [''],
    credentialTypeCode: [''],
    credentialSubscriptionId: [''],
    energyCoach: [''],
    credentialAccount: [''],
  });
  constructor(private loginService: LoginService, private fb: FormBuilder, private readonly router: Router) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = [
      {
        key: 'auditId',
        displayName: 'Audit Id',
        sort: 'auditId',
      },
      {
        key: 'name',
        displayName: 'Name',
        sort: 'name',
      },
      {
        key: 'links',
        displayName: 'Links',
        sort: 'links',
      },
      {
        key: 'group',
        displayName: 'Group',
      },
      {
        key: 'notes',
        displayName: 'Notes',
      },
      {
        key: 'place',
        displayName: 'Place',
      },
      {
        key: 'joinDate',
        displayName: 'Join Date',
      },
      {
        key: 'status',
        displayName: '',
      },
    ];
    this.findCustomer(null);
  }

  findCustomer(page: Page) {
    document.getElementById('loader').classList.add('loading');
    let tempData: Array<any> = new Array();
    let url = 'findCustomerList.do?filter.pageSize=10' + this.getFilterUrl();
    if (page != null) {
      url =
        'findCustomerList.do?filter.pageSize=' +
        page.pageSize +
        '&filter.startRow=' +
        page.pageIndex * page.pageSize + this.getFilterUrl();
    }
    this.loginService.performGet(url).subscribe(
      (data) => {
        document.getElementById('loader').classList.remove('loading');
        this.CustomerData.content = [];
        tempData = JSON.parse(JSON.stringify(data)).list;
        tempData.forEach((element) => {
          const temp = JSON.parse(JSON.stringify(element));
          const obj = {
            auditId: temp.auditId,
            name: temp.user.name,
            group: temp.customerGroup.groupName,
            notes: temp.notes,
            place: temp.place.placeName,
          };
          this.CustomerData.content.push(obj);
        });
        if (JSON.parse(JSON.stringify(data)).hasNext) {
          if (page != null) {
            this.CustomerData.totalElements =
              (page.pageIndex + 1) * page.pageSize + page.pageSize;
          } else {
            this.CustomerData.totalElements = 20;
          }
        } else {
          if (page != null) {
            this.CustomerData.totalElements = (page.pageIndex + 1) * page.pageSize;
          } else {
            this.CustomerData.totalElements = 10;
          }
        }
        this.dataSource = [...this.CustomerData.content];
        // this.tableCmp.refresh();
      },
      (error) => {
        document.getElementById('loader').classList.remove('loading');

      }
    );
  }


  getFilterUrl(): string {
    let url = '';
    // if (this.searchForm.controls['auditId'].value !== '') {
    url = '&filter.auditId=' + this.searchForm.controls['auditId'].value +
      '&filter.customerGroupId=' + this.searchForm.controls['customerGroup'].value
      + '&filter.customerName=' + this.searchForm.controls['customerName'].value
      + '&filter.place.place=' + this.searchForm.controls['customerPlace'].value
      + '&filter.customerEmail=' + this.searchForm.controls['customerEmail'].value
      + '&filter.programGroup.programGroupId=' + this.searchForm.controls['program'].value
      + '&customerViewConfigurationId=' + this.searchForm.controls['customerView'].value
      + '&filter.user.status' + this.searchForm.controls['status'].value
      + '&filter.eventOrAlertCode=' + this.searchForm.controls['alertCode'].value
      + '&filter.credentialTypeCode=' + this.searchForm.controls['credentialTypeCode'].value +
      '&filter.credentialSubscriptionId=' + this.searchForm.controls['credentialSubscriptionId'].value
      + '&filter.coachUserId=' + this.searchForm.controls['energyCoach'].value
      + '&filter.credentialAccount=' + this.searchForm.controls['credentialAccount'].value;
    return url;
  }

  addEvent() { }

  searchFilter() { }
  goToEditCustomer(event){
    this.router.navigate(['admin/customer/customerEdit']);
  }
}

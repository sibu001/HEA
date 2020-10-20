import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer-group',
  templateUrl: './customer-group-list.component.html',
  styleUrls: ['./customer-group-list.component.css']
})
export class CustomerGroupListComponent implements OnInit {

  public keys: any;
  public dataSource: any;
  public CustomerGroupData = {
    content: [],
    totalElements: 0,
  };
  customerGroupForm = this.fb.group({
    groupCode: [''],
    groupName: ['']
  });
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = [
      { key: 'recordId', displayName: 'Record Id' },
      { key: 'groupCode', displayName: 'Group Code', sort: 'groupCode' },
      { key: 'groupName', displayName: 'Group Name', sort: 'groupName' },
      { key: 'registrationUrl', displayName: 'Registration Url' },
      { key: 'baseDirectory', displayName: 'Base Directory', sort: 'baseDirectory' },
      { key: 'auditIdPattern', displayName: 'Audit Id Pattern' }
    ];
    this.findCustomerGroup(null);
  }

  findCustomerGroup(e) {

  }

  gotoEditCustomerGroup(e) {

  }

  addCustomerGroup() {

  }

}

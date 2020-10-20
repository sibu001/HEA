import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer-group',
  templateUrl: './program-group-list.component.html',
  styleUrls: ['./program-group-list.component.css']
})
export class ProgramGroupListComponent implements OnInit {

  public keys: any;
  public dataSource: any;
  public CustomerGroupData = {
    content: [],
    totalElements: 0,
  };
  programGroupForm = this.fb.group({
    programCode: [''],
    programName: ['']
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
      { key: 'auditIdPattern', displayName: 'Audit Id Pattern', type: 'image', imagePath: 'assets/images/icon_check_orange.png' }
    ];
    this.findProgramGroup(null);
  }

  findProgramGroup(e) {

  }

  gotoEditProgramGroup(e) {

  }

  addProgramGroup() {

  }

}

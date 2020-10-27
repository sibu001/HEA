import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public rolesData = {
    content: [],
    totalElements: 0,
  };
  constructor(public router: Router) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.ROLE_KEY;
    this.findRole(null);
    
  }

  findRole(event: any): any {

  }

  goToEditRole(event: any): any {
    this.router.navigate(['admin/role/roleEdit']);
  }

  onImageClickEvent(event: any): any {

  }

  addEvent(): any {
    this.router.navigate(['admin/role/roleEdit']);
  }
}

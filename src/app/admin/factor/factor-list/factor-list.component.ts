import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-factor-list',
  templateUrl: './factor-list.component.html',
  styleUrls: ['./factor-list.component.css']
})
export class FactorListComponent implements OnInit {

  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public rolesData = {
    content: [],
    totalElements: 0,
  };
  public placeData: Array<any> = TableColumnData.PLACE_CODE;

  factorForm: FormGroup = this.fb.group({
    factorCode: [''],
    place: [''],
    isActive: [''],
    year: [''],
    name: ['']
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.FACTOR_KEY;
    this.findPlace();
  }

  findPlace(event?: any): any {

  }

  goToEditPlace(event: any): any {
    this.router.navigate(['/admin/factor/factorEdit']);
  }

  onImageClickEvent(event: any): any {

  }

  addPlace(): any {
    this.router.navigate(['/admin/factor/factorEdit']);
  }
}

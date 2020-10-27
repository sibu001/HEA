import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public rolesData = {
    content: [],
    totalElements: 0,
  };

  placeForm: FormGroup = this.fb.group({
    placeName: [''],
    zipCode: ['']
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.PLACE_LIST_KEY;
    this.findPlace();
  }

  findPlace(event?: any): any {

  }

  goToEditPlace(event: any): any {
    this.router.navigate(['/admin/place/placeEdit']);
  }

  onImageClickEvent(event: any): any {

  }

  addPlace(): any {
    this.router.navigate(['/admin/place/placeEdit']);
  }

}

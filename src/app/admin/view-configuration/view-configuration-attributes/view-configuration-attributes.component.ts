import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-view-configuration-attributes',
  templateUrl: './view-configuration-attributes.component.html',
  styleUrls: ['./view-configuration-attributes.component.css']
})
export class ViewConfigurationAttributesComponent implements OnInit {
  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public attributeData = {
    content: [],
    totalElements: 0,
  };
  constructor(public router: Router, public fb: FormBuilder, public location: Location) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.ATTRIBUTE_LIST_KEYS;
    this.findAttribute();
  }

  findAttribute(): any { }


  addAttributes(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationAttributeEdit']);
  }

  goToEditAttributes(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationAttributeEdit'], { queryParams: { id: this.id } });
  }

  back(): any {
    this.location.back();
  }
}

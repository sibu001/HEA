import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-water-smart-meter',
  templateUrl: './water-smart-meter.component.html',
  styleUrls: ['./water-smart-meter.component.css']
})
export class WaterSmartMeterComponent implements OnInit {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.SMART_METER_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public data = {
    content: [],
    totalElements: 0,
  };
  myDataForm: FormGroup = this.fb.group({
    auditId: this.fb.control(['']),
    customerName: this.fb.control(['']),
    year: this.fb.control(['']),
    month: this.fb.control([''])
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.findWater();
  }

  findWater(event?: any): any { }

  goToEditWater(event: any): any { }

}

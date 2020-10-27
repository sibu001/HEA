import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { ZipCodeEditComponent } from '../zip-code-edit/zip-code-edit.component';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent implements OnInit {

  public keys: TABLECOLUMN[];
  public dataSource: any;
  public rolesData = {
    content: [],
    totalElements: 0,
  };

  placeForm: FormGroup;
  constructor(private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly location: Location) { }

  ngOnInit() {
    this.keys = TableColumnData.ZIP_CODE_KEY;
    this.setForm();
  }


  findZipcode(event: any): any {

  }

  goToEditZipcode(event: any): any {
    const dialogRef = this.dialog.open(ZipCodeEditComponent, {
      width: '500px',
      height: 'auto',
      data: { event }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

  onImageClickEvent(event: any): any {

  }


  setForm(event?: any) {
    this.placeForm = this.fb.group({
      placeCode: [event !== undefined ? event.placeCode : ''],
      placeName: [event !== undefined ? event.placeName : ''],
      stationId: [event !== undefined ? event.stationId : ''],
      timeZone: [event !== undefined ? event.timeZone : ''],
      latitude: [event !== undefined ? event.latitude : ''],
      longitude: [event !== undefined ? event.longitude : ''],
    });
  }
  back() {
    this.location.back();
  }

  addZipCode(): any {
    const dialogRef = this.dialog.open(ZipCodeEditComponent, {
      width: '500px',
      height: 'auto',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }
}

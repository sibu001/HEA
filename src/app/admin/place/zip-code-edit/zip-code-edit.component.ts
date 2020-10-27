import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-zip-code-edit',
  templateUrl: './zip-code-edit.component.html',
  styleUrls: ['./zip-code-edit.component.css']
})
export class ZipCodeEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ZipCodeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

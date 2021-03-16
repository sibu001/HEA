import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit, OnDestroy {
  message: string;
  constructor(
    public dialogRef: MatDialogRef<ShowInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = this.data.message;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.dialogRef.close();
  }
}

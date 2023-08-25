import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppUtility } from 'src/app/utility/app.utility';

@Component({
  selector: 'app-summary-chart-defination-copy',
  templateUrl: './summary-chart-defination-copy.component.html',
  styleUrls: ['./summary-chart-defination-copy.component.css']
})
export class SummaryChartDefinationCopyComponent implements OnInit {

  copyForm : FormGroup;
  constructor( 
    private readonly formBuilder : FormBuilder,
    private readonly dialogRef: MatDialogRef<SummaryChartDefinationCopyComponent>,
    ){ }

  ngOnInit() {
    this.setForm(undefined);
  }

  setForm(event){
    this.copyForm = this.formBuilder.group({
      newChartCode :['',Validators.required],
    })
  }

  save(){
    this.dialogRef.close(this.copyForm.value);
  }

  highlightErrorField(formContorlName : string){
    return AppUtility.showErrorMessageOnErrorField(this.copyForm.controls,formContorlName);
  }

  close(){
    this.dialogRef.close(undefined) 
  }

}

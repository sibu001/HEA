import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-survey-dialogbox',
  templateUrl: './survey-dialogbox.component.html',
  styleUrls: ['./survey-dialogbox.component.css']
})
export class SurveyDialogboxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SurveyDialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public surveyAnswer: any
  ) { }

  ngOnInit() {
  }

  close(surveyAnswer: any) {
    this.dialogRef.close(surveyAnswer);
  }

  save(){
    this.surveyAnswer.action = 'save';
    this.close(this.surveyAnswer);
  }

  cancle(){
    this.surveyAnswer.action = 'cancle';
    if(this.surveyAnswer.indexValue == 0)
      this.dialogRef.close(undefined);

      
    if(confirm('Are you sure you want to delete?'))
      this.close(this.surveyAnswer);
    else
      this.dialogRef.close(undefined);
  }
}

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

  save(formEvent : any){
    console.log(formEvent);
    if(formEvent.form.status != 'INVALID'){
      this.surveyAnswer.action = 'save';
      this.close(this.surveyAnswer);
    }
    
  }

  dropdownDefaultSelection(surveyAnswerValue : any){
    surveyAnswerValue.value = surveyAnswerValue.value? surveyAnswerValue.value : surveyAnswerValue.dataField.fieldValues[0].value
    return true;
  }

  cancle(){
    this.surveyAnswer.action = 'cancle';
    if(this.surveyAnswer.indexValue == 0)
      this.dialogRef.close(undefined);

      
    if(this.surveyAnswer.creation && confirm('Are you sure you want to delete?'))
      this.close(this.surveyAnswer);
    else
      this.dialogRef.close(undefined);
  }
}

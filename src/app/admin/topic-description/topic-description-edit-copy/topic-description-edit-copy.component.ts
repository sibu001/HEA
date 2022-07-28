import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-topic-description-edit-copy',
  templateUrl: './topic-description-edit-copy.component.html',
  styleUrls: ['./topic-description-edit-copy.component.css']
})
export class TopicDescriptionEditCopyComponent implements OnInit {
  
  copyForm : FormGroup;
  
  constructor(
    private dialog: MatDialogRef<TopicDescriptionEditCopyComponent>,
    private formBuilder : FormBuilder
  ) { }


  ngOnInit() {
    this.setForm(undefined);
  }

  setForm(event : any){
     this.copyForm = this.formBuilder.group({
      nextTopicCode : ['',Validators.required],
      prefix : ['',Validators.required]
     });
  }

  save(form: any) {
    this.dialog.close(this.copyForm.value);
  }
  
  close(){
     this.dialog.close();
  }
}

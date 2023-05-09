import { Component, OnInit } from '@angular/core';
import { s } from '@angular/core/src/render3';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppUtility } from 'src/app/utility/app.utility';

@Component({
  selector: 'app-topic-description-pane-copy',
  templateUrl: './topic-description-pane-copy.component.html',
  styleUrls: ['./topic-description-pane-copy.component.css']
})
export class TopicDescriptionPaneCopyComponent implements OnInit {

  copyForm : FormGroup;
  topicDataSource = [];
  private readonly subscriptions: Subscription = new Subscription();

  constructor(
    private readonly dialogRef: MatDialogRef<TopicDescriptionPaneCopyComponent>,
    private readonly formBuilder : FormBuilder,
    private readonly topicService : TopicService
  ) { }

  ngOnInit() {
   this.setForm(undefined); 
    this.getDataFromStore();
    const self = this;
    setTimeout(() =>{
      if(self.topicDataSource.length == 0)
        this.findTopicDescription(true,{});
    },100)
  }

  setForm(event){
    this.copyForm = this.formBuilder.group({
      topicDescription : [''],
      paneCode :['',Validators.required],
      prefixDataField :['',Validators.required]
    })
  }

  findTopicDescription(force: boolean, filter: any): void {
    this.topicService.loadAllPossibleTopicDescriptionList(force);
  }

  getDataFromStore(){
    this.subscriptions.add(  this.topicService.getAllPossibletopicDescriptionList()
    .pipe(skipWhile((item: any) => !item))
    .subscribe((topicDescriptionList: any) => {
      this.topicDataSource = [...topicDescriptionList];
      this.copyForm.patchValue({topicDescription : this.topicDataSource[0].id})
    }));
  }

  save(){
    if(AppUtility.validateAndHighlightReactiveFrom(this.copyForm))
      this.dialogRef.close(this.copyForm.value);
  }

  highlightErrorField(formContorlName : string){
    return AppUtility.showErrorMessageOnErrorField(this.copyForm.controls,formContorlName);
  }

  close(){
    this.dialogRef.close(undefined) 
  }
}

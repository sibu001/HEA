import { Component, OnInit } from '@angular/core';
import { s } from '@angular/core/src/render3';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';

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
      paneCode :[''],
      prefixDataField :['']
    })
  }

  findTopicDescription(force: boolean, filter: any): void {
    this.topicService.loadTopicDescriptionList(force, filter);
  }

  getDataFromStore(){
    this.subscriptions.add(this.topicService.getTopicDescriptionList()
    .pipe(skipWhile((item: any) => !item))
    .subscribe((topicDescriptionList: any) => {
      this.topicDataSource = [...topicDescriptionList];
      this.copyForm.patchValue({topicDescription : this.topicDataSource[0].id})
    }));
  }

  save(){
    this.dialogRef.close(this.copyForm.value);
  }

  close(){
    this.dialogRef.close(undefined) 
  }
}

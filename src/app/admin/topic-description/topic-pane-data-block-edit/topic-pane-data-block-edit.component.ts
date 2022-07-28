import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-topic-pane-data-block-edit',
  templateUrl: './topic-pane-data-block-edit.component.html',
  styleUrls: ['./topic-pane-data-block-edit.component.css']
})
export class TopicPaneDataBlockEditComponent implements OnInit, OnDestroy {
  id: any;
  paneId : any;
  topicDescriptionId : any;
  dataBlockData: any;
  variableForm: FormGroup;
  dataFieldKeys: TABLECOLUMN[];
  dataFieldData = {
    content: [],
    totalElements: 0
  };
  dataFieldDataSource: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly topicService : TopicService,
    private readonly activateRoute: ActivatedRoute,
    private readonly utilityService : UtilityService,
    private readonly loginService: LoginService,
    private readonly location: Location,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.paneId = params['paneId'];
      this.topicDescriptionId = params['topicDescriptionId'];
    });
    this.setForm(undefined);
    if(this.id){
      this.getDataBlockById();
      this.loadDataBlockById();
    }
  }


  ngOnInit() {
    this.scrollTop();
    this.dataFieldKeys = TableColumnData.PANE_DATA_FIELD_KEY;
  }

  scrollTop() {
    window.scroll(0,0);
  }

  setForm(event: any): any {
    this.variableForm = this.formBuilder.group({
      blockCode: [event !== undefined ? event.blockCode : '', Validators.required],
      orderNumber: [event !== undefined ? event.orderNumber : '10'],
      label: [event !== undefined ? event.label : '', Validators.required],
      reportLabel: [event !== undefined ? event.reportLabel : '', Validators.required],
      array: [event !== undefined ? event.array : ''],
      minRows: [event !== undefined ? event.minRows : ''],
      maxRows: [event !== undefined ? event.maxRows : ''],
      showFirstRows: [event !== undefined ? event.showFirstRows : ''],
      allowTotalRemoving: [event !== undefined ? event.allowTotalRemoving : ''],
    });
  }


  loadDataBlockById(){
    this.topicService.loadDataBlockById(this.id,this.paneId);
  }

  getDataBlockById(){
    this.subscriptions.add(
      this.topicService.getDataBlockByPaneId()
      .subscribe(
        dataBlock => {
          this.dataBlockData = dataBlock;
          this.setForm(dataBlock);
        }, error =>{
          console.error(error);
        }     
        ))
  }

  back(): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionPaneEdit'],{queryParams : { id : this.paneId, topicDescriptionId : this.topicDescriptionId }})
  }

  save(): any {
    document.getElementById('loader').classList.add('loading');
    const body = Object.assign(this.dataBlockData ? this.dataBlockData : {},this.variableForm.value)
    this.subscriptions.add(
      this.loginService.performPost(body,AppConstant.pane + '/' + this.paneId + '/' + AppConstant.dataBlock)
      .subscribe(
        response =>{
          document.getElementById('loader').classList.remove('loading');
            this.id = response.id;
            this.dataBlockData = response;
            this.router.navigate([],
              {
                relativeTo: this.activateRoute,
                queryParams: {id : response.id},
                queryParamsHandling : 'merge'
               });
            this.ngOnInit();
        }, error =>{
          document.getElementById('loader').classList.remove('loading');
          console.error(error);
          this.utilityService.showErrorMessage(error.error.errorMessage);
        }
      )
    )

  }
  delete(): any {
    document.getElementById('loader').classList.add('loading');
    this.subscriptions.add(
      this.loginService.performDelete(
        AppConstant.pane + '/' + this.paneId + '/' + AppConstant.dataBlock + '/' + this.dataBlockData.id)
        .subscribe(
          response => {
            document.getElementById('loader').classList.remove('loading');
            this.back();
          }, error =>{
            document.getElementById('loader').classList.remove('loading');
            console.error(error);
            this.utilityService.showErrorMessage(error.error.errorMessage);          }
        )
    )
  }

  get f() { return this.variableForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}

import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { LoginService } from 'src/app/services/login.service';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { ProspectsEditComponent } from '../prospects-edit/prospects-edit.component';

@Component({
  selector: 'app-prospects-list',
  templateUrl: './prospects-list.component.html',
  styleUrls: ['./prospects-list.component.css']
})
export class ProspectsListComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.PROSPECTS_KEY;
  public coachIdList: any = [];
  public dataSource: any;
  public totalElement = 0;
  public selectedProspectListIds : any;
  public prospectsData = {
    content: [],
    totalElements: 0,
    pageIndex: 0
  };
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  prospectsForm: FormGroup;
  pageSize = AppConstant.pageSize;
  @ViewChild('tableHeading') tableHeading: ElementRef;
  constructor(public fb: FormBuilder,
    public dialog: MatDialog,
    private readonly administrativeService: AdministrativeService,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly loginService: LoginService) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.findCoachId();
    this.setUpForm(undefined);
    this.search('', false);
    this.getDataFromStore();
  }

  addProspects(event: any) {
    const dialogRef = this.dialog.open(ProspectsEditComponent, {
      width: '75vw',
      height: '70vh',
      data: event,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.search(undefined, true);
      }
    });
  }

  setUpForm(event: any) {
    this.prospectsForm = this.fb.group({
      source: [event !== undefined && event !== null ? event.source : ''],
      email: [event !== undefined && event !== null ? event.email : ''],
      name: [event !== undefined && event !== null ? event.name : ''],
      page: [event !== undefined && event !== null ? event.page : ''],
      coachUserId: [event !== undefined && event !== null ? event.coachUserId : ''],
      subscriptionId: [event !== undefined && event !== null ? event.subscriptionId : ''],
      auditId: [event !== undefined && event !== null ? event.auditId : ''],
      zip: [event !== undefined && event !== null ? event.zip : ''],
    });
  }

  findProspects(force: boolean, filter: any): void {
    this.administrativeService.loadProspectsList(force, filter);
  }

  getDataFromStore(){
    this.subscriptions.add(this.administrativeService.getProspectsList().pipe(skipWhile((item: any) => !item))
    .subscribe((prospectsList: any) => {
      this.prospectsData.content = [...prospectsList.list];
      this.prospectsData.totalElements = prospectsList.totalSize;
      this.prospectsData.pageIndex = parseInt(prospectsList.startOfCurrentPage/Number.parseInt(this.pageSize) + "");
      this.dataSource = this.prospectsData.content;
      this.tableHeading.nativeElement.scrollIntoView({behavior: 'smooth', inline : 'start'});
    }));
  }

  findCoachId() {
    this.systemService.loadCoachUserList(true, '?filter.withRole=COACH');
    this.subscriptions.add(this.systemService.getCoachUserList().pipe(skipWhile((item: any) => !item))
      .subscribe((coachUserList: any) => {
        this.coachIdList = coachUserList.list;
        this.coachIdList.splice(0,0,{ name : "Unassigned", "userId" : -1})
      }));
  }

  getAllSelectedProspects(event){
    this.selectedProspectListIds = "";
    event.forEach((item: any) =>{
        this.selectedProspectListIds = this.selectedProspectListIds + item.id + ','
    })
    this.selectedProspectListIds = this.selectedProspectListIds.substring(0,this.selectedProspectListIds.length-1);
  }

  deleteProspectsById(){

    if(!confirm('Are you sure you want to delete?')){
      return;
    }
    
    if(!this.selectedProspectListIds)
      return;

      this.subscriptions.add(
        this.administrativeService.deleteProspectListByIds(this.selectedProspectListIds)
        .pipe(skipWhile((item: any) => !item))
        .subscribe(
          response =>{
            this.selectedProspectListIds = undefined;
            this.search(undefined,true);
          }
        )
      )
  }

  downlodCSV(){

    let param =  this.createParamsForRequest(undefined,true,false);
    document.getElementById('loader').classList.add('loading');
    param =  param.delete('pageSize');
    param =  param.append('pageSize','');
    this.subscriptions.add(
      this.loginService.performGetForBlob('registrations/csv',param)
        .subscribe(
          (response: any) =>{
            document.getElementById('loader').classList.remove('loading');

            let fileName = response.headers.get('Content-Disposition').split(';')[1].split('=')[1]; 
            let blob: Blob = response.body as Blob;
            let a = document.createElement('a');
            a.download = fileName;
            a.href = window.URL.createObjectURL(blob);
            a.click();
              
          }, (error)=>{
            console.error(error);
          } )
    ); 
  }

  search(event: any, isSearch: boolean): void {
    
    let sortOrder = false;

    if (event && event.sort.direction !== undefined) {
      if (event.sort.direction === 'asc') {
        sortOrder = true;
      }
    }

    if(event && event.sort && event.sort.active == "coachUserName")
      event.sort.active = "coachUserId";

    const params = this.createParamsForRequest(event, isSearch,sortOrder);
    this.findProspects(true, params);
  }

  createParamsForRequest(event, isSearch , sortOrder){
    return new HttpParams()
    .set('disableTotalSize', 'false')
    .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : AppConstant.pageSize)
    .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      (event.pageIndex * event.pageSize) + '' : '0'))
    .set('sortOrders[0].propertyName', (event && event.sort.active != '' && event.sort.active !== undefined ? event.sort.active : 'createdDate'))
    .set('sortOrders[0].asc', sortOrder + '')
    .set('field6Like', this.prospectsForm.value.page !== undefined ?  this.prospectsForm.value.page : '')
    .set('source', this.prospectsForm.value && this.prospectsForm.value.source !== undefined ? this.prospectsForm.value.source : '')
    .set('emailLike', this.prospectsForm.value && this.prospectsForm.value.email !== undefined ? this.prospectsForm.value.email : '')
    .set('auditId', this.prospectsForm.value && this.prospectsForm.value.auditId !== undefined ? this.prospectsForm.value.auditId : '')
    .set('namePart1', this.prospectsForm.value && this.prospectsForm.value.name !== undefined ? this.prospectsForm.value.name : '')
    .set('zip', this.prospectsForm.value && this.prospectsForm.value.zip !== undefined ? this.prospectsForm.value.zip : '' )
    .set('coachUserId' , this.prospectsForm.value && this.prospectsForm.value.coachUserId !== undefined ? this.prospectsForm.value.coachUserId : '')
    .set('subscriptionId', this.prospectsForm.value && this.prospectsForm.value.subscriptionId !== undefined ? this.prospectsForm.value.subscriptionId : '')
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}

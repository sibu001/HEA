import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
  AfterViewChecked,
  QueryList,
  OnDestroy,
} from '@angular/core';
import { Page } from '../../models/page';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable, Sort, SortDirection } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { SelectionModel } from '@angular/cdk/collections';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime, take } from 'rxjs/operators';
import { AppConstant } from 'src/app/utility/app.constant';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
  active: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked, OnDestroy {
  displayedColumns = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @Input() data: any;
  @Input() pageSize : any;
  @Input() totalElement: any;
  @Input() pageIndex: any;
  @Input() keys: any;
  @Input() id: any;
  @Input() sideBorder = false;
  @Input() sortOrder = 'asc';
  @Input() defaultSortColumn : string = undefined;
  @Input() action = false;
  @Input() checkbox = false;
  @Input() isSearch = false;
  @Input() isDelete = false;
  @Input() isPaginate = false;
  @Input() isHideAdd = false;
  @Input() showDeleteButton = false;
 // @Input() showFixButton: boolean = false;
  // @Input() showCSVExportButton = false;
  @Input() suggestionList = [];
  @Input() isFilePreview = false;
  @Input() showInlineTableForm = false;
  @Input() editableInlineTableForm : boolean = false;
  @Input() showAddRowButton = false;
  @Input() showAddInputButton = false;
  @Input() isShowHeader = true;
  @Input() isInlineEdit = false;
  @Input() selectionList: Array<any> = [];
  @Input() sortStateData: any;
  @Input() disableLastButton = false;
  @Input() disableNextButton;
  @Input() showSuggestionList = false;
  @Input() pushedData: any;
  @Input() showRowLoader = false;
  @Input() showPushedDataPerRow = false;
  @Input() hideMasterCheckBox = false;
  @Input() verticalScrollWidth : string = undefined;
  @Input() addSerialNumber : boolean = false;
  @Output() singleSelectedRow : EventEmitter<any> = new EventEmitter();
  @Output() changePageEvent: EventEmitter<any> = new EventEmitter();
  @Output() changeActionMenuItem: EventEmitter<any> = new EventEmitter();
  @Output() suggestionListEvent : EventEmitter<any> = new EventEmitter();
  @Output() goToEditEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() imageEvent: EventEmitter<any> = new EventEmitter();
  @Output() saveNewRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() inputChangeEvent: EventEmitter<any> = new EventEmitter();
  @Output() filePreviewEvent: EventEmitter<any> = new EventEmitter();
  @Output() addEvent: EventEmitter<any> = new EventEmitter();
  @Output() addRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() bulkDeleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() checkBoxChangeEvent: EventEmitter<any> = new EventEmitter();
  @Output() toggleSaveButtonEvent: EventEmitter<any> = new EventEmitter();
  @Output() addNewRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() saveRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() buttonListEvent: EventEmitter<any> = new EventEmitter();
  @Output() handleLinkEvent: EventEmitter<any> = new EventEmitter();
  @Output() handleInLineEditEvent: EventEmitter<any> = new EventEmitter();
  @Output() fixGaps: EventEmitter<any> = new EventEmitter();
  @Output() handleInLineSaveEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild('paginator') paginator : ElementRef;
  @ViewChild('paginator') matPaginator : MatPaginator;
  @ViewChild('inputSuggestionField') inputSuggestionField;
  inputFormFields = false;
  addDataObjectList = [];
  expandedElement: any = [];
  showInput = false;
  showRowInput = false;
  page = new Page();
  url: string;
  users : Users = new Users();
  totalLength: number;
  pageIndexNumber = 0;
  pageEvent: PageEvent;
  selection = new SelectionModel<any>(true, []);
  selectionOptional = new SelectionModel<any>(true, []);
  tableForm: FormGroup = this.formBuilder.group({});
  tableValueFormArray = new FormArray([]);
  alterTable = false;
  subscriptions : Subscription = new Subscription();
  pushedDataArrayPerRow = new Array<any>();
  showTableLoaderButton : boolean = false;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  constructor(
    private ElByClassName: ElementRef,
    private readonly loginService : LoginService,
    private changeDetectorRefs: ChangeDetectorRef,  
    private formBuilder: FormBuilder
  ) { }

  ngAfterViewChecked(): void {
    if(this.disableNextButton == true){
      if(this.pageIndex < 0) this.matPaginator.pageIndex = 0;
       else this.matPaginator.pageIndex = this.pageIndex;
    }
  }

  ngOnInit() {
    this.users = this.loginService.getUser();
    this.changeDetectorRefs.detectChanges();
    const list = document.getElementsByClassName('mat-paginator-range-label');
    if (list.length > 0) {
      list[0].remove();
    }
  }

  changeSort(sortState: any) {
    if (sortState) {
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    }
  }

  ngAfterViewInit() {
    this.sort.start = this.sortOrder as 'asc' | 'desc';
    this.page.sort.direction = this.sortOrder as 'asc' | 'desc';
    
    if(this.showSuggestionList == true){
      this.subscriptions.add(
        fromEvent(this.inputSuggestionField.nativeElement,'keyup')
        .pipe(
          debounceTime(AppConstant.debounceTime)
        ).subscribe((response : any) =>{
            this.applyFilter(this.inputSuggestionField.nativeElement.value);}))
    }

    this.disableLastButtonF();
    this.disableNextButtonF();

    // const wrapper = document.getElementsByClassName('mat-button-wrapper');
    // for (let i = 0; i < wrapper.length; i += 4) {
    //   wrapper[i].innerHTML = 'First';
    //   wrapper[i + 1].innerHTML = 'Previous';
    //   wrapper[i + 2].innerHTML = 'Next';
    //   wrapper[i + 3].innerHTML = 'Last';
    // }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.pushedDataArrayPerRow = new Array<any>(this.data.length);
      this.inputFormFields = false;
      this.addDataObjectList = this.data;
      this.selection.clear();
      this.data = changes['data'].currentValue;
      // this.totalLength = this.totalElement;
      if (this.pageIndex !== undefined && this.pageIndex !== null) {
        this.pageIndexNumber = this.pageIndex;
      }
      this.showRowInput = false;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true;

      setTimeout(()=>{
        const matSortHeader = document.querySelector('mat-header-cell[aria-sort]');
        if(matSortHeader){
          matSortHeader.setAttribute('aria-sort','');
        } },1000);

    }


    if (changes['keys'] && changes['keys'].currentValue) {
      this.keys = changes['keys'].currentValue;
      this.displayedColumns = this.keys.map((col) => col.key);
      if(this.addSerialNumber){
        this.displayedColumns.unshift('srNo.');
      }
      if (this.checkbox) {
        this.displayedColumns.unshift('select');
      }                                                        
      if (this.isDelete) {
        this.displayedColumns.push('delete');
      }
    }

    if(this.selection && this.selectionList.length > 0) {
      this.selection = new SelectionModel<any>(true, []);
      this.selectionList.forEach(e => {
        this.dataSource.data.forEach((row) => {
          if (e === row[this.id]) {
            this.selection.select(row);
            this.checkBoxChange();
          }
        });
      });
    }

    if(!this.pageSize)
    this.pageSize = AppConstant.pageSize;

    this.setForm();
    if (this.isInlineEdit) {
      this.setExistingDataForm();
    }

    this.disableLastButtonF();
    this.disableNextButtonF();
  

    
    if(changes['pushedData'] && changes['pushedData'].currentValue ) {
      this.showTableLoaderButton = true;
      if( (this.pushedData && this.pushedData.dataFileList && this.pushedData.dataFileList.length ) ||
      this.pushedData.error ){
        this.alterTable = true;
      } else {
        this.alterTable = false;
      }
    }
  }

  disableLastButtonF(){
    if(this.disableLastButton == true){
      var btnElement = (<HTMLButtonElement>this.ElByClassName.nativeElement).querySelector(
        '.mat-paginator-navigation-last'
        );
        if(btnElement != null)
          btnElement.remove();
    }
  }

  disableNextButtonF(){
      var btnElement = (<HTMLFieldSetElement>this.ElByClassName.nativeElement).querySelector(
        '.mat-paginator-navigation-next'
        );
        if(btnElement != null){
          if(this.disableNextButton == true){
            btnElement.setAttribute('disabled', 'true');
          } else if (this.disableNextButton == false) {
            btnElement.removeAttribute('disabled');
          }
        }
  }

  setForm() {
    if (this.keys !== undefined) {
      this.keys.forEach(key => {
        this.tableForm.addControl(key.key, this.formBuilder.control(''));
        if (key.required) {
          this.tableForm.controls[key.key].setValidators(Validators.required);
        }
      });
    }
  }

  setExistingDataForm() {
    if (this.dataSource !== undefined) {
      this.dataSource.data.forEach(data => {
        const tempForm: FormGroup = this.formBuilder.group({});
        if (this.keys !== undefined) {
          this.keys.forEach(key => {
            console.log(key);
            tempForm.addControl(key.key, this.formBuilder.control(data[key.key]));
            if (key.required) {
              this.tableForm.controls[key.key].setValidators(Validators.required);
            }
          });
        }
        data.tableForm = tempForm;
      });
    }
  }

  editColumn(col: any, row: any) {
    this.handleInLineEditEvent.emit({ col, row });
  }
  saveColumn(col: any, row: any) {
    this.handleInLineSaveEvent.emit({ col, row });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // DataSource defaults to lowercase matches
    this.page.search = filterValue;
    this.suggestionListEvent.emit(this.page);
    this.changeDetectorRefs.detectChanges();
  }

  onChangePage(event?: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.pageIndex = event.pageIndex;
    // this.pageIndex = this.page.pageIndex;
    this.page.sortRequest = false;
    this.changePageEvent.emit(this.page);
    this.changeDetectorRefs.detectChanges();
  }

  sortData(event?: Sort) {
    this.page.sort = event;
    // this.page.pageIndex = 0;
    this.page.pageIndex = this.pageIndex;
    this.page.pageSize = this.pageSize;
    this.page.sortRequest = true;
    this.changePageEvent.emit(this.page);
  }

  onClickMenuItem(item: any, row: any) {
    this.changeActionMenuItem.emit({ item: item, row: row });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource !== undefined ? this.dataSource.data.length : 0;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  removeDeletedItemFromTheSelection(){
    let selectedList = this.selection.selected;
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1
      }`;
  }

  checkBoxChange(): any {
    this.checkBoxChangeEvent.emit(this.selection.selected);
  }

  singleSelectedEvent(event : any, isChecked : boolean){
    event.isCheckedCheckbox = isChecked;
    this.singleSelectedRow.emit(event);
  }

  checkBoxChangeOptional(event: any, row: any) {
    
    // changed for customer-view  email settings tables and mail-descriptions topic groups table 
    
    // const i = this.dataSource.data.findIndex((item: any) => item.groupCode === row.groupCode);
    // if (i !== -1) {
    //   this.dataSource.data[i].optional = event.checked; 
    // }
    row.optional = event.checked;
    this.checkBoxChangeEvent.emit(row);
  }

  refresh() {
    this.changeDetectorRefs.detectChanges();
  }

  goToEdit(event: any, col: any): any {

    if( col.type == "inputField"){
  
      // check weather the form is editabl or not.
      if(!this.editableInlineTableForm) return null;

    // added specially for the field values edit table inside the data-field screen.
      this.dataSource.data.forEach(data =>{
        if(data.id != event.id)
          data.showInputFields = undefined;
      });
      event.showInputFields = true;

    }

    if (col.isEdit ) {
      event.col = col;
      this.goToEditEvent.emit(event);
    }
  }

  fixGap(event: any, col: any) {
    this.fixGaps.emit(event);
  }


  deleteRow(event: any) {
      this.deleteEvent.emit(event);
  }

  imageClickEvent(col, row) {
    this.imageEvent.emit({ key: col.key, eventType: col.event, row: row, col: col });
  }

  onSaveNewRowEvent(col: any, row: any) {
    this.saveNewRowEvent.emit({ row: row, col: col, data: this.dataSource });
  }

  inputChange(col: any, row: any) {
    this.inputChangeEvent.emit({ row: row, col: col, data: this.dataSource });
  }

  filePreview(event: any) {
    this.filePreviewEvent.emit(event);
  }

  linkCall(routerLink: any, queryParam: any, col: any) {
    const event = {
      routeLink: routerLink,
      queryParam: queryParam,
      value: col
    };
    this.handleLinkEvent.emit(event);
    // this.router.navigate([routerLink], { queryParams: queryParam });
  }

  onButtonEvent(event: any, col: any, row: any , buttonEvent : any) {
    const obj = {
      buttonType: event,
      column: col,
      row: row
    };
    if(this.showRowLoader == true) {
        this.pushedData = [];
        this.alterTable = false;
        this.showTableLoaderButton = false;
        let loaderDiv = document.getElementById('loader1');
        buttonEvent.target.style.visibility = 'hidden';
        loaderDiv.classList.add('row-loader-visibility');
    }
    this.buttonListEvent.emit(obj);
  }

  onAddEvent(event: any): any {
    this.addEvent.emit(event);
    if(this.inputFormFields == false && this.showInlineTableForm){
      const pushedObj = {showInputFields : true, index : this.data.length};
      this.data.push(pushedObj);
      this.dataSource = new MatTableDataSource(this.data);
      this.inputFormFields = true;
    }
  }


  addRow(event : any){
    this.addRowEvent.emit(event);
    let item = this.dataSource.data.find(res => res.id == event.id)
    if(!item){
      item = this.dataSource.data[this.dataSource.data.length - 1];
    }

    this.keys.forEach((data) =>{
      // replacing the to the actual value when input field type is select.
      if(data.addRowType == 'select'){
        // option list contains object in form { id , key , value} 
        // id is for identification, key is to be passed under the selction, value the label displayed as option
        item[data.key] = data.option.find(opt => opt.id == item[data.key]).value;
      };
    });

    item.showInputFields = undefined;
    item.disabled = true
  }

  onAddRowEvent(): any {
    this.showInput = true;
    this.toggleSaveButtonEvent.emit();
  }

  onAddNewRowEvent() {
    this.showRowInput = true;
    this.addNewRowEvent.emit();
  }

  validateAllFormFields(formGroup: FormGroup): any {
    let flag = true;
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        if (this.tableForm.get(field).invalid && flag) {
          document.getElementById(field).focus();
          flag = false;
        }
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  saveRow(): any {
    if (this.tableForm.valid) {
      this.saveRowEvent.emit(this.tableForm);
      this.toggleSaveButtonEvent.emit();
      this.tableForm.reset();
      this.showInput = false;
    } else {
      this.validateAllFormFields(this.tableForm);
    }

  }
  onDeleteEvent(): any {
    this.bulkDeleteEvent.emit(this.selection.selected);
  }

  logRow(row) {
  }
  get f() { return this.tableForm.controls; }

  ngOnDestroy(): void {
   SubscriptionUtil.unsubscribe(this.subscriptions);
  }
 
}

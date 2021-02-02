import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { Page } from '../../models/page';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
export class TableComponent implements OnInit, OnChanges {
  displayedColumns = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @Input() data: any;
  @Input() totalElement: any;
  @Input() pageIndex: any;
  @Input() keys: any;
  @Input() id: any;
  @Input() sideBorder: Boolean = false;
  @Input() action: Boolean = false;
  @Input() checkbox: Boolean = false;
  @Input() isSearch: Boolean = false;
  @Input() isDelete: Boolean = false;
  @Input() isPaginate: Boolean = false;
  @Input() isHideAdd: Boolean = false;
  @Input() showDeleteButton: Boolean = false;
  @Input() showCSVExportButton: Boolean = false;
  @Input() isFilePreview: Boolean = false;
  @Input() showAddRowButton: Boolean = false;
  @Input() showAddInputButton: Boolean = false;
  @Input() isShowHeader: Boolean = true;
  @Input() isInlineEdit: Boolean = false;
  @Input() selectionList: Array<any> = [];
  @Output() changePageEvent: EventEmitter<any> = new EventEmitter();
  @Output() changeActionMenuItem: EventEmitter<any> = new EventEmitter();
  @Output() goToEditEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() imageEvent: EventEmitter<any> = new EventEmitter();
  @Output() saveNewRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() inputChangeEvent: EventEmitter<any> = new EventEmitter();
  @Output() filePreviewEvent: EventEmitter<any> = new EventEmitter();
  @Output() addEvent: EventEmitter<any> = new EventEmitter();
  @Output() bulkDeleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() checkBoxChangeEvent: EventEmitter<any> = new EventEmitter();
  @Output() toggleSaveButtonEvent: EventEmitter<any> = new EventEmitter();
  @Output() addNewRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() saveRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() buttonListEvent: EventEmitter<any> = new EventEmitter();
  @Output() handleLinkEvent: EventEmitter<any> = new EventEmitter();
  @Output() handleInLineEditEvent: EventEmitter<any> = new EventEmitter();
  @Output() handleInLineSaveEvent: EventEmitter<any> = new EventEmitter();
  expandedElement: any = [];
  showInput: Boolean = false;
  showRowInput: Boolean = false;
  page = new Page();
  url: String;
  totalLength: Number;
  pageIndexNumber = 0;
  pageEvent: PageEvent;
  selection = new SelectionModel<any>(true, []);
  selectionOptional = new SelectionModel<any>(true, []);
  tableForm: FormGroup = this.formBuilder.group({});
  tableValueFormArray = new FormArray([]);
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.changeDetectorRefs.detectChanges();
    const list = document.getElementsByClassName('mat-paginator-range-label');
    if (list.length > 0) {
      list[0].remove();
    }
    const wrapper = document.getElementsByClassName('mat-button-wrapper');
    for (let i = 0; i < wrapper.length; i += 4) {
      wrapper[i].innerHTML = 'First';
      wrapper[i + 1].innerHTML = 'Previous';
      wrapper[i + 2].innerHTML = 'Next';
      wrapper[i + 3].innerHTML = 'Last';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.data = changes['data'].currentValue;
      this.totalLength = this.totalElement;
      if (this.pageIndex !== undefined && this.pageIndex !== null) {
        this.pageIndexNumber = this.pageIndex;
      }
      this.showRowInput = false;
      this.dataSource = new MatTableDataSource(this.data);
      if (this.selectionList.length > 0) {
        this.selectionList.forEach(e => {
          this.dataSource.data.every((row) => {
            if (e === row[this.id]) {
              this.selection.select(row);
              this.checkBoxChange();
              return false;
            } else {
              return true;
            }
          });
        });
      }
    }
    if (changes['keys'] && changes['keys'].currentValue) {
      this.keys = changes['keys'].currentValue;
      this.displayedColumns = this.keys.map((col) => col.key);
      if (this.checkbox) {
        this.displayedColumns.unshift('select');
      }
      if (this.isDelete) {
        this.displayedColumns.push('delete');
      }
    }
    this.setForm();
    if (this.isInlineEdit) {
      this.setExistingDataForm();
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
    this.changePageEvent.emit(this.page);
    this.changeDetectorRefs.detectChanges();
  }

  onChangePage(event?: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.pageIndex = event.pageIndex;
    this.changePageEvent.emit(this.page);
    this.changeDetectorRefs.detectChanges();
  }

  sortData(event?: Sort) {
    this.page.sort = event;
    this.changePageEvent.emit(this.page);
    // this.changeDetectorRefs.detectChanges();
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

  checkBoxChangeOptional(event: any, row: any) {
     const i = this.dataSource.data.findIndex((item: any) => item.groupCode === row.groupCode);
     if (i !== -1) {
      this.dataSource.data[i].optional = event.checked;
     }
     this.checkBoxChangeEvent.emit(this.selection.selected);
  }

  refresh() {
    this.changeDetectorRefs.detectChanges();
  }

  goToEdit(event: any, col: any): any {
    if (col.isEdit) {
      event.col = col;
      this.goToEditEvent.emit(event);
    }
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

  onButtonEvent(event: any, col: any, row: any) {
    const obj = {
      buttonType: event,
      column: col,
      row: row
    };
    this.buttonListEvent.emit(obj);
  }

  onAddEvent(event: any): any {
    this.addEvent.emit(event);
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
}

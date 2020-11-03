import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { Page } from '../../models/page';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
})
export class TableComponent implements OnInit, OnChanges {
  displayedColumns = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @Input() data: any;
  @Input() totalElement: any;
  @Input() keys: any;
  @Input() sideBorder: Boolean = false;
  @Input() action: Boolean = false;
  @Input() checkbox: Boolean = false;
  @Input() isSearch: Boolean = false;
  @Input() isDelete: Boolean = false;
  @Input() isPaginate: Boolean = false;
  @Input() isHideAdd: Boolean = false;
  @Input() showDeleteButton: Boolean = false;
  @Input() showAddRowButton: Boolean = false;
  @Output() changePageEvent: EventEmitter<any> = new EventEmitter();
  @Output() changeActionMenuItem: EventEmitter<any> = new EventEmitter();
  @Output() goToEditEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() imageEvent: EventEmitter<any> = new EventEmitter();
  @Output() addEvent: EventEmitter<any> = new EventEmitter();
  @Output() bulkDeleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() checkBoxChangeEvent: EventEmitter<any> = new EventEmitter();
  @Output() toggleSaveButtonEvent: EventEmitter<any> = new EventEmitter();
  @Output() saveRowEvent: EventEmitter<any> = new EventEmitter();

  showInput: Boolean = false;
  page = new Page();
  url: String;
  totalLength: Number;
  pageEvent: PageEvent;
  selection = new SelectionModel<any>(true, []);
  tableForm: FormGroup = this.formBuilder.group({});
  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.changeDetectorRefs.detectChanges();
    // }

    // ngAfterViewChecked() {
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
    console.log('onChange method call in common table component');
    if (changes['data'] && changes['data'].currentValue) {
      this.data = changes['data'].currentValue;
      console.log('data', this.data);
      this.totalLength = this.totalElement;
      this.dataSource = new MatTableDataSource(this.data);
      this.loadPagination();
    }
    if (changes['keys'] && changes['keys'].currentValue) {
      this.keys = changes['keys'].currentValue;
      console.log('keys', this.keys);
      this.displayedColumns = this.keys.map((col) => col.key);
      if (this.checkbox) {
        this.displayedColumns.unshift('select');
      }
      if (this.isDelete) {
        this.displayedColumns.push('delete');
      }
    }
    this.setForm();
  }

  setForm() {
    if (this.keys !== undefined) {
      this.keys.forEach(key => {
        this.tableForm.addControl(key.key, this.formBuilder.control('', Validators.required));
      });
    }
  }
  loadPagination() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    console.log(filterValue);
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
    console.log(event);
    this.page.sort = event;
    this.changePageEvent.emit(this.page);
    this.changeDetectorRefs.detectChanges();
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
  refresh() {
    this.changeDetectorRefs.detectChanges();
  }

  goToEdit(event: any, col: any): any {
    if (col.isEdit) {
      console.log(event);
      this.goToEditEvent.emit(event);
    }
  }

  deleteRow(event: any) {
    console.log(event);
    this.deleteEvent.emit(event);
  }

  imageClickEvent(col, row) {
    this.imageEvent.emit({ key: col.key, eventType: col.event, row: row });
  }


  linkCall(routerLink, queryParam) {
    this.router.navigate([routerLink], { queryParams: queryParam });
  }

  onAddEvent(event: any): any {
    this.addEvent.emit(event);
  }

  onAddRowEvent(): any {
    this.showInput = true;
    this.toggleSaveButtonEvent.emit();
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
    } else {
      this.validateAllFormFields(this.tableForm);
    }
  }
  onDeleteEvent(): any {
    this.bulkDeleteEvent.emit(this.selection.selected);
  }

  logRow(row) {
    console.log(row);
  }
  get f() { return this.tableForm.controls; }
}

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
  @Output() onChangePageEvent: EventEmitter<any> = new EventEmitter();
  @Output() onChangeActionMenuItem: EventEmitter<any> = new EventEmitter();
  @Output() goToEditCustomer: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() onImageEvent: EventEmitter<any> = new EventEmitter();
  @Output() onAddEvent: EventEmitter<any> = new EventEmitter();
  @Output() onBulkDeleteEvent: EventEmitter<any> = new EventEmitter();

  page = new Page();
  url: String;
  totalLength: Number;
  pageEvent: PageEvent;
  selection = new SelectionModel<any>(true, []);

  constructor(private changeDetectorRefs: ChangeDetectorRef, private router: Router) { }
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
  }

  loadPagination() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    console.log(filterValue);
    this.page.search = filterValue;
    this.onChangePageEvent.emit(this.page);
    this.changeDetectorRefs.detectChanges();
  }

  onChangePage(event?: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.pageIndex = event.pageIndex;
    this.onChangePageEvent.emit(this.page);
    this.changeDetectorRefs.detectChanges();
  }

  sortData(event?: Sort) {
    console.log(event);
    this.page.sort = event;
    this.onChangePageEvent.emit(this.page);
    this.changeDetectorRefs.detectChanges();
  }

  onClickMenuItem(item: any, row: any) {
    this.onChangeActionMenuItem.emit({ item: item, row: row });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
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

  refresh() {
    this.changeDetectorRefs.detectChanges();
  }

  goToEdit(event: any, col) {
    if (col.isEdit) {
      console.log(event);
      this.goToEditCustomer.emit(event);
    }
  }

  deleteRow(event: any) {
    console.log(event);
    this.onDeleteEvent.emit(event);
  }

  imageClickEvent(col, row) {
    this.onImageEvent.emit({ key: col.key, eventType: col.event, row: row });
  }


  linkCall(routerLink, queryParam) {
    this.router.navigate([routerLink], { queryParams: queryParam });
  }

  addEvent(event: any): any {
    this.onAddEvent.emit(event);
  }

  deleteEvent(): any {
    this.onBulkDeleteEvent.emit(this.selection.selected);
  }

  logRow(row){
    console.log(row);
  }
}

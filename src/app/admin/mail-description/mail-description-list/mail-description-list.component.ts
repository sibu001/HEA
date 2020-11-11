import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-mail-description-list',
  templateUrl: './mail-description-list.component.html',
  styleUrls: ['./mail-description-list.component.css']
})
export class MailDescriptionListComponent implements OnInit {
  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public mailData = {
    content: [],
    totalElements: 0,
  };
  filter = false;
  cache = false;
  periodData: any[] = TableColumnData.PERIOD_DATA;
  mailForm: FormGroup = this.fb.group({
    subject: this.fb.control(''),
    isActive: this.fb.control(''),
    mailPeriod: this.fb.control(''),
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.MAIL_DESC_KEYS;
    this.findMailDescription();
  }

  findMailDescription(event?: any): any { }

  addMailDescriptions(): any {
    this.router.navigate(['/admin/mailDescription/mailDescriptionEdit']);
  }

  goToEditMailDescriptions(): any {
    this.router.navigate(['/admin/mailDescription/mailDescriptionEdit'], { queryParams: { id: this.id } });
  }
  search(): any { }

  disableFilter(): any {
    this.filter = !this.filter;
  }

  disableValueCache(): any {
    this.cache = !this.cache;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() showMethod: Boolean = false;
  @Input() showDetails: Boolean = false;
  apiURL = environment.webBaseUrl;
  methodName = [];
  constructor() { }

  ngOnInit() {
  }

}

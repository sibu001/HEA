import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Filter } from '../models/filter';

@Component({
  selector: 'mailArchiveView',
  templateUrl: './mailArchiveView.component.html',
  styleUrls: ['./mailArchiveView.component.css']
})
export class mailArchiveViewComponent implements OnInit {
  urls = window.location.origin + 'surveyView';
  iframeHide: boolean;
  subject: string;
  sendDate: string;
  address: string;
  isBounced: string;
  wasOpened: string;
  users: Users = new Users();
  filter: Filter = new Filter();
  constructor(private location: Location, private loginService: LoginService) {
    this.users = this.loginService.getUser();
    this.subject = this.users.mailDetail.subject;
    this.sendDate = this.users.mailDetail.dateSent;
    this.address = this.users.mailDetail.sentTo;
    this.isBounced = this.users.mailDetail.inBouncedList ? '*' : '';
    this.wasOpened = this.users.mailDetail.wasOpened ? '*' : '';
  }

  ngOnInit() {
  }
  back() {
    this.location.back();
  }
  urlOpen(id) {
    document.getElementById('loader').classList.add('loading');
    if (id == 1) {
      this.users.paneNumber = 1;
      this.loginService.setUser(this.users);
      this.iframeHide = true;
      this.urls = window.location.origin + 'surveyView';
      setTimeout(function () {
        document.getElementById('loader').classList.remove('loading');
      }, 1000);
    }
  }
}

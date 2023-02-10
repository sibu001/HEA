import { AppConstant } from './../utility/app.constant';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Filter } from '../models/filter';

@Component({
  selector: 'mailArchiveView',
  templateUrl: './mailArchiveView.component.html',
  styleUrls: ['./mailArchiveView.component.css']
})
export class mailArchiveViewComponent implements OnInit, AfterViewInit {
  urls = window.location.origin + 'surveyView';
  iframeHide: boolean;
  subject: string;
  sendDate: string;
  address: string;
  isBounced: string;
  iframeHeight : string = '650px';
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
  ngAfterViewInit(): void {
    const iFrame = document.getElementById('ifrmMailContent') as HTMLIFrameElement;
    iFrame.contentDocument.body.innerHTML = this.users.mailContent;
    this.iframeHeight = iFrame.contentWindow.document.body.scrollHeight + 20 + 'px';  

    this.scrollTop();

    if(this.users.role == 'USERS' && (this.users.mailDetail.sentTo == this.users.outhMeResponse.user.email || 
      this.users.mailDetail.sentTo == this.users.outhMeResponse.user.username ) && !this.wasOpened)
      this.markedCurrentMailAsOpened();
  }

  markedCurrentMailAsOpened(){
      this.loginService.performPost('',AppConstant.customer + '/' + this.users.mailDetail.customerId
       + '/mails' + '/' + this.users.mailDetail.mailArchiveId+ '/markAsOpened')
      .subscribe(
        data =>{
          console.log(data);
        }, error =>{
          console.log(error);
        }
      )
  }

  scrollTop(){
    window.scrollTo(0,0);
  }

  ngOnInit() {
  }
  back() {
    this.location.back();
  }
  urlOpen(id) {
    document.getElementById('loader').classList.add('loading');
    if (id === 1) {
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

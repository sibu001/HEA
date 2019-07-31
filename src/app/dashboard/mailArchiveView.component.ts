import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { Users } from "src/app/models/user";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: 'mailArchiveView',
  templateUrl: './mailArchiveView.component.html',
  styleUrls: ['./mailArchiveView.component.css']
})
export class mailArchiveViewComponent implements OnInit {
  urls: string = "http://localhost:4200/#/surveyView";
  iframHide: boolean;
  subject:string;
  sendDate:string;
  addresh:string;
  users: Users = new Users();
  constructor(private location: Location, private loginService: LoginService) {
    this.users = this.loginService.getUser();
    this.subject=this.users.mailDetail.subject;
    this.sendDate=this.users.mailDetail.dateSent;
    this.addresh=this.users.mailDetail.sentTo;
  }

  ngOnInit() {

  }
  back() {
    this.location.back();
  }
  urlOpen(id) {
    document.getElementById("loader").classList.add('loading');
    if (id == 1) {
     this.users.paneNumber=1;
      this.loginService.setUser(this.users);
      this.iframHide = true;
      this.urls = "http://localhost:4200/#/surveyView";
      setTimeout(function () {
        document.getElementById("loader").classList.remove('loading');
      }, 1000);
    }
  }
}
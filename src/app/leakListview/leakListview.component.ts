import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ElementRef, ViewChild, Renderer } from "@angular/core";
import { Users } from "src/app/models/user";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";
import { CommonModule ,NgStyle} from '@angular/common';

declare var $: any;
@Component({
  selector: 'leaklistview',
  templateUrl: './leakListview.component.html',
  styleUrls: ['./leakListview.component.css']
})
export class leakListViewComponent implements OnInit, AfterViewInit {
  // @ViewChild('inp1') inp1: ElementRef;
  // @ViewChild('inp2') inp2: ElementRef;
  // @ViewChild('inp3') inp3: ElementRef;
  // @ViewChild('inp4') inp4: ElementRef;
  // @ViewChild('inp5') inp5: ElementRef;
  // @ViewChild('inp6') inp6: ElementRef;
  users: Users = new Users();
  constructor(private location: Location, private router: Router, private element: ElementRef, private renderer: Renderer, private loginService: LoginService) {
    this.users = this.loginService.getUser();
    for(var i=0;i<this.users.leakList.length;i++){
      this.users.leakList[i].flag=true;
    }
    console.log(this.users.leakList);
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    // switch (this.users.leakFocusNo) {
    //   case 1: this.renderer.invokeElementMethod(this.inp1.nativeElement, 'focus'); $("inp2").scrollTop();
    //     break;
    //   case 2: this.renderer.invokeElementMethod(this.inp2.nativeElement, 'focus');
    //     break;
    //   case 3: this.renderer.invokeElementMethod(this.inp3.nativeElement, 'focus');
    //     break;
    //   case 4: this.renderer.invokeElementMethod(this.inp4.nativeElement, 'focus');
    //     break;
    //   case 5: this.renderer.invokeElementMethod(this.inp5.nativeElement, 'focus');
    //     break;
    //   case 6: this.renderer.invokeElementMethod(this.inp6.nativeElement, 'focus');
    //     break;
    //   default: this.renderer.invokeElementMethod(this.inp1.nativeElement, 'focus');
    // }
  }
  back() {
    this.location.back();
  }
  surveyRecommendationList(number) {
    this.users.recomandationNo = number;
    this.loginService.setUser(this.users);
    this.router.navigate(["/surveyRecommendationList"]);

  }
  leakHelp(id,priceValue,takebackValue,takebackLabel){
    this.sendMailForHelp(priceValue,takebackValue,takebackLabel);
    this.users.leakList[id].flag=false;
  }

    sendMailForHelp(priceValue,takebackValue,takebackLabel) {
      var containt="toAddress=support@hea.com&fromAddress="+this.users.outhMeResponse.user.email+"&subject=Request for Leak help, audit "+this.users.outhMeResponse.auditId+"&subjectCharset=utf-8&bodyContent=Leak:"+takebackLabel+" <br> Size:"+takebackValue+" watts and $"+priceValue+" wasted a year <br> User: "+this.users.outhMeResponse.user.name+" "+this.users.outhMeResponse.user.email+" "+this.users.outhMeResponse.phoneNumber+"&bodyCharset=utf-8&contentType=text/html";
      this.loginService.performGetMultiPartData("sendMail.do?"+containt).subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        console.log(response);
        document.getElementById("loader").classList.remove('loading');
      },
      errors => {
        console.log(errors);
        let response = JSON.parse(JSON.stringify(errors))._body;
        document.getElementById("loader").classList.remove('loading');
      }
    );
  }
}
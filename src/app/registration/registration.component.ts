import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
email:string;
pgeUsername:string;
pgePassword:string;
phone:string;
check:any;
validEmail:string;
validUsername:string;
validPassword:string;
validPhone:string;
validCondition:string;
  constructor() { }

  ngOnInit() {
  }
allLinks(i){
  if(i==1){
window.open('https://hea-docs.s3.amazonaws.com/heaTerms.htm');
  }else if(i==2){
 window.open('https://hea-docs.s3.amazonaws.com/pgeInstructions.htm');
  }else if(i==3){
 window.open('https://hea-docs.s3.amazonaws.com/pgeAccountUse.htm');
  }else if(i==4){
 window.open('https://hea-docs.s3.amazonaws.com/heaFAQ.htm');
  }
}

registration(){
  let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
if(this.email==undefined||this.email.length==0||!EMAIL_REGEXP.test(this.email)){
this.validEmail="Valid mail is mandatory!";
}else{
  this.validEmail=undefined;
}
if(this.pgeUsername==undefined||this.pgeUsername.length==0){
this.validUsername="Username is mandatory!";
}else{
  this.validUsername=undefined;
}
if(this.pgePassword==undefined||this.pgePassword.length==0){
this.validPassword="Password is mandatory!";
}else{
  this.validPassword=undefined;
}
if(this.phone==undefined||this.phone.length==0){
this.validPhone="Phone is mandatory!";
}else{
  this.validPhone=undefined;
}
if(!this.check){
this.validCondition="terms and conditions is mandatory!";
}else{
  this.validCondition=undefined;
} 
if(this.validEmail==undefined&&this.validUsername==undefined&&this.validPassword==undefined&&this.validPhone==undefined&&this.check){
  console.log("login successfull");
}

}

}

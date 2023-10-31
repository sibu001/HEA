import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class forgotpasswordComponent implements OnInit {
  users: Users = new Users();
  errorMessageEmail: string;
  errorMessageCode: string;
  emailSentSuccessfully = false;
  emailNotFound = false;
  errorMessage : string;

  email: string;
  code: string;
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    window.scrollTo(0,0);
    
  }
  // login() {
  //   if (this.email === undefined || this.email.length === 0) {
  //     this.errorMessageEmail = 'Valid E-Mail is mandatory!';
  //   }else {
  //     this.errorMessageEmail = undefined;
  //   }
  //   if (this.code === undefined || this.code.length === 0) {
  //     this.errorMessageCode = 'Security code is mandatory!';
  //   } else {
  //     this.errorMessageCode = undefined;
  //  }
  //   if (this.errorMessageEmail === undefined && this.errorMessageCode === undefined) {
  //     console.log('forgot');
  //   }
  // }


  login() {
    this.errorMessageEmail = ''; 
    this.emailNotFound = false; 

    if (this.email === undefined || this.email.length === 0 || !this.validateEmail(this.email)) {
      this.errorMessageEmail = 'Invalid E-Mail!';
    }
    else {
      const params = new HttpParams()
      .append('email',this.email)
     
      this.loginService.performPostWithParam({},'/free'+'/users'+'/password'+'/restoreLink',params)
      .subscribe(
        data =>{
        this.emailSentSuccessfully = true;
        },error =>{
          console.log(error);
          this.emailNotFound = true;
          this.errorMessage= error.error.errorMessage;

          
        }
      )
    }
   
  }
  registration() {
    this.router.navigate(['registration']);
  }

  validateEmail(email:string):boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(pattern.test(email)) {
      return true;
    }else{
      return false;
    }
 }
  

}

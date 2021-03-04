import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class forgotpasswordComponent implements OnInit {
  users: Users = new Users();
  errorMessageEmail: string;
  errorMessageCode: string;

  email: string;
  code: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  login() {
    if (this.email === undefined || this.email.length === 0) {
      this.errorMessageEmail = 'Valid E-Mail is mandatory!';
    } else {
      this.errorMessageEmail = undefined;
    }
    if (this.code === undefined || this.code.length === 0) {
      this.errorMessageCode = 'Security code is mandatory!';
    } else {
      this.errorMessageCode = undefined;
    }
    if (this.errorMessageEmail === undefined && this.errorMessageCode === undefined) {
      console.log('forgot');
    }
  }
  registration() {
    this.router.navigate(['registration']);
  }

}

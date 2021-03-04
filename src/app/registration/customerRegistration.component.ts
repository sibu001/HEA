import { Component, OnInit, ContentChild, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/models/user';
import { LoginService } from './../services/login.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './customerRegistration.component.html',
  styleUrls: ['./customerRegistration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  hideSoCal = false;
  showSoCal = true;
  checkBox: boolean;
  users: Users = new Users();
  errorMessage: string;
  show = true;
  hide = false;
  theme: string;
  @ContentChild('showhideinput') input;
  @ViewChild('inp1') inp1: ElementRef;
  constructor(private router: Router, private route: ActivatedRoute, private renderer: Renderer, private loginService: LoginService) {
    this.users = this.loginService.getUser();
  }

  ngOnInit() {
    this.renderer.invokeElementMethod(this.inp1.nativeElement, 'focus');
    this.route.queryParams.subscribe(params => {
      this.theme = params['theme'] || null;
    });
    if (this.theme == null) {
      this.theme = 'HEA';
    }
    this.users.theme = this.theme;
  }

  login() {
    if (this.users.email === undefined || this.users.email.length === 0) {
      this.errorMessage = 'Valid mail is mandatory!';
    } else if (this.users.username === undefined || this.users.username.length === 0) {
      this.errorMessage = 'Username is mandatory!';
    } else if (this.users.password === undefined || this.users.password.length === 0) {
      this.errorMessage = 'Password is mandatory!';
    } else if (this.users.phone === undefined || this.users.phone === null) {
      this.errorMessage = 'Phone is mandatory!';
    } else if (!this.checkBox) {
      this.errorMessage = 'Accepting terms is mandatory!';
    } else {
      const object = {
        'customerGroupCode': this.users.theme,
        'credentialTypeCode': 'smd',
        'utilityUsername': this.users.username,
        'utilityPassword': this.users.password,
        'mail': this.users.email,
        'phone': this.users.phone
      };
      document.getElementById('loader').classList.add('loading');
      this.loginService.performPost(object, 'customers/register').subscribe(
        data => {
          const response = JSON.parse(JSON.stringify(data));
          console.log(response);
          if (response.errors == null) {
            if (response.existingUser) {
              document.getElementById('loader').classList.remove('loading');
              this.errorMessage = response.errors[0].defaultMessage;
            } else {
              document.getElementById('loader').classList.remove('loading');
              this.router.navigate(['/customerRegistrationSuccessView']);
            }
          } else {
            document.getElementById('loader').classList.remove('loading');
            this.errorMessage = response.errors[0].defaultMessage;
          }
        },
        errors => {
          const response = JSON.parse(JSON.stringify(errors))._body;
          document.getElementById('loader').classList.remove('loading');
          console.log(response);
          console.log(response.error);
          this.errorMessage = response.error;
        });
    }
  }

  allLinks(i: any) {
    if (i === 1) {
      window.open('https://hea-docs.s3.amazonaws.com/heaTerms.htm');
    } else if (i === 2) {
      window.open('https://hea-docs.s3.amazonaws.com/pgeInstructions.htm');
    } else if (i === 3) {
      window.open('https://hea-docs.s3.amazonaws.com/pgeAccountUse.htm');
    } else if (i === 4) {
      window.open('https://hea-docs.s3.amazonaws.com/heaFAQ.htm');
    } else if (i === 5) {
      window.open('https://hea-docs.s3.amazonaws.com/p4pFAQ.htm');
    } else if (i === 6) {
      window.open('https://hea-docs.s3.amazonaws.com/sceInstructions.htm');
    } else if (i === 7) {
      window.open('https://hea-docs.s3.amazonaws.com/sceAccountUse.htm');
    }
  }
  registration() {
    this.router.navigate(['customerRegistration']);
  }
  toggleShow() {
    this.show = !this.show;
    this.hide = !this.hide;
  }
  toggleShowSoCal() {
    this.showSoCal = !this.showSoCal;
    this.hideSoCal = !this.hideSoCal;
  }
}

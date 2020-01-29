import { Component, OnInit, ContentChild, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from "src/app/models/user";
import { LoginService } from './../services/login.service';
import { Http } from "@angular/http";
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './customerRegistration.component.html',
  styleUrls: ['./customerRegistration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  hideSoCal: boolean = false;
  showSoCal: boolean = true;
  checkBox: boolean;
  users: Users = new Users();
  errorMessage: string;
  show: boolean = true;
  hide: boolean = false;
  theme: string;
   @ViewChild('inp1') inp1: ElementRef;
  constructor(private router: Router, private route: ActivatedRoute, private renderer: Renderer, private _http: Http, private loginService: LoginService) {
    this.users = this.loginService.getUser();
  }


  ngOnInit() {
    this.renderer.invokeElementMethod(this.inp1.nativeElement, 'focus');
    this.route.queryParams.subscribe(params => {
      this.theme = params['theme'] || null;
    });
    if (this.theme == null) {
      this.theme = "HEA";
    }
    this.users.theme = this.theme;


    // var SearchInput = $('#Search');
    // SearchInput.val(SearchInput.val());
    // var strLength = SearchInput.val().length;
    // SearchInput.focus();
    // SearchInput[0].setSelectionRange(strLength, strLength);

    // // this.query="{'theme':'"+this.theme+"'}";
    // //  console.log(this.query);
    // Array.prototype.forEach.call(document.body.querySelectorAll("*[data-mask]"), applyDataMask);

    // function applyDataMask(field) {
    //   var mask = field.dataset.mask.split('');

    //   // For now, this just strips everything that's not a number
    //   function stripMask(maskedData) {
    //     function isDigit(char) {
    //       return /\d/.test(char);
    //     }
    //     return maskedData.split('').filter(isDigit);
    //   }

    //   // Replace `_` characters with characters from `data`
    //   function applyMask(data) {
    //     return mask.map(function (char) {
    //       if (char != '_') return char;
    //       if (data.length == 0) return char;
    //       return data.shift();
    //     }).join('')
    //   }

    //   function reapplyMask(data) {
    //     return applyMask(stripMask(data));
    //   }

    //   function changed() {
    //     var oldStart = field.selectionStart;
    //     var oldEnd = field.selectionEnd;

    //     field.value = reapplyMask(field.value);

    //     field.selectionStart = oldStart;
    //     field.selectionEnd = oldEnd;
    //   }

    //   field.addEventListener('click', changed)
    //   field.addEventListener('keyup', changed)
    // }
  }
  @ContentChild('showhideinput') input;
  login() {
    if (this.users.email == undefined || this.users.email.length == 0) {
      this.errorMessage = "Valid mail is mandatory!";
    } else if (this.users.username == undefined || this.users.username.length == 0) {
      this.errorMessage = "Username is mandatory!";
    } else if (this.users.password == undefined || this.users.password.length == 0) {
      this.errorMessage = "Password is mandatory!";
    }else if (this.users.phone==undefined||this.users.phone==null) {
      this.errorMessage = "Phone is mandatory!";
    }  else if (!this.checkBox) {
      this.errorMessage = "Accepting terms is mandatory!";
    } else {
      var object = {
        "customerGroupCode": this.users.theme,
        "credentialTypeCode": "smd",
        "utilityUsername": this.users.username,
        "utilityPassword": this.users.password,
        "mail": this.users.email,
        "phone": this.users.phone
      };
      document.getElementById("loader").classList.add('loading');
      this.loginService.performPost(object, "customers/register").subscribe(
        data => {
          let response = JSON.parse(JSON.stringify(data));
          console.log(response);
          if (response.errors == null) {
            if (response.existingUser) {
              document.getElementById("loader").classList.remove('loading');
              this.errorMessage = response.errors[0].defaultMessage;
            } else {
              document.getElementById("loader").classList.remove('loading');
              this.router.navigate(['/customerRegistrationSuccessView']);
            }
          } else {
            document.getElementById("loader").classList.remove('loading');
            this.errorMessage = response.errors[0].defaultMessage;
          }
        },
        errors => {
          let response = JSON.parse(JSON.stringify(errors))._body;
          document.getElementById("loader").classList.remove('loading');
          console.log(response);
          console.log(response.error);
          // document.getElementById("loader").classList.remove('loading');
          this.errorMessage = response.error;
        }
      );

    }
  }
  allLinks(i) {
    if (i == 1) {
      window.open('https://hea-docs.s3.amazonaws.com/heaTerms.htm');
    } else if (i == 2) {
      window.open('https://hea-docs.s3.amazonaws.com/pgeInstructions.htm');
    } else if (i == 3) {
      window.open('https://hea-docs.s3.amazonaws.com/pgeAccountUse.htm');
    } else if (i == 4) {
      window.open('https://hea-docs.s3.amazonaws.com/heaFAQ.htm');
    } else if (i == 5) {
      window.open('https://hea-docs.s3.amazonaws.com/p4pFAQ.htm');
    } else if (i == 6) {
      window.open('https://hea-docs.s3.amazonaws.com/sceInstructions.htm');
    } else if (i == 7) {
      window.open('https://hea-docs.s3.amazonaws.com/sceAccountUse.htm');
    } else if (i == 8) {

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

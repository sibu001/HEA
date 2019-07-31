import { Component, OnInit, ContentChild, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from "src/app/models/user";
import { LoginService } from './../services/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { GrowlModule, SelectItem } from 'primeng/primeng';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { AccordionModule } from 'primeng/primeng';     //accordion and accordion tab
import { MenuItem } from 'primeng/primeng';
import { Tree, TreeNode } from 'primeng/primeng';
import { NgModel } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { error } from 'util';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class forgotpasswordComponent implements OnInit {
users:Users=new Users();
errorMessageEmail:string;
errorMessageCode:string;

email:string;
code:string;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  login(){
    if(this.email==undefined||this.email.length==0){
      this.errorMessageEmail="Valid E-Mail is mandatory!";
    }else{
      this.errorMessageEmail=undefined;
    }
     if(this.code==undefined||this.code.length==0){
      this.errorMessageCode="Security code is mandatory!";
    }else{
      this.errorMessageCode=undefined;
    }
    if(this.errorMessageEmail==undefined&&this.errorMessageCode==undefined){
      console.log("forgot");
    }
  }
  registration(){
    this.router.navigate(['registration']);
  }

}

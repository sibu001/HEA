import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'recommendationInstruction',
  templateUrl: './recommendationInstruction.component.html',
  styleUrls: ['./recommendationInstruction.component.css']
})
export class RecommendationInstructionComponent implements OnInit {
  hide = false;
  users: Users = new Users();
  constructor(private loginService: LoginService) {
    this.users = this.loginService.getUser();
  }

  ngOnInit() { }
}

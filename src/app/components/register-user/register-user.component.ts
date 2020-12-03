import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import * as crypto from 'crypto-js';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  login: string;
  passwd: string;
  reperatpasswd: string;

  constructor(private uService: UserService, private route: Router) { }

  ngOnInit(): void {
  }

  sendRegister() {
      const encryptedPass: any = crypto.SHA1(this.reperatpasswd).toString();
      this.uService.registerUser({login: this.login, passwd: encryptedPass}).subscribe(response => {
        let res: any = response;
        alert(res.message);
        this.route.navigateByUrl('/movies');
      });
  }
}

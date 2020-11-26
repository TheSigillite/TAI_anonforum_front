import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {CookieService} from 'ngx-cookie';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-userbar',
  templateUrl: './userbar.component.html',
  styleUrls: ['./userbar.component.css']
})
export class UserbarComponent implements OnInit {
  isAdmin: any;
  login: string;
  passwd: string;
  youexist: string;
  constructor(private userService: UserService, private cookieService: CookieService) { }

  ngOnInit(): void {
    try{
      this.login = localStorage.getItem('forumlogin');
      this.isAdmin = JSON.parse(this.cookieService.get('AnonforumAdminCookie'));
    }
    catch (e) {
      this.isAdmin = undefined;
      this.youexist = 'You are not logged in';
    }
    if (this.login !== null && this.login !== undefined){
      this.youexist = 'Logged in as ' + this.login;
    }
  }

  onSubmit() {
    this.userService.loginUser({login: this.login, passwd: crypto.SHA1(this.passwd).toString()}).subscribe(response => {
      if (response.succes){
        this.isAdmin = response.tokenPack.is_adm;
        var expiry = new Date(Date.now());
        expiry.setHours(expiry.getHours() + 3);
        localStorage.setItem('forumlogin', this.login);
        this.passwd = undefined;
        this.youexist = 'Logged in as ' + this.login;
        this.cookieService.put('AnonforumAuthCookie', response.tokenPack.token
          , {expires: expiry, sameSite: 'strict', secure: true});
        this.cookieService.put('AnonforumAdminCookie', String(response.tokenPack.is_adm)
          , {expires: expiry, sameSite: 'strict', secure: true});
      } else {
        alert(response.message);
      }
    });
  }

  logout() {
    let token = this.cookieService.get('AnonforumAuthCookie');
    this.userService.logoutUser(token).subscribe(response => {
      localStorage.removeItem('forumlogin');
      this.youexist = 'You are not logged in';
      this.isAdmin = undefined;
      this.cookieService.remove('AnonforumAuthCookie');
      this.cookieService.remove('AnonforumAdminCookie');
    });
  }
}

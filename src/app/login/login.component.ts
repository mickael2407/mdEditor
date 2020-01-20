import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public login: {
    username: string;
    password: string;
  }
  constructor(private router: Router,
    private authService: AuthService,
    private storageService: StorageService) {
      this.login = {
        username: '',
        password: ''
      };
    }

  ngOnInit() {
    document.querySelector('body').classList.add('loginPage');
  }

  signin() {
    this.authService.signin(this.login).subscribe(
      _res => {
        console.log(_res);
        this.storageService.setUserId(_res.userId);
        this.router.navigateByUrl('dashboard/editor');
      },
      _err => {
        console.log(_err);
      }
    )
  }

  ngOnDestroy(): void {
    document.querySelector('body').classList.remove('loginPage');
  }
}

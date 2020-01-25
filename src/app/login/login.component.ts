import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  public signupForm: FormGroup;
  constructor(private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private storageService: StorageService) {
      this.login = {
        username: '',
        password: ''
      };

      this.signupForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

  ngOnInit() {
    document.querySelector('body').classList.add('loginPage');
  }

  signin() {
    this.authService.signin(this.login).subscribe(
      _res => {
        console.log(_res);
        this.storageService.setUserId(_res.userId);
        this.authService.isAuth.next(true);
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

  signup(): void {
    const register = this.signupForm.value;
    console.log(register);
    this.authService.signup(register).subscribe(
      _res => {
        console.log(_res);
        this.storageService.setUserId(_res.userId);
        this.authService.isAuth.next(true);
        this.router.navigateByUrl('dashboard/editor');
      },
      err => {
        console.log(err);
      } 
    );
  }
}

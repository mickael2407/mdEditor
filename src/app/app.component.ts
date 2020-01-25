import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private authService: AuthService, private router: Router) {
    this.checkLogin();
  }


  checkLogin(): void {
    this.authService.isAuth.subscribe(
      _status => {
        console.log(_status);
        if (_status) {
          this.router.navigateByUrl('dashboard/editor');    
        } else {
          this.router.navigateByUrl('login');
        }
      }
    );
  }
}

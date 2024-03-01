import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/userservice';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService:UserService,private authService:AuthService,
    private userAuthService:UserAuthService,
    private activatedRoute:ActivatedRoute,
    private router: Router){}

    async login(email: string, password: string) {
      await this.userAuthService.login(email, password);
    
      this.authService.identityCheck();
    
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"]
        if (returnUrl)
          this.router.navigate([returnUrl])
      });
    }
    
  }


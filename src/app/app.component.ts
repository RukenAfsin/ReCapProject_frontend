import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/custom-toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RentACarProject';

  constructor(public authService:AuthService,private toastrService:CustomToastrService,
    private router:Router )
  {
    authService.identityCheck()
  }
  
  signOut(){
    localStorage.removeItem("accessToken")
    this.authService.identityCheck()
    this.router.navigate([""])
    this.toastrService.message("The session is closed", "Session Closed",{
      messageType:ToastrMessageType.Warning,
      position:ToastrPosition.TopRight
    })
  }

}

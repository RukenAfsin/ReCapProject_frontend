import { Component } from '@angular/core';
import { AlertifyService, MessageType, Position } from './services/alertify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RentACarProject';

  constructor(private alertifyService:AlertifyService)
  {
    this.alertifyService.message("Welcome..",{
      dismissOthers:true,
      messageType:MessageType.Success,
      position:Position.TopCenter,

    })
  }

 
}

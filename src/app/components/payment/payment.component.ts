import { Component } from '@angular/core';
import { Payment } from '../../models/payment';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  payments:Payment[]=[];


  constructor(private paymentService:PaymentService){}
  ngOnInit():void{

  }
  
  addPayments(payment:Payment){
    this.paymentService.addPayments(payment).subscribe((response)=>{
      console.log()
      this.payments=response.data;
    })
  }
}

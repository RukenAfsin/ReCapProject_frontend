import { Component } from '@angular/core';
import { Payment } from '../../models/payment';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  payments:Payment[]=[];


  constructor(private paymentService:PaymentService,
    private location:Location,
    private activatedRoute:ActivatedRoute){}
  ngOnInit():void{

  }
  
  addPayments(payment:Payment){
    this.paymentService.addPayments(payment).subscribe((response)=>{
      console.log()
      this.payments=response.data;
    })
  }

  goBack(): void {
    this.location.back();
  }
  
}

import { Component } from '@angular/core';
import { Payment } from '../../models/payment';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {FormGroup, FormBuilder, FormControl,Validators} from "@angular/forms"


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  payments:Payment[]=[];
  paymentData:Payment;
  paymentAddForm:FormGroup;

  constructor(private paymentService:PaymentService,
    private location:Location,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute){}

  ngOnInit():void{
    this.createPaymentAddForm();
  }
  
  addPayments(payment:Payment){
    this.paymentService.addPayments(payment).subscribe((response)=>{
      console.log()
      this.payments=response.data;
    })
  }
  
  createPaymentAddForm(){
    this.paymentAddForm=this.formBuilder.group({
      cardNo:["", Validators.required],
      expiryMonth:["", Validators.required],
      expiryYear:["", Validators.required],
      cvv:["", Validators.required],
      customerId:["", Validators.required]
    })
  }



  goBack(): void {
    this.location.back();
  }
  
}

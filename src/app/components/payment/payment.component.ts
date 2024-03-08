import { Component } from '@angular/core';
import { Payment } from '../../models/payment';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {FormGroup, FormBuilder, FormControl,Validators} from "@angular/forms"
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


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
    private activatedRoute:ActivatedRoute,
    private spinnerModule:MatProgressSpinnerModule){}

  ngOnInit():void{
    this.createPaymentAddForm();
  }
  
  addPayments() {
    if (this.paymentAddForm.valid) {
      let paymentModel = Object.assign({}, this.paymentAddForm.value);
      console.log(paymentModel); 
  
      this.paymentService.addPayments(paymentModel).subscribe(
        data => {
          console.log(data, "ödeme alındı");
          this.spinnerModule;
        },
        error => {
          console.error("Ödeme ekleme hatası:", error);
        }
      );
    } else {
      console.log("hata, form eksik");
    }
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

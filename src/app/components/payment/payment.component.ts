import { Component } from '@angular/core';
import { Payment } from '../../models/payment';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {FormGroup, FormBuilder, FormControl,Validators, ValidationErrors} from "@angular/forms"
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  payments:Payment[]=[];
  paymentData:Payment;
  frm: FormGroup;
  submitted = false;
  currentStep: number = 1;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;


  constructor(private paymentService:PaymentService,
    private location:Location,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private spinnerModule:MatProgressSpinnerModule,
    private _formBuilder: FormBuilder){}

  ngOnInit():void{
    this.createPaymentAddForm();
  }
  
  addPayments() {
    this.submitted = true; // Formun gönderildiğini belirtmek için submitted değişkenini true olarak ayarla
    
    if (this.frm.valid) {
      let paymentModel = Object.assign({}, this.frm.value);
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
    this.frm=this.formBuilder.group({
      cardNo: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      expiryMonth: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      expiryYear: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      cvv: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      cardOwner: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }



  goBack(): void {
    this.location.back();
  }
  
}

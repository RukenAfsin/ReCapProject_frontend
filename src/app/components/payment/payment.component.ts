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
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  payments: Payment[] = [];
  paymentData: Payment;
  submitted = false;
  currentStep: number = 1;

  // frm: FormGroup;
  // firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = false;

  constructor(private paymentService: PaymentService,
    private location: Location,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinnerModule: MatProgressSpinnerModule,
    private _formBuilder: FormBuilder) {


    this.secondFormGroup = this.formBuilder.group({
      cardNo: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      expiryMonth: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      expiryYear: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      cvv: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      cardOwner: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  get component() {
    return this.secondFormGroup.controls;
  }

  addPayments() {
    this.submitted = true;
    const newPayment: Partial<Payment> = {
      cardOwner: this.secondFormGroup.value.cardOwner,
      cardNo:this.secondFormGroup.value.cardNo,
      cvv: this.secondFormGroup.value.cvv,
      expiryMonth: this.secondFormGroup.value.expiryMonth,
      expiryYear: this.secondFormGroup.value.expiryYear
    }
    this.paymentService.addPayments(newPayment).subscribe((response) => {
      this.payments = response.data;
      console.log(response)
    })
  }

  goBack(): void {
    this.location.back();
  }
}

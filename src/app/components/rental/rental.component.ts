import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  carFilter: number = 0;
  customerFilter: number = 0;
  cars: Car[] = [];
  customers: Customer[] = [];
  rentalData: Rental;
  currentStep: number = 0;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = false;

  constructor(private rentalService: RentalService,
    private carService: CarService,
    private customerService: CustomerService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder) {
      const rentalData: Partial<Rental> = {
        carId: undefined,
        customerId: undefined,
        rentDate: new Date(),
        returnDate: new Date(),
      };
      

    this.firstFormGroup = this._formBuilder.group({
      carFilter: ['', Validators.required],
      customerFilter: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCars();
    this.getCustomers();
    this.activatedRoute.params.subscribe(params => {
      if (params["customerId"]) {
        this.getRentalsByCustomerId(params["customerId"]);
      } else {
        this.getRentals();
      }
    });
  }

  getRentals() {
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
    });
  }

  getRentalsByCustomerId(customerId: number) {
    this.rentalService.getRentalsByCustomer(customerId).subscribe(response => {
      this.rentals = response.data;
    });
  }

  checkRental(rental: Rental) {
    this.rentalService.checkRental(rental).subscribe((response) => {
      console.log("directed to payment page");
      this.rentals = response.data;
    });
  }
  addRental() {
    const newRental: Partial<Rental> = {
      carId: this.firstFormGroup.value.carFilter,
      customerId: this.firstFormGroup.value.customerFilter,
      rentDate: this.firstFormGroup.value.rentDate,
      returnDate: this.firstFormGroup.value.returnDate,
    };
  
    this.rentalService.addRental(newRental).subscribe((response) => {
      this.rentals = response.data;
      console.log(response);
    });
  }
  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
    });
  }

  goBack(): void {
    this.location.back();
  }
}

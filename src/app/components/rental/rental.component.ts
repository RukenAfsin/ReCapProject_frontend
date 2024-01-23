import { Component } from '@angular/core';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import {FormGroup, FormBuilder, FormControl,Validators} from "@angular/forms"
import { Location } from '@angular/common';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent {
  rentals:Rental[]=[];
  carFilter:number=0;
  customerFilter:number=0;
  cars:Car[]=[];
  customers:Customer[]=[]; 
  rentalData: Rental;
  
  
  constructor(private rentalService:RentalService, 
    private carService:CarService,
    private customerService:CustomerService,
    private location: Location,
    private activatedRoute:ActivatedRoute){
      this.rentalData = {
        carId: 0,
        customerId: 0,
        rentDate: new Date(),
        returnDate: undefined,
      } as Rental;
      
  }
  ngOnInit(): void {
    
    this.getCars()
    this.getCustomers()
    this.activatedRoute.params.subscribe(params=>{
      if(params["customerId"])
      {
        this.getRentalsByCustomerId(params["customerId"])
      }
      else{
        this.getRentals()
      }
    })
  }
  
  getRentals(){
  this.rentalService.getRentals().subscribe(response=>{
    this.rentals=response.data
   })
   } 
   
   getRentalsByCustomerId(customerId:number){
    this.rentalService.getRentalsByCustomer(customerId).subscribe(response=>{
      this.rentals=response.data
    })
   }

   checkRental(rental: Rental) {
    this.rentalService.checkRental(rental).subscribe((response) => {
      console.log("directed to payment page")
      this.rentals = response.data;
    });
  }
  
   getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data
    })
   }

   getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers=response.data
    })
   }

   getSelectedCar(carId: number): boolean {
    console.log();
    return this.carFilter === carId;
  }

  getSelectedCustomer(customerId: number):boolean{
    console.log();
    return this.customerFilter === customerId;
  }

  goBack(): void {
    this.location.back();
  }
  

  }
  
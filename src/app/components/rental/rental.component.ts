import { Component } from '@angular/core';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent {
  rentals:Rental[]=[];
  dataLoaded=false;
  
  
  constructor(private rentalService:RentalService, private activatedRoute:ActivatedRoute){
  }
  ngOnInit(): void {
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
    this.dataLoaded=true;
   })
   } 
   
   getRentalsByCustomerId(customerId:number){
    this.rentalService.getRentalsByCustomer(customerId).subscribe(response=>{
      this.rentals=response.data
    this.dataLoaded=true;
    })
   }

  }
  
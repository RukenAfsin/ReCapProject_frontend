import { Component } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
customers:Customer[]=[];
currentCustomer:Customer;
dataLoaded=false;

constructor(private customerService:CustomerService){
}
ngOnInit():void{
  this.getCustomers();
}

getCustomers(){
  this.customerService.getCustomers().subscribe(response=>{
    this.customers=response.data
    this.dataLoaded=true;
  })
}
setCurrentCustomer(customer:Customer){
  this.currentCustomer=customer;
  this.dataLoaded=true;
}
getCurrentCustomerClass(customer:Customer){
  if(customer==this.currentCustomer){
    return "list-group-item active"
  }
  else{
    return "list-group-item"
  } 
}

}
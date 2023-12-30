export interface Rental{
    carId:number;
    rentalId:number;
    carName:string;
    customerId:number;
    modelFullName:string;
    customerFullName:string;
    rentDate:Date;
    returnDate?:Date;
    dailyPrice:number;
  }
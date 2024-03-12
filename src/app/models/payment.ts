export interface Payment {
    paymentId:number;
    customerId:number;
    cardNo:number;
    cardOwner:string;
    expiryMonth:number;
    expiryYear:number;
    cvv:number;

}
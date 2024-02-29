import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
{path:"", pathMatch:"full", component:CarComponent},
{path:"cars", component:CarComponent },
{path:"cars/brand/:brandId", component:CarComponent},
{path:"cars/color/:colorId", component:CarComponent},
{path:"rentals", component:RentalComponent},
{path:"rentals/car/:carId", component:RentalComponent},
{path:"payments", component:PaymentComponent},
{path:"carImages/car/:carId", component:CarImageComponent},
{path:"cars/color/:colorId/brand/:brandId",component:CarComponent},
{path:"register", component:RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

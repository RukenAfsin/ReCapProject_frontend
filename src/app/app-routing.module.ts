// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/guard/auth.guard';


const routes: Routes = [
  { path: "", pathMatch: "full", component: CarComponent, canActivate: [AuthGuard] },
  { path: "cars", component: CarComponent, canActivate: [AuthGuard] },
  { path: "cars/brand/:brandId", component: CarComponent, canActivate: [AuthGuard] },
  { path: "cars/color/:colorId", component: CarComponent, canActivate: [AuthGuard] },
  { path: "rentals", component: RentalComponent, canActivate: [AuthGuard] },
  { path: "rentals/car/:carId", component: RentalComponent, canActivate: [AuthGuard] },
  { path: "payments", component: PaymentComponent, canActivate: [AuthGuard] },
  { path: "carImages/car/:carId", component: CarImageComponent, canActivate: [AuthGuard] },
  { path: "cars/color/:colorId/brand/:brandId", component: CarComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

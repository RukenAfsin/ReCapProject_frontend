import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
{path:"", pathMatch:"full", component:CarComponent},
{path:"cars", component:CarComponent },
{path:"cars/brand/:brandId", component:CarComponent},
{path:"rentals/customer/:customerId", component:RentalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

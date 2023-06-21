import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { OrderBuilderComponent } from './pages/orderBuilder/order-builder/order-builder.component';
import { orderBuilderGuard } from './Guard/order-builder.guard';
import { RentalDetailsComponent } from './pages/rentalDetails/rental-details/rental-details.component';
import { RentalLoginComponent } from './pages/rental-login/rental-login.component';
import { loginGuard } from './Guard/login.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'orderBuilder', component: OrderBuilderComponent, canActivate: [orderBuilderGuard]},
  {path: 'rentalDetails', component: RentalDetailsComponent, canActivate: [loginGuard]},
  {path: 'rentalLogin', component: RentalLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

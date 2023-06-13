import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { OrderBuilderComponent } from './pages/orderBuilder/order-builder/order-builder.component';
import { orderBuilderGuard } from './Guard/order-builder.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'orderBuilder', component: OrderBuilderComponent, canActivate: [orderBuilderGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

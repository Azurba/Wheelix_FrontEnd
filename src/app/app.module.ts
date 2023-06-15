import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { HomeComponent } from './pages/home/home/home.component';
import { FaqData } from './Data/FaqData';
import { HomeService } from './services/home.service';
import { FleetData } from './Data/FleetData';
import { OrderBuilderComponent } from './pages/orderBuilder/order-builder/order-builder.component';
import { mapLocationsData } from './Data/mapLocationsData';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OrderBuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    HttpClientModule,
    MatSnackBarModule,
    MatStepperModule,
    MatSidenavModule,
    MatSlideToggleModule
  ],
  providers: [FaqData, HomeService, FleetData, mapLocationsData],
  bootstrap: [AppComponent]
})
export class AppModule { }

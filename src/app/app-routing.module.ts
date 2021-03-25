import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { ColorListComponent } from './components/color-list/color-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'brand', component: BrandListComponent },
  { path: 'brand/add', component: BrandAddComponent },
  { path: 'brand/update/:id', component: BrandUpdateComponent },

  { path: 'color', component: ColorListComponent },
  { path: 'color/add', component: ColorAddComponent },
  { path: 'color/update/:id', component: ColorUpdateComponent },

  { path: 'rentals', component: RentalComponent },

  { path: 'customers', component: CustomerComponent },

  { path: 'cart', component: CartSummaryComponent },
  { path: 'payment/:myrental', component: PaymentComponent },

  { path: 'cars', component: CarComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'car/update/:carId',component:CarUpdateComponent},
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'car/details/:carId', component: CarDetailComponent },
  { path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { OrderManagementComponent } from './order-management.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { CartComponent } from './components/cart/cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { AdminReturnProcessComponent } from './components/admin-return-process/admin-return-process.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './components/payment/payment.component';
import { UpdateTrackingComponent } from './components/update-tracking/update-tracking.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';


@NgModule({
  declarations: [
   
  ],
  imports: [
    // CommonModule,
    // OrderManagementRoutingModule,
    // ReactiveFormsModule
  ]
})
export class OrderManagementModule { }

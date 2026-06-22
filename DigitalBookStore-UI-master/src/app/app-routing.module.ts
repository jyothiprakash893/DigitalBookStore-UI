import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllorderstatusComponent } from 'src/user-admin/AdminOrder/allorderstatus/allorderstatus.component';
import { AdminHomeComponent } from 'src/user-admin/Home/admin-home/admin-home.component';
import { AdminDashboardComponent } from 'src/user-admin/admin-dashboard/admin-dashboard.component';
import { DisplayInventoryComponent } from 'src/user-admin/inventory/display-inventory/display-inventory.component';
import { UpdateQuantityComponent } from 'src/user-admin/inventory/update-quantity/update-quantity.component';
import { ViewByBookIDComponent } from 'src/user-admin/inventory/view-by-book-id/view-by-book-id.component';
import { UserListComponent } from 'src/user-admin/user-list/user-list.component';
import { HomeComponent } from 'src/user-customer/Home/home/home.component';
import { AddbookComponent } from 'src/user-customer/book/addbookreactiveform/addbook/addbook.component';
import { BookdetailsComponent } from 'src/user-customer/book/book-details/bookdetails/bookdetails.component';
import { CategorybooksComponent } from 'src/user-customer/book/category-books/categorybooks/categorybooks.component';
import { CategorybookslistComponent } from 'src/user-customer/book/categorybookslist/categorybookslist/categorybookslist.component';
import { DealOfTheDayComponent } from 'src/user-customer/book/deal-of-the-day/deal-of-the-day.component';
import { EditorspickComponent } from 'src/user-customer/book/editors-pick/editorspick/editorspick.component';
import { SearchtitleComponent } from 'src/user-customer/book/searchtitle/searchtitle.component';
import { UpdatebookComponent } from 'src/user-customer/book/updatebook/updatebook/updatebook.component';
import { ViewbookidComponent } from 'src/user-customer/book/viewbookid/viewbookid.component';
import { AdminReturnProcessComponent } from 'src/user-customer/order/order-management/components/admin-return-process/admin-return-process.component';
import { CartComponent } from 'src/user-customer/order/order-management/components/cart/cart.component';
import { OrderDetailsComponent } from 'src/user-customer/order/order-management/components/order-details/order-details.component';
import { OrderListComponent } from 'src/user-customer/order/order-management/components/order-list/order-list.component';
import { OrderTrackingComponent } from 'src/user-customer/order/order-management/components/order-tracking/order-tracking.component';
import { PaymentComponent } from 'src/user-customer/order/order-management/components/payment/payment.component';
import { PlaceOrderComponent } from 'src/user-customer/order/order-management/components/place-order/place-order.component';
import { UpdateTrackingComponent } from 'src/user-customer/order/order-management/components/update-tracking/update-tracking.component';
import { AdminReviewComponent } from 'src/user-customer/review/admin-review/admin-review.component';
import { AllReviewsComponent } from 'src/user-customer/review/all-reviews/all-reviews.component';
import { ReviewsByUserIdComponent } from 'src/user-customer/review/reviews-by-user-id/reviews-by-user-id.component';
import { ForgotPasswordComponent } from 'src/user-customer/user/forgot-password/forgot-password.component';
import { AuthAdminGuard } from 'src/user-customer/user/guard/auth-admin.guard';
import { AuthCustomerGuard } from 'src/user-customer/user/guard/auth-cust.guard ';
import { LoginComponent } from 'src/user-customer/user/login/login.component';
import { ResetPasswordComponent } from 'src/user-customer/user/reset-password/reset-password.component';
import { SignupComponent } from 'src/user-customer/user/signup/signup.component';
import { UserProfileComponent } from 'src/user-customer/user/user-profile/user-profile.component';

const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthAdminGuard], },
    { path: 'getInventoryByBookID', component: ViewByBookIDComponent, canActivate:[AuthAdminGuard] },
    { path: 'updateQuantity', component: UpdateQuantityComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'yourReviews', component: ReviewsByUserIdComponent, canActivate: [AuthCustomerGuard], },
    { path: 'reviews', component: AdminReviewComponent, canActivate: [AuthAdminGuard], },
    { path: 'editors-pick', component: EditorspickComponent },
    { path: 'books', component: ViewbookidComponent, canActivate: [AuthAdminGuard], },
    { path: 'addBooks', component: AddbookComponent, canActivate: [AuthAdminGuard], },
    { path: 'getInventory', component: DisplayInventoryComponent, canActivate: [AuthAdminGuard], },
    { path: 'orders', component: AllorderstatusComponent, canActivate: [AuthAdminGuard], },
    { path: 'updateBook', component: UpdatebookComponent, canActivate: [AuthAdminGuard], },
    { path: 'book-details/:id', component: BookdetailsComponent, canActivate: [AuthCustomerGuard], },
    { path: 'category-books', component: CategorybooksComponent, canActivate: [AuthCustomerGuard], },
    { path: 'category-books-list', component: CategorybookslistComponent },
    { path: 'search', component: SearchtitleComponent, canActivate: [AuthCustomerGuard], },
    { path: 'order/cart', component: CartComponent, canActivate: [AuthCustomerGuard], },
    { path: 'order/place', component: PlaceOrderComponent, canActivate: [AuthCustomerGuard], },
    { path: 'order/list', component: OrderListComponent, canActivate: [AuthCustomerGuard], },
    { path: 'order/details/:id', component: OrderDetailsComponent, canActivate: [AuthCustomerGuard], },
    { path: 'order/admin/return/:id', component: AdminReturnProcessComponent, canActivate: [AuthAdminGuard], },
    { path: 'order/admin/tracking/:id', component: UpdateTrackingComponent, canActivate: [AuthAdminGuard], },
    { path: 'order/payment/:id', component: PaymentComponent, canActivate: [AuthCustomerGuard], },
    { path: 'order/track/:id', component: OrderTrackingComponent, canActivate: [AuthCustomerGuard], },
    { path: 'forgotpassword', component:ForgotPasswordComponent},
    { path: 'reset-password', component:ResetPasswordComponent },
    { path:'allusers',component:UserListComponent,canActivate:[AuthAdminGuard]},
    { path: '**', redirectTo: 'home', pathMatch: 'full' }, 
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { anchorScrolling: "enabled" })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
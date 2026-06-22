import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './auth.interceptor';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryService } from 'src/user-admin/inventory/service/inventory.service';
import { AddbookComponent } from 'src/user-customer/book/addbookreactiveform/addbook/addbook.component';
import { BookDealComponent } from 'src/user-customer/book/book-deal/book-deal.component';
import { BookdetailsComponent } from 'src/user-customer/book/book-details/bookdetails/bookdetails.component';
import { FilterComponent } from 'src/user-customer/book/filter/filter.component';
import { SearchtitleComponent } from 'src/user-customer/book/searchtitle/searchtitle.component';
import { BookService } from 'src/user-customer/book/service/book.service';
import { UpdatebookComponent } from 'src/user-customer/book/updatebook/updatebook/updatebook.component';
import { ViewbookidComponent } from 'src/user-customer/book/viewbookid/viewbookid.component';
import { BookCarouselComponent } from 'src/user-customer/Home/book-carousel/book-carousel.component';
import { BookHeroComponent } from 'src/user-customer/Home/book-hero/book-hero.component';
import { HomeComponent } from 'src/user-customer/Home/home/home.component';
import { NavbarComponent } from 'src/user-customer/Home/navbar/navbar.component';
import { AddToCartComponent } from 'src/user-customer/order/order-management/components/add-to-cart/add-to-cart.component';
import { AdminReturnProcessComponent } from 'src/user-customer/order/order-management/components/admin-return-process/admin-return-process.component';
import { CartComponent } from 'src/user-customer/order/order-management/components/cart/cart.component';
import { OrderDetailsComponent } from 'src/user-customer/order/order-management/components/order-details/order-details.component';
import { OrderListComponent } from 'src/user-customer/order/order-management/components/order-list/order-list.component';
import { PlaceOrderComponent } from 'src/user-customer/order/order-management/components/place-order/place-order.component';
import { UpdateTrackingComponent } from 'src/user-customer/order/order-management/components/update-tracking/update-tracking.component';
import { OrderManagementComponent } from 'src/user-customer/order/order-management/order-management.component';
import { BookInfoService } from 'src/user-customer/order/order-management/services/book-info.service';
import { OrderService } from 'src/user-customer/order/order-management/services/order.service';
import { AddUpdateReviewComponent } from 'src/user-customer/review/add-update-review/add-update-review.component';
import { AllReviewsComponent } from 'src/user-customer/review/all-reviews/all-reviews.component';
import { AverageRatingComponent } from 'src/user-customer/review/average-rating/average-rating.component';
import { ReviewComponent } from 'src/user-customer/review/review/review.component';
import { ReviewService } from 'src/user-customer/review/service/review.service';
import { StarsComponent } from 'src/user-customer/review/stars/stars.component';
import { LoginComponent } from 'src/user-customer/user/login/login.component';
import { UserService } from 'src/user-customer/user/service/user.service';
import { SignupComponent } from 'src/user-customer/user/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { CategorybooksComponent } from 'src/user-customer/book/category-books/categorybooks/categorybooks.component';
import { CategorybookslistComponent } from 'src/user-customer/book/categorybookslist/categorybookslist/categorybookslist.component';
import { ReviewsByBookIdComponent } from 'src/user-customer/review/reviews-by-book-id/reviews-by-book-id.component';
import { ReviewsByUserIdComponent } from 'src/user-customer/review/reviews-by-user-id/reviews-by-user-id.component';

import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminDashboardComponent } from 'src/user-admin/admin-dashboard/admin-dashboard.component';
import { AllorderstatusComponent } from 'src/user-admin/AdminOrder/allorderstatus/allorderstatus.component';
import { DashboardInventoryComponent } from 'src/user-admin/dashboard-inventory/dashboard-inventory.component';
import { AdminHomeComponent } from 'src/user-admin/Home/admin-home/admin-home.component';
import { LeftSidebarComponent } from 'src/user-admin/Home/left-sidebar/left-sidebar.component';
import { MainComponent } from 'src/user-admin/Home/main/main.component';
import { NavbarAdminComponent } from 'src/user-admin/Home/navbar-admin/navbar-admin.component';
import { DeleteBookInventoryComponent } from 'src/user-admin/inventory/delete-book-inventory/delete-book-inventory.component';
import { DisplayInventoryComponent } from 'src/user-admin/inventory/display-inventory/display-inventory.component';
import { UpdateQuantityComponent } from 'src/user-admin/inventory/update-quantity/update-quantity.component';
import { ViewByBookIDComponent } from 'src/user-admin/inventory/view-by-book-id/view-by-book-id.component';
import { RecentOrdersComponent } from 'src/user-admin/recent-orders/recent-orders.component';
import { DealOfTheDayComponent } from 'src/user-customer/book/deal-of-the-day/deal-of-the-day.component';
import { DeletebookComponent } from 'src/user-customer/book/deletebook/deletebook.component';
import { EditorspickComponent } from 'src/user-customer/book/editors-pick/editorspick/editorspick.component';
import { FooterComponent } from 'src/user-customer/Home/footer/footer.component';
import { OrderTrackingComponent } from 'src/user-customer/order/order-management/components/order-tracking/order-tracking.component';
import { PaymentComponent } from 'src/user-customer/order/order-management/components/payment/payment.component';
import { ViewEditReviewComponent } from 'src/user-customer/review/view-edit-review/view-edit-review.component';
import { UserProfileComponent } from 'src/user-customer/user/user-profile/user-profile.component';
import { ForgotPasswordComponent } from 'src/user-customer/user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/user-customer/user/reset-password/reset-password.component';
import { WelcomeAdminComponent } from 'src/user-admin/welcome-admin/welcome-admin.component';
import { ReviewsDeletedComponent } from 'src/user-customer/review/reviews-deleted/reviews-deleted.component';
import { AdminReviewComponent } from 'src/user-customer/review/admin-review/admin-review.component';
import { UserListComponent } from 'src/user-admin/user-list/user-list.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        BookHeroComponent,
        BookCarouselComponent,
        BookDealComponent,
        HomeComponent,
        ViewbookidComponent,
        AddbookComponent,
        UpdatebookComponent,
        LoginComponent,
        SearchtitleComponent,
        FilterComponent,
        ViewbookidComponent,
        BookdetailsComponent,
        OrderManagementComponent,
        AddToCartComponent,
        CartComponent,
        PlaceOrderComponent,
        OrderListComponent,
        OrderDetailsComponent,
        AdminReturnProcessComponent,
        PaymentComponent,
        UpdateTrackingComponent,
        PlaceOrderComponent,
        SignupComponent,
        UserProfileComponent,
        CategorybookslistComponent,
        CategorybooksComponent,
        OrderTrackingComponent,
        DisplayInventoryComponent,
        ViewByBookIDComponent,
        UpdateQuantityComponent,
        LeftSidebarComponent,
        MainComponent,
		FooterComponent,
        AdminHomeComponent,
        DeleteBookInventoryComponent,
        NavbarAdminComponent,
        AllorderstatusComponent,
        DealOfTheDayComponent,
        DeletebookComponent,
        AdminDashboardComponent,
        AdminDashboardComponent,
        DashboardInventoryComponent,
        UserListComponent,
        RecentOrdersComponent,
        EditorspickComponent,
        AdminDashboardComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        WelcomeAdminComponent,
        StarsComponent,
        AllReviewsComponent,
        ReviewComponent,
        AverageRatingComponent,
        AddUpdateReviewComponent,
        ReviewsByBookIdComponent,
        ReviewsByUserIdComponent,
        ViewEditReviewComponent,
        ReviewsDeletedComponent,
        AdminReviewComponent,
    ],
    imports: [
  
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RouterOutlet,
    CommonModule,
     
],
	providers: [BookService, UserService, InventoryService, ReviewService, OrderService, BookInfoService, {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
	bootstrap: [AppComponent]
})
export class AppModule { }

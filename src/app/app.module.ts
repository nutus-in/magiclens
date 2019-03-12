import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
//import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DataTableModule } from 'angular-6-datatable';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { SliderModule } from 'angular-image-slider';

import { DataServiceService } from './app-service/data-service.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './app-component/auth/login.component';
import { LogoutComponent } from './app-component/auth/logout.component';
import { RegisterComponent } from './app-component/auth/register.component';
import { RegistrationSuccessComponent } from './app-component/auth/registration-success.component';
import { ListProductComponent } from './app-component/product/list-product.component';
import { ViewProfileComponent } from './app-component/user/view-profile.component';
import { SettingsComponent } from './app-component/user/settings.component';
import { ListRentRequestsComponent } from './app-component/rentals/list-rent-requests.component';
import { HomeComponent } from './app-component/home/home.component';
import { HeaderComponent } from './app-component/shared/header.component';
import { SearchComponent } from './app-component/shared/search.component';
import { ErrorComponent } from './app-component/shared/error.component';
import { NotFoundComponent } from './app-component/shared/not-found.component';
import { MyProductComponent } from './app-component/product/my-product.component';
import { SessionHeaderComponent } from './app-component/shared/session-header.component';
import { PromotionComponent } from './app-component/shared/promotion.component';
import { FooterComponent } from './app-component/shared/footer.component';
import { NotificationsComponent } from './app-component/user/notifications.component';
import { SupportComponent } from './app-component/support/support.component';
import { ReportBugComponent } from './app-component/support/report-bug.component';
import { ReportBugSuccessComponent } from './app-component/support/report-bug-success.component';
import { PoliciesComponent } from './app-component/support/policies.component';
import { TermsComponent } from './app-component/auth/terms.component';
import { ItemsNearLocComponent } from './app-component/home/items-near-loc.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    HomeComponent,
    ListProductComponent,
    ViewProfileComponent,
    SettingsComponent,
    ListRentRequestsComponent,
    HeaderComponent,
    SearchComponent,
    ErrorComponent,
    NotFoundComponent,
    MyProductComponent,
    SessionHeaderComponent,
    PromotionComponent,
    RegistrationSuccessComponent,
    FooterComponent,
    NotificationsComponent,
    SupportComponent,
    ReportBugComponent,
    ReportBugSuccessComponent,
    PoliciesComponent,
    TermsComponent,
    ItemsNearLocComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    DataTableModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    AngularFileUploaderModule,
    SliderModule,
    //Ng4GeoautocompleteModule.forRoot()
  ],
  providers: [
    DataServiceService, 
    CookieService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'in'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

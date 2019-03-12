import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../app-component/shared/error.component';
import { PromotionComponent } from '../app-component/shared/promotion.component';
import { LoginComponent } from '../app-component/auth/login.component';
import { LogoutComponent } from '../app-component/auth/logout.component';
import { RegisterComponent } from '../app-component/auth/register.component';
import { TermsComponent } from '../app-component/auth/terms.component';
import { RegistrationSuccessComponent } from '../app-component/auth/registration-success.component';
import { ItemsNearLocComponent } from '../app-component/home/items-near-loc.component';
import { HomeComponent } from '../app-component/home/home.component';
import { ViewProfileComponent } from '../app-component/user/view-profile.component';
import { SettingsComponent } from '../app-component/user/settings.component';
import { NotificationsComponent } from '../app-component/user/notifications.component';
import { SupportComponent } from '../app-component/support/support.component';
import { PoliciesComponent } from '../app-component/support/policies.component';
import { ReportBugComponent } from '../app-component/support/report-bug.component';
import { ReportBugSuccessComponent } from '../app-component/support/report-bug-success.component';

const appRoutes: Routes = [
  { path: 'promotions', component: PromotionComponent },
  { path: 'rental-items-near-you', component: ItemsNearLocComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'terms-and-conditions', component: TermsComponent },
  { path: 'registration-success', component: RegistrationSuccessComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ViewProfileComponent },
  { path: 'profile/settings', component: SettingsComponent },
  { path: 'profile/notifications', component: NotificationsComponent },
  { path: 'support/help', component: SupportComponent },
  { path: 'support/policies', component: PoliciesComponent },
  { path: 'bugs/report', component: ReportBugComponent },
  { path: 'bugs/logged', component: ReportBugSuccessComponent },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: '/rental-items-near-you', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }

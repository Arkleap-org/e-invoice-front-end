// angular module
import { NgModule } from "@angular/core";

// components
import { AppComponent } from "./app.component";
import { LoadingComponent } from "./shared/components/loading/loading.component"
import { HeaderComponent } from "./shared/components/header/header.component";
import { LayoutComponent } from "./layout/layout.component";
import { LoginComponent } from "./login/login.component";
import { IssuerDetailsComponent } from "./issuer/issuer-details/issuer-details.component";
import { RegisterComponent } from "./register/register.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { HomeComponent } from "./home/home.component";
import { ItemDetailsComponent } from "./item/item-details/item-details.component";
import { ItemListComponent } from "./item/item-list/item-list.component";
import { InvoiceDetailsComponent } from "./invoice/invoice-details/invoice-details.component";
import { InvoiceListComponent } from "./invoice/invoice-list/invoice-list.component";
import { IssuerAddressComponent } from "./issuer/issuer-address/issuer-address.component";
import { InvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';
import { AddReceiverComponent } from './receiver/add-receiver/add-receiver.component';
import { ReceiverListComponent } from './receiver/receiver-list/receiver-list.component';
import { InvoiceErrorsComponent } from './invoice/invoice-errors/invoice-errors.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { UserViewComponent } from './admin/user-view/user-view.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { InvoiceCancelComponent } from './shared/popups/invoice-cancel/invoice-cancel.component';


// modules
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/modules/shared.module";


// services
import { AuthService } from "./shared/services/auth.service";
import { LocalStorageService } from "./shared/services/local-storage.service";
import { AuthGuardService } from "./shared/services/auth.guard.service";
import { SecurityService } from "./shared/services/security.service";
import { SessionStorageService } from "./shared/services/session-storage.service";
import { ItemsService } from "./shared/services/items.service";
import { InvoiceLineComponent } from './shared/popups/invoice-line/invoice-line.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { TraceLogComponent } from './admin/trace-log/trace-log.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PlanDetailsComponent } from './admin/plans/plan-details/plan-details.component';
import { PlanListComponent } from './admin/plans/plan-list/plan-list.component';
import { SubscriptionDetailsComponent } from './admin/subscriptions/subscription-details/subscription-details.component';
import { SubscriptionListComponent } from './admin/subscriptions/subscription-list/subscription-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HeaderComponent,
    LayoutComponent,
    LoginComponent,
    IssuerDetailsComponent,
    RegisterComponent,
    AddUserComponent,
    HomeComponent,
    ItemDetailsComponent,
    ItemListComponent,
    InvoiceDetailsComponent,
    InvoiceListComponent,
    IssuerAddressComponent,
    InvoiceViewComponent,
    AddReceiverComponent,
    ReceiverListComponent,
    InvoiceErrorsComponent,
    UserManagementComponent,
    UserViewComponent,
    ResetPasswordComponent,
    InvoiceCancelComponent,
    InvoiceLineComponent,
    TraceLogComponent,
    ContactUsComponent,
    PlanDetailsComponent,
    PlanListComponent,
    SubscriptionDetailsComponent,
    SubscriptionListComponent,
    

  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    MatSlideToggleModule,
  ],
  providers: [
    AuthService,
    LocalStorageService,
    AuthGuardService,
    SecurityService,
    SessionStorageService,
    ItemsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

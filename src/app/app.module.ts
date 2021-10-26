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
import { ReceiverComponent } from './shared/popups/receiver/receiver.component';

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
    ReceiverComponent,

  ],
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    LocalStorageService,
    AuthGuardService,
    SecurityService,
    SessionStorageService,
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

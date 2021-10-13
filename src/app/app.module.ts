import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './shared/components/loading/loading.component'
import { HeaderComponent } from './shared/components/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { IssuerComponent } from './issuer/issuer.component';

import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule } from '@covalent/core/steps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeraDataModule } from './shared/modules/teradata.module';
import { RegisterComponent } from './register/register.component';


import { AddUserComponent } from './add-user/add-user.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/modules/shared.module';

import { ItemDetailsComponent } from './item/item-details/item-details.component';
import { ItemListComponent } from './item/item-list/item-list.component';

import { InvoiceDetailsComponent } from './invoice/invoice-details/invoice-details.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HeaderComponent,
    LayoutComponent,
    LoginComponent,
    IssuerComponent,
    RegisterComponent,
    AddUserComponent,
    HomeComponent,
    ItemDetailsComponent,
    ItemListComponent,
    InvoiceDetailsComponent,
    InvoiceListComponent,

  ],
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

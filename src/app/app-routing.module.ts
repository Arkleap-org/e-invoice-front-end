import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeComponent } from './home/home.component';
import { InvoiceDetailsComponent } from './invoice/invoice-details/invoice-details.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';
import { IssuerAddressComponent } from './issuer/issuer-address/issuer-address.component';
import { IssuerDetailsComponent } from './issuer/issuer-details/issuer-details.component';
import { ItemDetailsComponent } from './item/item-details/item-details.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './shared/services/auth.guard.service';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "home",
        canActivate: [AuthGuardService],
        component: HomeComponent
      },
      {
        path: "user",
        canActivate: [AuthGuardService],
        component: AddUserComponent
      },

      { path: "issuer/details", canActivate: [AuthGuardService], component: IssuerDetailsComponent },
      { path: "issuer/address", canActivate: [AuthGuardService], component: IssuerAddressComponent },
      { path: "issuer/address/:id", canActivate: [AuthGuardService], component: IssuerAddressComponent },



      { path: "item/list", canActivate: [AuthGuardService], component: ItemListComponent },
      { path: "item/add", canActivate: [AuthGuardService], component: ItemDetailsComponent },
      { path: "item/update/:id", canActivate: [AuthGuardService], component: ItemDetailsComponent },

      { path: "invoice/list", canActivate: [AuthGuardService], component: InvoiceListComponent },
      { path: "invoice/add", canActivate: [AuthGuardService], component: InvoiceDetailsComponent },
      { path: "invoice/view/:id", canActivate: [AuthGuardService], component: InvoiceViewComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

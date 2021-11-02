// angular core
import { NgModule } from '@angular/core';

// angular router
import { RouterModule, Routes } from '@angular/router';

// components
import { AddUserComponent } from './add-user/add-user.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { UserViewComponent } from './admin/user-view/user-view.component';
import { HomeComponent } from './home/home.component';
import { InvoiceDetailsComponent } from './invoice/invoice-details/invoice-details.component';
import { InvoiceErrorsComponent } from './invoice/invoice-errors/invoice-errors.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';
import { IssuerAddressComponent } from './issuer/issuer-address/issuer-address.component';
import { IssuerDetailsComponent } from './issuer/issuer-details/issuer-details.component';
import { ItemDetailsComponent } from './item/item-details/item-details.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ReceiverListComponent } from './receiver/receiver-list/receiver-list.component';
import { RegisterComponent } from './register/register.component';

// services
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
      { path: "invoice/errors/:id", canActivate: [AuthGuardService], component: InvoiceErrorsComponent },
      { path: "invoice/update/:id", canActivate: [AuthGuardService], component: InvoiceDetailsComponent },


      { path: "receiver/list", canActivate: [AuthGuardService], component: ReceiverListComponent },

      { path: "user/list", canActivate: [AuthGuardService], component: UserManagementComponent },
      { path: "user/view/:id", canActivate: [AuthGuardService], component: UserViewComponent },
      { path: "user/reset-password/:id", canActivate: [AuthGuardService], component: ResetPasswordComponent },




    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

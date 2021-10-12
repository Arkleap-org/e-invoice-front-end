import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { IssuerComponent } from './issuer/issuer.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "home",
    component: LayoutComponent,
    children: [
      {
        path: "issuer",
        component: IssuerComponent
      },
      {
        path: "user",
        component: AddUserComponent
      },
      {
        path: "item",
        loadChildren: () => import("./item/item.module").then(m => m.ItemModule)
      },
      {
        path: "invoice",
        loadChildren: () => import("./invoice/invoice.module").then(m => m.InvoiceModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CovalentDynamicMenuModule } from '@covalent/core/dynamic-menu';
import { CovalentSidesheetModule } from '@covalent/core/sidesheet';
import { CovalentStepsModule } from '@covalent/core/steps';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentDataTableModule } from '@covalent/core/data-table';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentPagingModule } from '@covalent/core/paging';
// import {  MatSelectModule } from '@angular/material';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    MatGridListModule,
    MatTooltipModule,
    MatSnackBarModule,
    CovalentLayoutModule,
    CovalentSidesheetModule,
    CovalentDynamicMenuModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    MatListModule,
    MatOptionModule,
  ], // modules needed to run this module
  providers: [
  ], // additional providers needed for this module
  bootstrap: [],
  exports: [
    FormsModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    MatGridListModule,
    MatTooltipModule,
    MatSnackBarModule,
    CovalentLayoutModule,
    CovalentSidesheetModule,
    CovalentDynamicMenuModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    MatListModule,
    MatOptionModule,
  ]
})
export class TeraDataModule { }

import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



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
@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
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
    // CovalentExpansionPanelModule,
    // CovalentNotificationsModule,
    // CovalentMenuModule,
    // CovalentMediaModule,
    // CovalentHttpModule.forRoot(),
    // CovalentHighlightModule,
    // CovalentMarkdownModule,
    // CovalentDynamicFormsModule,
    // ToolbarModule,

    // SidenavContentModule,
    // ContentContainerModule,
    // appRoutes,
    // CovalentFileModule,
  ], // modules needed to run this module
  providers: [], // additional providers needed for this module
  bootstrap: [],
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
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
  ]
})
export class TeraDataModule { }
